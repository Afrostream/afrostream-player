/**
 * afrostream-player
 * @version 2.1.12
 * @copyright 2016 Afrostream, Inc.
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.afrostreamPlayer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _captionTrackButton = require('./track-controls/caption-track-button');

Object.defineProperty(exports, 'CaptionTrackButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_captionTrackButton).default;
  }
});

var _audioTrackButton = require('./track-controls/audio-track-button');

Object.defineProperty(exports, 'AudioTrackButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_audioTrackButton).default;
  }
});

var _videoTrackButton = require('./track-controls/video-track-button');

Object.defineProperty(exports, 'VideoTrackButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_videoTrackButton).default;
  }
});

var _nextVideoButton = require('./next/next-video-button');

Object.defineProperty(exports, 'NextVideoButton', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_nextVideoButton).default;
  }
});

var _loadProgressSpinner = require('./progress-control/load-progress-spinner');

Object.defineProperty(exports, 'LoadProgressSpinner', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_loadProgressSpinner).default;
  }
});

var _mouseThumbnailDisplay = require('./progress-control/mouse-thumbnail-display');

Object.defineProperty(exports, 'MouseThumbnailDisplay', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_mouseThumbnailDisplay).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./next/next-video-button":2,"./progress-control/load-progress-spinner":4,"./progress-control/mouse-thumbnail-display":5,"./track-controls/audio-track-button":6,"./track-controls/caption-track-button":8,"./track-controls/video-track-button":13}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _nextVideoItem = require('./next-video-item');

var _nextVideoItem2 = _interopRequireDefault(_nextVideoItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file next-video-button.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');
var MenuButton = _video2.default.getComponent('MenuButton');
/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class NextVideoButton
 */

var NextVideoButton = function (_MenuButton) {
  _inherits(NextVideoButton, _MenuButton);

  function NextVideoButton(player) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, NextVideoButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NextVideoButton).call(this, player, options));
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

      var item = new _nextVideoItem2.default(this.player_, {
        label: 'Next',
        selectable: false,
        poster: this.options_.poster
      });
      items.push(item);

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
}(MenuButton);

NextVideoButton.prototype.controlText_ = 'Next video';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(ControlBar.prototype.options_.children.length - 1, 0, 'nextVideoButton');

Component.registerComponent('NextVideoButton', NextVideoButton);
exports.default = NextVideoButton;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./next-video-item":3}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file next-video-item.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var MenuItem = _video2.default.getComponent('MenuItem');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuItem
 * @class NextVideoItem
 */

var NextVideoItem = function (_MenuItem) {
  _inherits(NextVideoItem, _MenuItem);

  function NextVideoItem(player, options) {
    _classCallCheck(this, NextVideoItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NextVideoItem).call(this, player, options));

    _this.setSrc(options.poster);
    return _this;
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
      var el = _get(Object.getPrototypeOf(NextVideoItem.prototype), 'createEl', this).call(this, type, props, attrs);

      this.fallbackImg_ = _video2.default.createEl(_video2.default.browser.BACKGROUND_SIZE_SUPPORTED ? 'div' : 'img', {
        className: 'thumb-tile_thumb'
      });

      el.appendChild(this.fallbackImg_);

      return el;
    }
  }, {
    key: 'setSrc',
    value: function setSrc(url) {
      var backgroundImage = void 0;

      if (!_video2.default.browser.BACKGROUND_SIZE_SUPPORTED) {
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
}(MenuItem);

Component.registerComponent('NextVideoItem', NextVideoItem);
exports.default = NextVideoItem;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file load-progress-spinner.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var LoadProgressBar = _video2.default.getComponent('LoadProgressBar');

/**
 * Shows load progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class LoadProgressSpinner
 */

var LoadProgressSpinner = function (_LoadProgressBar) {
  _inherits(LoadProgressSpinner, _LoadProgressBar);

  function LoadProgressSpinner(player, options) {
    _classCallCheck(this, LoadProgressSpinner);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LoadProgressSpinner).call(this, player, options));
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
      var el = _video2.default.createEl('div', {
        className: 'vjs-load-progress-spinner',
        innerHTML: '<svg class="circular" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="' + this.options_.rayon + '" fill="none" stroke-width="2" stroke-miterlimit="10"/> </svg>'
      });

      this.circle = _video2.default.createEl('svg', {
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
}(LoadProgressBar);

LoadProgressSpinner.prototype.options_ = {
  rayon: 20
};

Component.registerComponent('LoadProgressSpinner', LoadProgressSpinner);

//Replace videojs CaptionButton child with this one
_video2.default.options.children.splice(3, 1, 'loadProgressSpinner');

exports.default = LoadProgressSpinner;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file mouse-thumbnail-display.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var MouseTimeDisplay = _video2.default.getComponent('MouseTimeDisplay');
var SeekBar = _video2.default.getComponent('SeekBar');

/**
 * The Mouse Time Display component shows the time you will seek to
 * when hovering over the progress bar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class MouseThumbnailDisplay
 */

var MouseThumbnailDisplay = function (_MouseTimeDisplay) {
  _inherits(MouseThumbnailDisplay, _MouseTimeDisplay);

  function MouseThumbnailDisplay(player, options) {
    _classCallCheck(this, MouseThumbnailDisplay);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MouseThumbnailDisplay).call(this, player, options));
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
      this.destroyLoader();
      if (_video2.default.hasClass(this.fallbackImg_, 'vjs-hidden')) {
        _video2.default.removeClass(this.fallbackImg_, 'vjs-hidden');
      }
    }
  }, {
    key: 'handleError',
    value: function handleError() {
      var url = this.destroyLoader();
      _video2.default.log('thumbnails : next error ' + url);
      if (this.itemIndex = 1) {
        this.error = true;
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
      var urlInfo = _video2.default.parseUrl(currentSrc);
      var pathname = urlInfo.pathname.replace(/\/([a-z0-9\/\._-]{16}\.[is]sml?)+\/([a-z0-9\/\._-]*\.(mpd|m3u8)?)$/gi, '');
      var host = this.options_.host || urlInfo.host;
      var fullPah = urlInfo.protocol + '//' + host + pathname + '/frames/map-{index}.jpg';
      var current = fullPah.replace('{index}', this.itemIndex);
      var next = fullPah.replace('{index}', this.itemIndex + 1);
      if (this.itemIndex === 1) {
        this.createLoader(current);
      }
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
      var el = _video2.default.createEl('div', {
        className: 'vjs-thumbnail-display'
      });

      this.fallbackImg_ = _video2.default.createEl('div', {
        className: 'vjs-thumbnail-display_thumb vjs-hidden'
      });

      el.appendChild(this.fallbackImg_);

      return el;
    }
  }, {
    key: 'update',
    value: function update(newTime, position) {
      _get(Object.getPrototypeOf(MouseThumbnailDisplay.prototype), 'update', this).call(this, newTime, position);
      if (this.error) {
        return;
      }
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
        maxItem = Math.ceil(duration / secondsPerSheet);
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
}(MouseTimeDisplay);

MouseThumbnailDisplay.prototype.error = false;
MouseThumbnailDisplay.prototype.itemIndex = 0;
MouseThumbnailDisplay.prototype.options_ = {
  host: null
};
//Push videojs SeekBar child with this one
SeekBar.prototype.options_.children.splice(1, 1, 'mouseThumbnailDisplay');
Component.registerComponent('MouseThumbnailDisplay', MouseThumbnailDisplay);
exports.default = MouseThumbnailDisplay;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _audioTrackMenuItem = require('./audio-track-menu-item');

var _audioTrackMenuItem2 = _interopRequireDefault(_audioTrackMenuItem);

require('./off-audio-track-menu-item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file audio-track-button.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');
var MenuButton = _video2.default.getComponent('MenuButton');
var MenuItem = _video2.default.getComponent('MenuItem');

/**
 * The base class for buttons that toggle specific audio track types (e.g. description)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class AudioTrackButton
 */

var AudioTrackButton = function (_MenuButton) {
  _inherits(AudioTrackButton, _MenuButton);

  function AudioTrackButton(player, options) {
    _classCallCheck(this, AudioTrackButton);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AudioTrackButton).call(this, player, options));

    var tracks = _this.player_.audioTracks();

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
          items.push(new _audioTrackMenuItem2.default(this.player_, {
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
}(MenuButton);

AudioTrackButton.prototype.kind_ = 'audio';
AudioTrackButton.prototype.controlText_ = 'Audio Selection';

//Replace videojs CaptionButton child with this one
//ControlBar.prototype.options_.children.splice(12, 0, 'audioTrackButton')

Component.registerComponent('AudioTrackButton', AudioTrackButton);
exports.default = AudioTrackButton;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./audio-track-menu-item":7,"./off-audio-track-menu-item":10}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _captionTrackMenuItem = require('./caption-track-menu-item');

var _captionTrackMenuItem2 = _interopRequireDefault(_captionTrackMenuItem);

var _offCaptionTrackMenuItem = require('./off-caption-track-menu-item');

var _offCaptionTrackMenuItem2 = _interopRequireDefault(_offCaptionTrackMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');
var CaptionsButton = _video2.default.getComponent('CaptionsButton');

var CaptionTrackButton = function (_CaptionsButton) {
  _inherits(CaptionTrackButton, _CaptionsButton);

  function CaptionTrackButton(options, ready) {
    _classCallCheck(this, CaptionTrackButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CaptionTrackButton).call(this, options, ready));
  }

  // Create a menu item for each text track


  _createClass(CaptionTrackButton, [{
    key: 'createItems',
    value: function createItems() {
      var items = [];
      // Add an OFF menu item to turn all tracks off
      items.push(new _offCaptionTrackMenuItem2.default(this.player_, { 'kind': this.kind_, 'mode': 'hidden' }));

      var tracks = this.player_.textTracks();

      if (!tracks) {
        return items;
      }

      for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];

        // only add tracks that are of the appropriate kind and have a label
        if (track['kind'] === this.kind_) {
          items.push(new _captionTrackMenuItem2.default(this.player_, {
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
}(CaptionsButton);

CaptionTrackButton.prototype.kind_ = 'captions';
CaptionTrackButton.prototype.controlText_ = 'Captions';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(13, 1, 'captionTrackButton');

Component.registerComponent('CaptionTrackButton', CaptionTrackButton);
exports.default = CaptionTrackButton;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./caption-track-menu-item":9,"./off-caption-track-menu-item":11}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./audio-track-menu-item":7}],11:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _captionTrackMenuItem = require('./caption-track-menu-item');

var _captionTrackMenuItem2 = _interopRequireDefault(_captionTrackMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file caption-track-button-off.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
/**
 * A special menu item for turning of a specific type of text track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends TextTrackMenuItem
 * @class OffTextTrackMenuItem
 */

var OffCaptionTrackMenuItem = function (_CaptionTrackMenuItem) {
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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OffCaptionTrackMenuItem).call(this, player, options));
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
}(_captionTrackMenuItem2.default);

Component.registerComponent('OffCaptionTrackMenuItem', OffCaptionTrackMenuItem);
exports.default = OffCaptionTrackMenuItem;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./caption-track-menu-item":9}],12:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _videoTrackMenuItem = require('./video-track-menu-item');

var _videoTrackMenuItem2 = _interopRequireDefault(_videoTrackMenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file off-video-track-menu-item.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');

/**
 * A special menu item for turning of a specific type of video track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends VideoTrackMenuItem
 * @class OffVideoTrackMenuItem
 */

var OffVideoTrackMenuItem = function (_VideoTrackMenuItem) {
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
      'selected': true
    };

    // MenuItem is selectable
    options['selectable'] = true;

    return _possibleConstructorReturn(this, Object.getPrototypeOf(OffVideoTrackMenuItem).call(this, player, options));
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
}(_videoTrackMenuItem2.default);

Component.registerComponent('OffVideoTrackMenuItem', OffVideoTrackMenuItem);
exports.default = OffVideoTrackMenuItem;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./video-track-menu-item":14}],13:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./off-video-track-menu-item":12,"./video-track-menu-item":14}],14:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _video2.default.getComponent('Component');
var MenuItem = _video2.default.getComponent('MenuItem');

var VideoTrackMenuItem = function (_MenuItem) {
  _inherits(VideoTrackMenuItem, _MenuItem);

  /**
   * LABELS
   *
   * @static
   */

  function VideoTrackMenuItem(player, options) {
    _classCallCheck(this, VideoTrackMenuItem);

    var track = options['track'];
    var tracks = player.videoTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['selected'] === true;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(VideoTrackMenuItem).call(this, player, options));

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


  _createClass(VideoTrackMenuItem, [{
    key: 'handleClick',
    value: function handleClick(event) {
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
}(MenuItem);

Component.registerComponent('VideoTrackMenuItem', VideoTrackMenuItem);
exports.default = VideoTrackMenuItem;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file dash.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * DASH Media Controller - Wrapper for HTML5 Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');
var Html5 = _video2.default.getComponent('Html5');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dash = function (_Html) {
  _inherits(Dash, _Html);

  function Dash(options, ready) {
    _classCallCheck(this, Dash);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dash).call(this, options, ready));

    var tTracks = _this.textTracks();

    if (tTracks) {
      (function () {
        var tTracksChangeHandler = _this.handleTracksChange.bind(_this);

        tTracks.addEventListener('change', tTracksChangeHandler);
        _this.on('dispose', function () {
          tTracks.removeEventListener('change', tTracksChangeHandler);
        });
      })();
    }

    var aTracks = _this.audioTracks();

    if (aTracks) {
      (function () {
        var aTracksChangeHandler = _this.handleAudioTracksChange.bind(_this);

        aTracks.addEventListener('change', aTracksChangeHandler);
        _this.on('dispose', function () {
          aTracks.removeEventListener('change', aTracksChangeHandler);
        });
      })();
    }

    var vTracks = _this.videoTracks();

    if (vTracks) {
      (function () {
        var vTracksChangeHandler = _this.handleVideoTracksChange.bind(_this);

        vTracks.addEventListener('change', vTracksChangeHandler);
        _this.on('dispose', function () {
          vTracks.removeEventListener('change', vTracksChangeHandler);
        });
      })();
    }

    return _this;
  }

  /**
   * Detect if source is Live
   * @returns {boolean}
   */


  _createClass(Dash, [{
    key: 'isDynamic',
    value: function isDynamic(dynamic) {
      if (dynamic !== undefined) {
        return this.isDynamic_ = dynamic;
      }
      return this.isDynamic_;
    }
  }, {
    key: 'duration',
    value: function duration() {
      var duration = _get(Object.getPrototypeOf(Dash.prototype), 'duration', this).call(this);
      //FIXME WTF for detect live we should get duration to Infinity
      return this.isDynamic() ? Infinity : duration;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(seconds) {
      if (this.playbackInitialized && this.mediaPlayer_) {
        // this.mediaPlayer_.enableBufferOccupancyABR(false)
        this.mediaPlayer_.setQualityFor('video', 0);
        // this.one('seeked', ()=> {
        //   this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled)
        // })
      }
      _get(Object.getPrototypeOf(Dash.prototype), 'setCurrentTime', this).call(this, seconds);
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
      if (!_src) {
        return this.el_.src;
      }
      this.trigger('loadstart');

      this.featuresNativeTextTracks = Dash.supportsNativeTextTracks();
      this.featuresNativeAudioTracks = Dash.supportsNativeAudioTracks();
      this.featuresNativeVideoTracks = Dash.supportsNativeVideoTracks();
      this.keySystemOptions_ = this.buildDashJSProtData(this.options_.protData);
      // Save the context after the first initialization for subsequent instances
      this.context_ = this.context_ || {};
      // reuse MediaPlayer if it already exists
      if (!this.mediaPlayer_) {
        // But make a fresh MediaPlayer each time the sourceHandler is used
        this.mediaPlayer_ = (0, _dashjs.MediaPlayer)(this.context_).create();

        // Must run controller before these two lines or else there is no
        // element to bind to.
        this.mediaPlayer_.initialize();
      }

      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onInitialized.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.TEXT_TRACKS_ADDED, this.onTextTracksAdded.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.METRIC_CHANGED, this.onMetricChanged.bind(this));
      this.mediaPlayer_.on(_dashjs.MediaPlayer.events.PLAYBACK_PROGRESS, this.onProgress.bind(this));
      // Dash.js autoplays by default
      if (!this.player_.options().autoplay) {
        this.mediaPlayer_.setAutoPlay(false);
      }

      this.mediaPlayer_.setInitialMediaSettingsFor('audio', this.options_.inititalMediaSettings.audio);
      this.mediaPlayer_.setInitialMediaSettingsFor('video', this.options_.inititalMediaSettings.video);
      this.mediaPlayer_.setTrackSwitchModeFor('audio', this.options_.trackSwitchMode); //alwaysReplace
      this.mediaPlayer_.setTrackSwitchModeFor('video', this.options_.trackSwitchMode); //alwaysReplace

      this.mediaPlayer_.setScheduleWhilePaused(this.options_.scheduleWhilePaused);
      this.mediaPlayer_.setAutoSwitchQuality(this.options_.autoSwitch);
      this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled);

      this.mediaPlayer_.setLiveDelayFragmentCount(this.options_.liveFragmentCount);
      this.mediaPlayer_.setInitialBitrateFor('video', this.options_.initialBitrate);
      // this.mediaPlayer_.setSelectionModeForInitialTrack(this.options_.initialSelectionMode)
      this.mediaPlayer_.setBufferToKeep(this.options_.buffer.bufferToKeep);
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
      //player.setInitialMediaSettingsFor("video", {role: $scope.initialSettings.video})

      this.mediaPlayer_.attachView(this.el_);
      this.mediaPlayer_.setProtectionData(this.keySystemOptions_);
      this.mediaPlayer_.attachSource(_src);
    }
  }, {
    key: 'onInitialized',
    value: function onInitialized(_ref, err) {
      var _ref$streamInfo$manif = _ref.streamInfo.manifestInfo.isDynamic;
      var isDynamic = _ref$streamInfo$manif === undefined ? false : _ref$streamInfo$manif;

      if (this.playbackInitialized) {
        return;
      }
      this.playbackInitialized = true;

      if (err) {
        this.player_.error(err);
      }
      // this.streamInfo = streamInfo
      this.isDynamic(isDynamic);
      this.trigger(_dashjs.MediaPlayer.events.STREAM_INITIALIZED);
      //let bitrates = this.mediaPlayer_.getBitrateInfoListFor('video')
      var audioDashTracks = this.mediaPlayer_.getTracksFor('audio');
      var videoDashTracks = this.mediaPlayer_.getTracksFor('video');
      var autoSwitch = this.mediaPlayer_.getAutoSwitchQuality();

      var defaultAudio = this.mediaPlayer_.getInitialMediaSettingsFor('audio');
      //let defaultVideo = this.mediaPlayer_.getInitialMediaSettingsFor('video')
      var initialVideoBitrate = this.mediaPlayer_.getInitialBitrateFor('video');

      var i = void 0;

      for (i = 0; i < audioDashTracks.length; i++) {
        var track = audioDashTracks[i];
        track.label = track.label || track.lang;
        var plTrack = this.addAudioTrack('main', track.label, track.lang);
        plTrack.enabled = plTrack['language'] === (defaultAudio && defaultAudio.lang.indexOf(this.options_.inititalMediaSettings.audio.lang) && defaultAudio.lang || this.options_.inititalMediaSettings.audio.lang);
      }

      for (i = 0; i < videoDashTracks.length; i++) {
        var _track = videoDashTracks[i];
        var bitrateList = _track.bitrateList;
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
    value: function onProgress() {
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
        this.metrics_[e.mediaType] = _video2.default.mergeOptions(this.metrics_[e.mediaType], metrics);
        this.trigger(e);
      }
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      var metrics = this.mediaPlayer_.getMetricsFor(type),
          dashMetrics = this.mediaPlayer_.getDashMetrics(),
          repSwitch = void 0,
          bufferLevel = void 0,
          httpRequests = void 0,
          droppedFramesMetrics = void 0,
          bitrateIndexValue = void 0,
          bandwidthValue = void 0,
          pendingValue = void 0,
          numBitratesValue = void 0,
          bufferLengthValue = 0,
          movingLatency = {},
          movingDownload = {},
          movingRatio = {},
          droppedFramesValue = 0,
          requestsQueue = void 0,
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

        fillmoving('video', httpRequests);
        fillmoving('audio', httpRequests);

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
          track.label = track.label || track.lang;
          plTrack = plTracks[i];
          track.defaultTrack = track.lang === this.options_.inititalMediaSettings.text.lang;
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
      var selected = void 0;

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
            try {
              this.mediaPlayer_.setCurrentTrack(audioDashTrack);
            } catch (err) {
              _video2.default.log(err);
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
      var _this2 = this;

      // The video element's src is set asynchronously so we have to wait a while
      // before we unhide any errors
      // 250ms is arbitrary but I haven't seen dash.js take longer than that to initialize
      // in my testing
      this.setTimeout(function () {
        _this2.player_.removeClass('vjs-dashjs-hide-errors');
      }, 250);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.mediaPlayer_) {
        this.mediaPlayer_.reset();
      }
      _get(Object.getPrototypeOf(Dash.prototype), 'dispose', this).call(this, this);
    }
  }]);

  return Dash;
}(Html5);

Dash.prototype.isDynamic_ = false;

Dash.prototype.options_ = {
  inititalMediaSettings: {
    text: {
      lang: 'fra'
    },
    audio: {
      lang: 'fra'
    },
    video: {
      lang: 'fra'
    }
  },
  //Set to false to switch off adaptive bitrate switching.
  autoSwitch: true,
  /*This method sets the current track switch mode. Available options are:
   * MediaController.TRACK_SWITCH_MODE_NEVER_REPLACE
   * (used to forbid clearing the buffered data (prior to current playback position) after track switch. Default for video)
   * MediaController.TRACK_SWITCH_MODE_ALWAYS_REPLACE
   * (used to clear the buffered data (prior to current playback position) after track switch. Default for audio)*/
  trackSwitchMode: 'neverReplace', //alwaysReplace
  //Enabling buffer-occupancy ABR will switch to the *experimental* implementation of BOLA
  bolaEnabled: true,
  //Set to true if you would like dash.js to keep downloading fragments in the background
  scheduleWhilePaused: false,
  //A value of the initial bitrate, kbps
  initialBitrate: 400,
  //This method sets the selection mode for the initial track. This mode defines how the initial track will be selected
  // initialSelectionMode: 'highestBitrate',//widestRange,highestBitrate
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

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
Dash.supportsNativeTextTracks = function () {
  var supportsTextTracks;
  supportsTextTracks = !!Html5.TEST_VID.textTracks;
  if (supportsTextTracks && Html5.TEST_VID.textTracks.length > 0) {
    supportsTextTracks = typeof Html5.TEST_VID.textTracks[0]['mode'] !== 'number';
  }
  if (supportsTextTracks && !('onremovetrack' in Html5.TEST_VID.textTracks)) {
    supportsTextTracks = false;
  }
  return supportsTextTracks;
};

/*
 * Check to see if native video tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
Dash.supportsNativeVideoTracks = function () {
  var supportsVideoTracks = !!Html5.TEST_VID.videoTracks;
  return supportsVideoTracks;
};

/*
 * Check to see if native audio tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
Dash.supportsNativeAudioTracks = function () {
  var supportsAudioTracks = !!Html5.TEST_VID.audioTracks;
  return supportsAudioTracks;
};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canPlayType = function (type) {

  var dashTypeRE = /^application\/dash\+xml/i;
  var dashExtRE = /\.mpd/i;
  var canPlay = '';
  if (dashTypeRE.test(type)) {
    canPlay = 'probably';
  } else if (dashExtRE.test(type)) {
    canPlay = 'maybe';
  } else {
    canPlay = '';
  }

  return canPlay;
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

_video2.default.options.dash = {};

Component.registerComponent('Dash', Dash);
Tech.registerTech('Dash', Dash);
exports.default = Dash;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],16:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file dashas.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * DASH Media Controller - Wrapper for Flash Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');
var Flash = _video2.default.getComponent('Flash');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */

var Dashas = function (_Flash) {
  _inherits(Dashas, _Flash);

  function Dashas(options, ready) {
    _classCallCheck(this, Dashas);

    // Add global window functions that the swf expects
    // A 4.x workflow we weren't able to solve for in 5.0
    // because of the need to hard code these functions
    // into the swf for security reasons

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dashas).call(this, options, ready));

    window.videojs = window.videojs || {};
    window.videojs.Dashas = window.videojs.Dashas || {};
    window.videojs.Dashas.onReady = Flash.onReady;
    window.videojs.Dashas.onEvent = Flash.onEvent;
    window.videojs.Dashas.onError = Flash.onError;

    _this.metricsInterval = _this.setInterval(_this.detectBandwithChange, 5000);
    _this.one('loadedmetadata', _this.onInitialized.bind(_this));

    var tracks = _this.audioTracks();

    var changeHandler = _this.handleAudioTracksChange.bind(_this);

    tracks.addEventListener('change', changeHandler);
    _this.on('dispose', function () {
      tracks.removeEventListener('change', changeHandler);
    });

    return _this;
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
      options.flashVars = _video2.default.mergeOptions({
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
      this.metrics_ = _video2.default.mergeOptions(this.metrics_, metrics);

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
            _video2.default.log(err);
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
      var metricsChangeType = void 0;
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
          mediaType: metricsChangeType
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
      return _video2.default.mergeOptions(this.metrics_, { video: R, audio: N });
    }
  }, {
    key: 'src',
    value: function src(_src) {
      if (!_src) {
        return this.currentSrc();
      }
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
}(Flash);

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

_video2.default.options.dashas = {};

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

exports.default = Dashas;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dash = require('./dash');

var _dash2 = _interopRequireDefault(_dash);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file easy-broadcast.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * EASY_BROADCAST P2P Media Controller - Wrapper for DASH Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Dash
 * @class EasyBroadcast
 */

var EasyBroadcast = function (_Dash) {
  _inherits(EasyBroadcast, _Dash);

  function EasyBroadcast(options, ready) {
    _classCallCheck(this, EasyBroadcast);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EasyBroadcast).call(this, options, ready));
  }

  /**
   * Set video
   *
   * @param {Object=} src Source object
   * @method setSrc
   */


  _createClass(EasyBroadcast, [{
    key: 'src',
    value: function src(_src) {
      var _this2 = this;

      if (!_src) {
        return this.el_.src;
      }

      this.clearTimeout(this.loadEBTimeout);
      if (!EasyBroadcast.ebLoaded) {
        // Set the source when ready
        this.loadEBTimeout = this.setTimeout(function () {
          _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'src', _this2).call(_this2, _src);
        }, 2000);
        return this.injectJs(_src);
      } else {
        this.mediaPlayer_ = new DashEB.MediaPlayer(this.el_, _src, true);
        _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'src', this).call(this, _src);
      }
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      if (type !== 'p2pweb') {
        return _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'getCribbedMetricsFor', this).call(this, type);
      }
      var metrics = this.mediaPlayer_.getMetricsFor(type);
      if (metrics) {
        return metrics.metricsP2PWeb;
      } else {
        return null;
      }
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      if (e.mediaType !== 'video' && e.mediaType !== 'audio') {
        return;
      }
      var metricsKey = 'p2pweb';
      var metrics = this.getCribbedMetricsFor(metricsKey);
      if (metrics) {
        this.metrics_[metricsKey] = _video2.default.mergeOptions(this.metrics_[metricsKey], metrics);
      }
      _get(Object.getPrototypeOf(EasyBroadcast.prototype), 'onMetricChanged', this).call(this, e);
    }
  }, {
    key: 'onReady',
    value: function onReady() {
      this.triggerReady();
    }
  }, {
    key: 'injectJs',
    value: function injectJs(src) {
      var url = this.options_.ebLib;
      var t = 'script';
      var d = document;
      var s = d.getElementsByTagName('head')[0] || d.documentElement;
      var js = d.createElement(t);
      var cb = this.src.bind(this);
      js.async = true;
      js.type = 'text/javascript';

      js.onload = js.onreadystatechange = function () {
        var rs = this.readyState;
        if (!EasyBroadcast.ebLoaded && (!rs || /loaded|complete/.test(rs))) {
          EasyBroadcast.ebLoaded = true;
          cb(src);
        }
      };
      js.src = url;
      s.insertBefore(js, s.firstChild);
    }
  }]);

  return EasyBroadcast;
}(_dash2.default);

EasyBroadcast.prototype.options_ = _video2.default.mergeOptions(_dash2.default.prototype.options_, {
  ebLib: '//www.easybroadcast.fr/libs/65/EB.js&s2member_file_download_key=dbb00d0abec8ccb2295b7d2df5325f6b',
  //override option EB, cause switch lang too long
  trackSwitchMode: 'alwaysReplace'
});

/* EasyBroadcast Support Testing -------------------------------------------------------- */

EasyBroadcast.isSupported = function () {
  return _dash2.default.isSupported() && !_video2.default.browser.IS_ANDROID;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(EasyBroadcast);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
EasyBroadcast.nativeSourceHandler = _dash2.default.nativeSourceHandler;

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
EasyBroadcast.supportsNativeTextTracks = _dash2.default.supportsNativeTextTracks;

/*
 * Check to see if native video tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
EasyBroadcast.supportsNativeVideoTracks = _dash2.default.supportsNativeVideoTracks;

/*
 * Check to see if native audio tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
EasyBroadcast.supportsNativeAudioTracks = _dash2.default.supportsNativeAudioTracks;

EasyBroadcast.loadEBTimeout = 0;

EasyBroadcast.ebLoaded = false;

_video2.default.options.easybroadcast = {};

Component.registerComponent('EasyBroadcast', EasyBroadcast);
Tech.registerTech('EasyBroadcast', EasyBroadcast);
exports.default = EasyBroadcast;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./dash":15}],18:[function(require,module,exports){
(function (global){
'use strict';

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaTechController = _video2.default.getComponent('MediaTechController');
var AudioTrack = _video2.default.getComponent('AudioTrack');
var VideoTrack = _video2.default.getComponent('VideoTrack');

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
  video: _video2.default.mergeOptions({
    bandwidth: /*this.el().webkitVideoDecodedByteCount ||*/-1
  }, MediaTechController.METRICS_DATA),
  audio: _video2.default.mergeOptions({
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

/**
 * Creates and returns a remote text track object
 *
 * @param {String} kind Text track kind (subtitles, captions, descriptions
 *                                       chapters and metadata)
 * @param {String=} label Label to identify the text track
 * @param {String=} language Two letter language abbreviation
 * @return {TextTrackObject}
 * @method addTextTrack
 */
MediaTechController.prototype.addAudioTrack = function (kind, label, language) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  if (!kind) {
    throw new Error('AudioTrack kind is required but was not provided');
  }

  var tracks = this.audioTracks();

  options.kind = kind;

  if (label) {
    options.label = label;
  }
  if (language) {
    options.language = language;
  }
  options.tech = self;

  var track = new AudioTrack(options);
  tracks.addTrack_(track);

  return track;
};

MediaTechController.prototype.addVideoTrack = function (kind, label, language) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  if (!kind) {
    throw new Error('VideoTrack kind is required but was not provided');
  }

  var tracks = this.videoTracks();

  options.kind = kind;

  if (label) {
    options.label = label;
  }
  if (language) {
    options.language = language;
  }
  options.tech = self;

  var track = new VideoTrack(options);
  tracks.addTrack_(track);

  return track;
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],19:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dash = require('./dash');

var _dash2 = _interopRequireDefault(_dash);

var _streamrootDashjsP2pWrapper = require('streamroot-dashjs-p2p-wrapper');

var _streamrootDashjsP2pWrapper2 = _interopRequireDefault(_streamrootDashjsP2pWrapper);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file streamroot.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * STREAMROOT P2P Media Controller - Wrapper for DASH Media API
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Component = _video2.default.getComponent('Component');
var Tech = _video2.default.getComponent('Tech');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Dash
 * @class EasyBroadcast
 */

var Streamroot = function (_Dash) {
  _inherits(Streamroot, _Dash);

  function Streamroot(options, ready) {
    _classCallCheck(this, Streamroot);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Streamroot).call(this, options, ready));
  }

  /**
   * Set video
   *
   * @param {Object=} src Source object
   * @method setSrc
   */


  _createClass(Streamroot, [{
    key: 'src',
    value: function src(_src) {
      if (!_src) {
        return this.el_.src;
      }
      // But make a fresh MediaPlayer each time the sourceHandler is used
      this.mediaPlayer_ = (0, _dashjs.MediaPlayer)(this.context_).create();
      this.dashjsWrapper_ = new _streamrootDashjsP2pWrapper2.default(this.mediaPlayer_, this.options_.p2pConfig, 30);
      // Apply any options that are set
      this.mediaPlayer_.initialize();
      this.mediaPlayer_.setLimitBitrateByPortal(this.options_.limitBitrateByPortal);
      _get(Object.getPrototypeOf(Streamroot.prototype), 'src', this).call(this, _src);
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      if (type !== 'p2p') {
        return _get(Object.getPrototypeOf(Streamroot.prototype), 'getCribbedMetricsFor', this).call(this, type);
      }
      var metrics = this.mediaPlayer_.getMetricsFor(type);
      if (metrics) {
        return metrics.metricsP2PWeb;
      } else {
        return null;
      }
    }
  }, {
    key: 'onMetricChanged',
    value: function onMetricChanged(e) {
      if (e.mediaType !== 'video' && e.mediaType !== 'audio') {
        return;
      }
      var metricsKey = 'p2p';
      var metrics = this.getCribbedMetricsFor(metricsKey);
      if (metrics) {
        this.metrics_[metricsKey] = _video2.default.mergeOptions(this.metrics_[metricsKey], metrics);
      }
      _get(Object.getPrototypeOf(Streamroot.prototype), 'onMetricChanged', this).call(this, e);
    }
  }]);

  return Streamroot;
}(_dash2.default);

Streamroot.prototype.options_ = _video2.default.mergeOptions(_dash2.default.prototype.options_, {
  p2pConfig: {
    streamrootKey: 'none',
    debug: true
  },
  limitBitrateByPortal: true
});

/* Streamroot Support Testing -------------------------------------------------------- */

Streamroot.isSupported = function () {
  return _dash2.default.isSupported();
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Streamroot);

_video2.default.options.streamroot = {};

Component.registerComponent('Streamroot', Streamroot);
Tech.registerTech('Streamroot', Streamroot);
exports.default = Streamroot;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./dash":15,"streamroot-dashjs-p2p-wrapper":23}],20:[function(require,module,exports){

},{}],21:[function(require,module,exports){
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
},{"min-document":20}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
(function (global){
/**
 * streamroot-dashjs-p2p-wrapper
 * v1.2.4
 * 2016-06-28
 * streamroot-p2p@4.1.2
 * 
 * Copyright © 2016
 */

!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.DashjsWrapper=e()}}(function(){var e;return function t(e,n,r){function i(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var c=new Error("Cannot find module '"+a+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return i(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(){function e(e,t,n){if(!e)throw new Error("event type cannot be null or undefined");if(!t||"function"!=typeof t)throw new Error("listener must be a function: "+t);if(!(i(e,t,n)>=0)){var r={callback:t,scope:n};a[e]=a[e]||[],a[e].push(r)}}function t(e,t,n){if(e&&t&&a[e]){var r=i(e,t,n);r<0||a[e].splice(r,1)}}function n(e,t){if(e&&a[e]){if(t=t||{},t.hasOwnProperty("type"))throw new Error("'type' is a reserved word for event dispatching");t.type=e,a[e].forEach(function(e){e.callback.call(e.scope,t)})}}function r(){a={}}function i(e,t,n){var r=a[e],i=-1;if(!r||0===r.length)return i;for(var o=0;o<r.length;o++)if(r[o].callback===t&&(!n||n===r[o].scope))return o;return i}var o=void 0,a={};return o={on:e,off:t,trigger:n,reset:r}}Object.defineProperty(n,"__esModule",{value:!0});var o=e("./FactoryMaker.js"),a=r(o);i.__dashjs_factory_name="EventBus",n["default"]=a["default"].getSingletonFactory(i),t.exports=n["default"]},{"./FactoryMaker.js":2}],2:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(){function e(e,t,n,r){var i=a(r);!i[e]&&t&&(i[e]={instance:t,override:n})}function t(e,t){for(var n in c){var r=c[n];if(r.context===e&&r.name===t)return r.instance}return null}function n(e,t,n){for(var r in c){var i=c[r];if(i.context===e&&i.name===t)return void(c[r].instance=n)}c.push({name:t,context:e,instance:n})}function r(e){return function(t){return void 0===t&&(t={}),{create:function(){return o(e.__dashjs_factory_name,e.apply({context:t},arguments),t,arguments)}}}}function i(e){return function(n){var r=void 0;return void 0===n&&(n={}),{getInstance:function(){return r||(r=t(n,e.__dashjs_factory_name)),r||(r=o(e.__dashjs_factory_name,e.apply({context:n},arguments),n,arguments),c.push({name:e.__dashjs_factory_name,context:n,instance:r})),r}}}}function o(e,t,n,r){var i=a(n),o=i[e];if(o){var u=o.instance;if(!o.override)return u.apply({context:n,factory:s},r);u=u.apply({context:n,factory:s,parent:t},r);for(var c in u)t.hasOwnProperty(c)&&(t[c]=u[c])}return t}function a(e){var t=void 0;return u.forEach(function(n){n===e&&(t=n)}),t||(t=u.push(e)),t}var s=void 0,u=[],c=[];return s={extend:e,getSingletonInstance:t,setSingletonInstance:n,getSingletonFactory:i,getClassFactory:r}}();n["default"]=r,t.exports=n["default"]},{}],3:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(n,"__esModule",{value:!0});var u=e("./EventsBase.js"),c=r(u),l=function(e){function t(){i(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));return e.AST_IN_FUTURE="astinfuture",e.BUFFERING_COMPLETED="bufferingCompleted",e.BUFFER_CLEARED="bufferCleared",e.BUFFER_LEVEL_UPDATED="bufferLevelUpdated",e.BYTES_APPENDED="bytesAppended",e.CHECK_FOR_EXISTENCE_COMPLETED="checkForExistenceCompleted",e.CHUNK_APPENDED="chunkAppended",e.CURRENT_TRACK_CHANGED="currenttrackchanged",e.DATA_UPDATE_COMPLETED="dataUpdateCompleted",e.DATA_UPDATE_STARTED="dataUpdateStarted",e.FRAGMENT_LOADING_COMPLETED="fragmentLoadingCompleted",e.FRAGMENT_LOADING_STARTED="fragmentLoadingStarted",e.INITIALIZATION_LOADED="initializationLoaded",e.INIT_FRAGMENT_LOADED="initFragmentLoaded",e.INIT_REQUESTED="initRequested",e.INTERNAL_MANIFEST_LOADED="internalManifestLoaded",e.LIVE_EDGE_SEARCH_COMPLETED="liveEdgeSearchCompleted",e.LOADING_COMPLETED="loadingCompleted",e.LOADING_PROGRESS="loadingProgress",e.MANIFEST_UPDATED="manifestUpdated",e.MEDIA_FRAGMENT_LOADED="mediaFragmentLoaded",e.QUALITY_CHANGED="qualityChanged",e.QUOTA_EXCEEDED="quotaExceeded",e.REPRESENTATION_UPDATED="representationUpdated",e.SEGMENTS_LOADED="segmentsLoaded",e.SERVICE_LOCATION_BLACKLIST_CHANGED="serviceLocationBlacklistChanged",e.SOURCEBUFFER_APPEND_COMPLETED="sourceBufferAppendCompleted",e.SOURCEBUFFER_REMOVE_COMPLETED="sourceBufferRemoveCompleted",e.STREAMS_COMPOSED="streamsComposed",e.STREAM_BUFFERING_COMPLETED="streamBufferingCompleted",e.STREAM_COMPLETED="streamCompleted",e.STREAM_INITIALIZED="streaminitialized",e.STREAM_TEARDOWN_COMPLETE="streamTeardownComplete",e.TIMED_TEXT_REQUESTED="timedTextRequested",e.TIME_SYNCHRONIZATION_COMPLETED="timeSynchronizationComplete",e.URL_RESOLUTION_FAILED="urlResolutionFailed",e.WALLCLOCK_TIME_UPDATED="wallclockTimeUpdated",e.XLINK_ALL_ELEMENTS_LOADED="xlinkAllElementsLoaded",e.XLINK_ELEMENT_LOADED="xlinkElementLoaded",e.XLINK_READY="xlinkReady",e}return a(t,e),t}(c["default"]);n["default"]=l,t.exports=n["default"]},{"./EventsBase.js":5}],4:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(n,"__esModule",{value:!0});var u=e("./CoreEvents.js"),c=r(u),l=function(e){function t(){return i(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return a(t,e),t}(c["default"]),f=new l;n["default"]=f,t.exports=n["default"]},{"./CoreEvents.js":3}],5:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(){r(this,e)}return i(e,[{key:"extend",value:function(e,t){if(e){var n=!!t&&t.override,r=!!t&&t.publicOnly;for(var i in e)!e.hasOwnProperty(i)||this[i]&&!n||r&&e[i].indexOf("public_")===-1||(this[i]=e[i])}}}]),e}();n["default"]=o,t.exports=n["default"]},{}],6:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){function n(e,n,i,o){var a,u,c,l,f,d,h,p=e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].SegmentList,_=e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].BaseURL,m=p.SegmentURL_asArray.length,v=[];for(h=e.startNumber,l=(0,s.decideSegmentListRangeForTemplate)(r,t,e,n,i,o),f=Math.max(l.start,0),d=Math.min(l.end,p.SegmentURL_asArray.length-1),a=f;a<=d;a++)c=p.SegmentURL_asArray[a],u=(0,s.getIndexBasedSegment)(r,t,e,a),u.replacementTime=(h+a-1)*e.segmentDuration,u.media=c.media?c.media:_,u.mediaRange=c.mediaRange,u.index=c.index,u.indexRange=c.indexRange,v.push(u),u=null;return e.availableSegmentsNumber=m,v}var r=e.timelineConverter,i=void 0;return i={getSegments:n}}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../../core/FactoryMaker.js"),a=r(o),s=e("./SegmentsUtils.js");i.__dashjs_factory_name="ListSegmentsGetter";var u=a["default"].getClassFactory(i);n["default"]=u,t.exports=n["default"]},{"../../core/FactoryMaker.js":2,"./SegmentsUtils.js":8}],7:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){function n(){s=(0,u["default"])(o).create(e,t),c=(0,l["default"])(o).create(e,t),f=(0,d["default"])(o).create(e,t)}function r(e,t,n,r,o){var a,u=e.segmentInfoType;return"SegmentBase"!==u&&"BaseURL"!==u&&i(e,n)?("SegmentTimeline"===u?a=s.getSegments(e,t,n,o):"SegmentTemplate"===u?a=c.getSegments(e,t,n,o):"SegmentList"===u&&(a=f.getSegments(e,t,n,o)),r&&r(e,a)):a=e.segments,a}function i(e,t){var n,r,i=e.segments,o=!1;return i&&0!==i.length?(r=i[0].availabilityIdx,n=i[i.length-1].availabilityIdx,o=t<r||t>n):o=!0,o}var o=this.context,a=void 0,s=void 0,c=void 0,f=void 0;return a={getSegments:r},n(),a}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../../core/FactoryMaker.js"),a=r(o),s=e("./TimelineSegmentsGetter.js"),u=r(s),c=e("./TemplateSegmentsGetter.js"),l=r(c),f=e("./ListSegmentsGetter.js"),d=r(f);i.__dashjs_factory_name="SegmentsGetter";var h=a["default"].getClassFactory(i);n["default"]=h,t.exports=n["default"]},{"../../core/FactoryMaker.js":2,"./ListSegmentsGetter.js":6,"./TemplateSegmentsGetter.js":9,"./TimelineSegmentsGetter.js":10}],8:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){for(;e.length<t;)e="0"+e;return e}function o(e,t){return e.representation.startNumber+t}function a(e,t,n){for(var r,o,a,s,u,c,l="%0",f=t.length,d=l.length;;){if(r=e.indexOf("$"+t),r<0)return e;if(o=e.indexOf("$",r+f),o<0)return e;if(a=e.indexOf(l,r+f),a>r&&a<o)switch(s=e.charAt(o-1),u=parseInt(e.substring(a+d,o-1),10),s){case"d":case"i":case"u":c=i(n.toString(),u);break;case"x":c=i(n.toString(16),u);break;case"X":c=i(n.toString(16),u).toUpperCase();break;case"o":c=i(n.toString(8),u);break;default:return e}else c=n;e=e.substring(0,r)+c+e.substring(o+1)}}function s(e,t,n,r){var i,a,s,u;return a=n.segmentDuration,isNaN(a)&&(a=n.adaptation.period.duration),s=n.adaptation.period.start+r*a,u=s+a,i=new h["default"],i.representation=n,i.duration=a,i.presentationStartTime=s,i.mediaStartTime=e.calcMediaTimeFromPresentationTime(i.presentationStartTime,n),i.availabilityStartTime=e.calcAvailabilityStartTimeFromPresentationTime(i.presentationStartTime,n.adaptation.period.mpd,t),i.availabilityEndTime=e.calcAvailabilityEndTimeFromPresentationTime(u,n.adaptation.period.mpd,t),i.wallStartTime=e.calcWallTimeForSegment(i,t),i.replacementNumber=o(i,r),i.availabilityIdx=r,i}function u(e,t,n,r,i,s,u,c,l){var f,d,p,_=r/s,m=Math.min(i/s,n.adaptation.period.mpd.maxSegmentDuration);return f=e.calcPresentationTimeFromMediaTime(_,n),d=f+m,p=new h["default"],p.representation=n,p.duration=m,p.mediaStartTime=_,p.presentationStartTime=f,p.availabilityStartTime=n.adaptation.period.mpd.manifest.loadedTime,p.availabilityEndTime=e.calcAvailabilityEndTimeFromPresentationTime(d,n.adaptation.period.mpd,t),p.wallStartTime=e.calcWallTimeForSegment(p,t),p.replacementTime=r,p.replacementNumber=o(p,l),u=a(u,"Number",p.replacementNumber),u=a(u,"Time",p.replacementTime),p.media=u,p.mediaRange=c,p.availabilityIdx=l,p}function c(e,t){if(!t||!t.segments)return null;var n,r,i=t.segments.length;if(e<i&&(n=t.segments[e],n&&n.availabilityIdx===e))return n;for(r=0;r<i;r++)if(n=t.segments[r],n&&n.availabilityIdx===e)return n;return null}function l(e,t,n,r,i){var o,a,s,u=2,c=i||10,l=0,f=Number.POSITIVE_INFINITY;return t&&!e.isTimeSyncCompleted()?s={start:l,end:f}:!t&&n||r<0?null:(o=Math.max(r-u,l),a=Math.min(r+c,f),s={start:o,end:a})}function f(e,t,n,r,i,o){var a,s,u,l=n.segmentDuration,f=n.adaptation.period.mpd.manifest.minBufferTime,d=n.segmentAvailabilityRange,h={start:e.calcPeriodRelativeTimeFromMpdRelativeTime(n,d.start),end:e.calcPeriodRelativeTimeFromMpdRelativeTime(n,d.end)},p=n.segments,_=2*l,m=o||Math.max(2*f,10*l),v=NaN,g=null;return h.start=Math.max(h.start,0),t&&!e.isTimeSyncCompleted()?(a=Math.floor(h.start/l),s=Math.floor(h.end/l),u={start:a,end:s}):(p&&p.length>0?(g=c(i,n),v=g?e.calcPeriodRelativeTimeFromMpdRelativeTime(n,g.presentationStartTime):i>0?i*l:e.calcPeriodRelativeTimeFromMpdRelativeTime(n,r)):v=i>0?i*l:t?h.end:h.start,a=Math.floor(Math.max(v-_,h.start)/l),s=Math.floor(Math.min(a+m/l,h.end/l)),u={start:a,end:s})}Object.defineProperty(n,"__esModule",{value:!0}),n.replaceTokenForTemplate=a,n.getIndexBasedSegment=s,n.getTimeBasedSegment=u,n.getSegmentByIndex=c,n.decideSegmentListRangeForTimeline=l,n.decideSegmentListRangeForTemplate=f;var d=e("./../vo/Segment.js"),h=r(d)},{"./../vo/Segment.js":11}],9:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){function n(e,n,i,o){var a,u,c,l,f,d=e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].SegmentTemplate,h=e.segmentDuration,p=e.segmentAvailabilityRange,_=[],m=null,v=null;for(f=e.startNumber,a=isNaN(h)&&!t?{start:f,end:f}:(0,s.decideSegmentListRangeForTemplate)(r,t,e,n,i,o),c=a.start,l=a.end,u=c;u<=l;u++)v=(0,s.getIndexBasedSegment)(r,t,e,u),v.replacementTime=(f+u-1)*e.segmentDuration,m=d.media,m=(0,s.replaceTokenForTemplate)(m,"Number",v.replacementNumber),m=(0,s.replaceTokenForTemplate)(m,"Time",v.replacementTime),v.media=m,_.push(v),v=null;return isNaN(h)?e.availableSegmentsNumber=1:e.availableSegmentsNumber=Math.ceil((p.end-p.start)/h),_}var r=e.timelineConverter,i=void 0;return i={getSegments:n}}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../../core/FactoryMaker.js"),a=r(o),s=e("./SegmentsUtils.js");i.__dashjs_factory_name="TemplateSegmentsGetter";var u=a["default"].getClassFactory(i);n["default"]=u,t.exports=n["default"]},{"../../core/FactoryMaker.js":2,"./SegmentsUtils.js":8}],10:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){function n(e,n,i,o){var a,u,c,l,f,d,h,p,_,m,v,g,y,b,w=e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].SegmentTemplate,C=w.SegmentTimeline,k=e.availableSegmentsNumber>0,E=10,S=0,T=0,j=-1,A=[],I=!1,D=function(n){return(0,s.getTimeBasedSegment)(r,t,e,S,n.d,b,w.media,n.mediaRange,j)};for(b=e.timescale,a=C.S_asArray,_=(0,s.decideSegmentListRangeForTimeline)(r,t,n,i,o),_?(g=_.start,y=_.end):v=r.calcMediaTimeFromPresentationTime(n||0,e),c=0,l=a.length;c<l;c++){if(u=a[c],d=0,u.hasOwnProperty("r")&&(d=u.r),u.hasOwnProperty("t")&&(S=u.t,T=S/b),d<0){if(p=a[c+1],p&&p.hasOwnProperty("t"))h=p.t/b;else{var P=e.segmentAvailabilityRange?e.segmentAvailabilityRange.end:r.calcSegmentAvailabilityRange(e,t).end;h=r.calcMediaTimeFromPresentationTime(P,e),e.segmentDuration=u.d/b}d=Math.ceil((h-T)/(u.d/b))-1}if(m){if(k)break;j+=d+1}else for(f=0;f<=d;f++){if(j++,_){if(j>y){if(m=!0,k)break;continue}j>=g&&A.push(D(u))}else{if(A.length>E){if(m=!0,k)break;continue}I?A.push(D(u)):T>=v-u.d/b*1.5&&(I=!0,A.push(D(u)))}S+=u.d,T=S/b}}return k||(e.availableSegmentsNumber=j+1),A}var r=e.timelineConverter,i=void 0;return i={getSegments:n}}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../../core/FactoryMaker.js"),a=r(o),s=e("./SegmentsUtils.js");i.__dashjs_factory_name="TimelineSegmentsGetter";var u=a["default"].getClassFactory(i);n["default"]=u,t.exports=n["default"]},{"../../core/FactoryMaker.js":2,"./SegmentsUtils.js":8}],11:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function o(){r(this,o),this.indexRange=null,this.index=null,this.mediaRange=null,this.media=null,this.duration=NaN,this.replacementTime=null,this.replacementNumber=NaN,this.mediaStartTime=NaN,this.presentationStartTime=NaN,this.availabilityStartTime=NaN,this.availabilityEndTime=NaN,this.availabilityIdx=NaN,this.wallStartTime=NaN,this.representation=null};n["default"]=i,t.exports=n["default"]},{}],12:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":s(t))&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":s(t)));e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};Object.defineProperty(n,"__esModule",{value:!0});var u=e("../core/events/EventsBase.js"),c=r(u),l=function(e){function t(){i(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));return e.BUFFER_EMPTY="bufferstalled",e.BUFFER_LOADED="bufferloaded",e.BUFFER_LEVEL_STATE_CHANGED="bufferStateChanged",e.ERROR="error",e.LOG="log",e.MANIFEST_LOADED="manifestloaded",e.METRICS_CHANGED="metricschanged",e.METRIC_CHANGED="metricchanged",e.METRIC_ADDED="metricadded",e.METRIC_UPDATED="metricupdated",e.PERIOD_SWITCH_COMPLETED="streamswitchcompleted",e.PERIOD_SWITCH_STARTED="streamswitchstarted",e.STREAM_INITIALIZED="streaminitialized",e.TEXT_TRACKS_ADDED="alltexttracksadded",e.TEXT_TRACK_ADDED="texttrackadded",e.CAN_PLAY="canPlay",e.PLAYBACK_ENDED="playbackEnded",e.PLAYBACK_ERROR="playbackError",e.PLAYBACK_METADATA_LOADED="playbackMetaDataLoaded",e.PLAYBACK_PAUSED="playbackPaused",e.PLAYBACK_PLAYING="playbackPlaying",e.PLAYBACK_PROGRESS="playbackProgress",e.PLAYBACK_RATE_CHANGED="playbackRateChanged",e.PLAYBACK_SEEKED="playbackSeeked",e.PLAYBACK_SEEKING="playbackSeeking",e.PLAYBACK_STARTED="playbackStarted",e.PLAYBACK_TIME_UPDATED="playbackTimeUpdated",e}return a(t,e),t}(c["default"]),f=new l;n["default"]=f,t.exports=n["default"]},{"../core/events/EventsBase.js":5}],13:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(){function e(){var e,t;ge=[],ve=!1,me=!0,we=!0,Ne=!1,Ee={enabled:!0,ttl:d},Se={enabled:!0,ttl:h},ye=f,be=void 0,Ce=m,ke=v,Te=g,je=y,Ae=b,Ie=w,De=C,Pe=p,Re=_,Oe=I,e={},i(e,c["default"].MPD_TYPE,S),i(e,c["default"].XLINK_EXPANSION_TYPE,j),i(e,c["default"].MEDIA_SEGMENT_TYPE,k),i(e,c["default"].INIT_SEGMENT_TYPE,k),i(e,c["default"].BITSTREAM_SWITCHING_SEGMENT_TYPE,k),i(e,c["default"].INDEX_SEGMENT_TYPE,k),i(e,c["default"].OTHER_TYPE,k),Me=e,t={},i(t,c["default"].MPD_TYPE,T),i(t,c["default"].XLINK_EXPANSION_TYPE,A),i(t,c["default"].MEDIA_SEGMENT_TYPE,E),i(t,c["default"].INIT_SEGMENT_TYPE,E),i(t,c["default"].BITSTREAM_SWITCHING_SEGMENT_TYPE,E),i(t,c["default"].INDEX_SEGMENT_TYPE,E),i(t,c["default"].OTHER_TYPE,E),xe=t}function t(e){Ne=e}function n(){return Ne}function r(e){Pe=e}function o(){return Pe}function a(e){Re=e}function s(){return Re}function u(e){Te=e}function l(){return Te}function D(e){je=e}function P(){return je}function R(e){Ae=e}function M(){return Ae}function x(e){Ie=e}function O(){return Ie}function N(e){De=e}function L(){return De}function U(e){Ce=e}function B(){return Ce}function F(e,t){Ee.enabled=e,void 0===t||isNaN(t)||"number"!=typeof t||(Ee.ttl=t)}function H(){return Ee}function q(e,t){Se.enabled=e,void 0===t||isNaN(t)||"number"!=typeof t||(Se.ttl=t)}function G(){return Se}function V(e){ke=e}function z(){return ke}function K(e){Me[c["default"].MEDIA_SEGMENT_TYPE]=e}function Y(e,t){Me[e]=t}function W(){return Me[c["default"].MEDIA_SEGMENT_TYPE]}function X(e){return Me[e]}function Z(e){xe[c["default"].MEDIA_SEGMENT_TYPE]=e}function J(e,t){xe[e]=t}function Q(){return xe[c["default"].MEDIA_SEGMENT_TYPE]}function $(e){return xe[e]}function ee(e){Oe=e}function te(){return Oe}function ne(e){we=e}function re(){return we}function ie(e){ye=e}function oe(e){be=e}function ae(){return ye}function se(){return be}function ue(e){me=e}function ce(){return me}function le(e){ve=e}function fe(){return ve}function de(e){ge=e}function he(){return ge}function pe(){}var _e=void 0,me=void 0,ve=void 0,ge=void 0,ye=void 0,be=void 0,we=void 0,Ce=void 0,ke=void 0,Ee=void 0,Se=void 0,Te=void 0,je=void 0,Ae=void 0,Ie=void 0,De=void 0,Pe=void 0,Re=void 0,Me=void 0,xe=void 0,Oe=void 0,Ne=void 0;return _e={setBufferOccupancyABREnabled:t,getBufferOccupancyABREnabled:n,setBandwidthSafetyFactor:r,getBandwidthSafetyFactor:o,setAbandonLoadTimeout:a,getAbandonLoadTimeout:s,setLastBitrateCachingInfo:F,getLastBitrateCachingInfo:H,setLastMediaSettingsCachingInfo:q,getLastMediaSettingsCachingInfo:G,setStableBufferTime:u,getStableBufferTime:l,setBufferTimeAtTopQuality:D,getBufferTimeAtTopQuality:P,setBufferTimeAtTopQualityLongForm:R,getBufferTimeAtTopQualityLongForm:M,setLongFormContentDurationThreshold:x,getLongFormContentDurationThreshold:O,setRichBufferThreshold:N,getRichBufferThreshold:L,setBufferToKeep:U,getBufferToKeep:B,setBufferPruningInterval:V,getBufferPruningInterval:z,setFragmentRetryAttempts:K,getFragmentRetryAttempts:W,setRetryAttemptsForType:Y,getRetryAttemptsForType:X,setFragmentRetryInterval:Z,getFragmentRetryInterval:Q,setRetryIntervalForType:J,getRetryIntervalForType:$,setWallclockTimeUpdateInterval:ee,getWallclockTimeUpdateInterval:te,setScheduleWhilePaused:ne,getScheduleWhilePaused:re,getUseSuggestedPresentationDelay:fe,setUseSuggestedPresentationDelay:le,setLiveDelayFragmentCount:ie,getLiveDelayFragmentCount:ae,getLiveDelay:se,setLiveDelay:oe,setUseManifestDateHeaderTimeSource:ue,getUseManifestDateHeaderTimeSource:ce,setUTCTimingSources:de,getUTCTimingSources:he,reset:pe},e(),_e}Object.defineProperty(n,"__esModule",{value:!0});var a=e("../../core/FactoryMaker.js"),s=r(a),u=e("../vo/metrics/HTTPRequest.js"),c=r(u),l={scheme:"urn:mpeg:dash:utc:http-xsdate:2014",value:"http://time.akamai.com/?iso"},f=4,d=36e4,h=36e4,p=.9,_=1e4,m=30,v=30,g=12,y=30,b=60,w=600,C=20,k=3,E=1e3,S=3,T=500,j=1,A=500,I=50;o.__dashjs_factory_name="MediaPlayerModel";var D=s["default"].getSingletonFactory(o);D.DEFAULT_UTC_TIMING_SOURCE=l,n["default"]=D,t.exports=n["default"]},{"../../core/FactoryMaker.js":2,"../vo/metrics/HTTPRequest.js":15}],14:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(){function e(e){f.trigger(u["default"].ERROR,{error:"capability",event:e})}function t(e,t,n){f.trigger(u["default"].ERROR,{error:"download",event:{id:e,url:t,request:n}})}function n(e,t,n){f.trigger(u["default"].ERROR,{error:"manifestError",event:{message:e,id:t,manifest:n}})}function r(e,t,n){f.trigger(u["default"].ERROR,{error:"cc",event:{message:e,id:t,cc:n}})}function i(e){f.trigger(u["default"].ERROR,{error:"mediasource",event:e})}function o(e){f.trigger(u["default"].ERROR,{error:"key_session",event:e})}function s(e){f.trigger(u["default"].ERROR,{error:"key_message",event:e})}var c=void 0,l=this.context,f=(0,a["default"])(l).getInstance();return c={capabilityError:e,downloadError:t,manifestError:n,timedTextError:r,mediaSourceError:i,mediaKeySessionError:o,mediaKeyMessageError:s}}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../../core/EventBus.js"),a=r(o),s=e("../../core/events/Events.js"),u=r(s),c=e("../../core/FactoryMaker.js"),l=r(c),f="mediasource",d="mediakeys",h="manifest",p="SIDX",_="content",m="initialization",v="xlink",g="codec",y="parse",b="nostreams",w="parse";i.__dashjs_factory_name="ErrorHandler";var C=l["default"].getSingletonFactory(i);C.CAPABILITY_ERROR_MEDIASOURCE=f,C.CAPABILITY_ERROR_MEDIAKEYS=d,C.DOWNLOAD_ERROR_ID_MANIFEST=h,C.DOWNLOAD_ERROR_ID_SIDX=p,C.DOWNLOAD_ERROR_ID_CONTENT=_,C.DOWNLOAD_ERROR_ID_INITIALIZATION=m,C.DOWNLOAD_ERROR_ID_XLINK=v,C.MANIFEST_ERROR_ID_CODEC=g,C.MANIFEST_ERROR_ID_PARSE=y,C.MANIFEST_ERROR_ID_NOSTREAMS=b,C.TIMED_TEXT_ERROR_ID_PARSE=w,n["default"]=C,t.exports=n["default"]},{"../../core/EventBus.js":1,"../../core/FactoryMaker.js":2,"../../core/events/Events.js":4}],15:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function o(){r(this,o),this.tcpid=null,this.type=null,this.url=null,this.actualurl=null,this.range=null,this.trequest=null,this.tresponse=null,this.responsecode=null,this.interval=null,this.trace=[],this._stream=null,this._tfinish=null,this._mediaduration=null,this._responseHeaders=null,this._serviceLocation=null};i.Trace=function(){function e(){r(this,e),this.s=null,this.d=null,this.b=[]}return e}(),i.MPD_TYPE="MPD",i.XLINK_EXPANSION_TYPE="XLinkExpansion",i.INIT_SEGMENT_TYPE="InitializationSegment",i.INDEX_SEGMENT_TYPE="IndexSegment",i.MEDIA_SEGMENT_TYPE="MediaSegment",i.BITSTREAM_SWITCHING_SEGMENT_TYPE="BitstreamSwitchingSegment",i.OTHER_TYPE="other",n["default"]=i,t.exports=n["default"]},{}],16:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function o(e){function t(e){var t=this.factory,r=this.context;n=function(){return e},i=function(){return r},a=function(){return t.getSingletonInstance(r,"DashManifestModel")},s=function(){return e.timelineConverter}}r(this,o);var n=void 0,i=void 0,a=void 0,s=void 0;this.getDashManifestModel=function(){return a?a():void 0},this.getTimelineConverter=function(){return s?s():void 0},this.getConfig=function(){return n()},this.getContext=function(){return i()},e.extend("Stream",t,!0)};n["default"]=i,t.exports=n["default"]},{}],17:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=e("./DashjsWrapperPrivate"),a=r(o),s=function u(e,t,n){i(this,u),new a["default"](e,t,n)};n["default"]=s,t.exports=n["default"]},{"./DashjsWrapperPrivate":18}],18:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=e("./ManifestHelper"),s=r(a),u=e("./MediaMap"),c=r(u),l=e("./PlayerInterface"),f=r(l),d=e("./SegmentView"),h=r(d),p=e("./FragmentLoaderClassProvider"),_=r(p),m=e("streamroot-p2p"),v=r(m),g=e("../dashjs/src/streaming/MediaPlayerEvents"),y=r(g),b="v1",w=v["default"],C=function(){function e(t,n,r){i(this,e),this._p2pConfig=n,this._player=t,this._liveDelay=r,this._player.setLiveDelay(r),this._player.extend("FragmentLoader",new _["default"](this).SRFragmentLoader,!0),this._player.on(y["default"].MANIFEST_LOADED,this._onManifestLoaded,this)}return o(e,null,[{key:"StreamrootPeerAgentModule",set:function(e){w=e},get:function(){return w}}]),o(e,[{key:"initialize",value:function(t){this.updateManifest(t);var n=new s["default"](this);this._playerInterface=new f["default"](this._player,n,this._liveDelay),this._peerAgentModule=new e.StreamrootPeerAgentModule(this._playerInterface,this._manifest.url,new c["default"](n),this._p2pConfig,h["default"],e.StreamrootPeerAgentModule.StreamTypes.DASH,b)}},{key:"dispose",value:function(){this._peerAgentModule&&this._peerAgentModule.dispose(),this._playerInterface&&this._playerInterface.dispose(),this._manifest=null}},{key:"updateManifest",value:function(e){this._manifest=e}},{key:"_onManifestLoaded",value:function(e){var t=e.data;return t?this._manifest?void(t.url!==this._manifest.url?(this.dispose(),this.initialize(t)):this.updateManifest(t)):void this.initialize(t):void this.dispose()}},{key:"peerAgent",get:function(){return this._peerAgentModule}},{key:"manifest",get:function(){return this._manifest}},{key:"player",get:function(){return this._player}}]),e}();n["default"]=C,t.exports=n["default"]},{"../dashjs/src/streaming/MediaPlayerEvents":12,"./FragmentLoaderClassProvider":19,"./ManifestHelper":20,"./MediaMap":21,"./PlayerInterface":22,"./SegmentView":23,"streamroot-p2p":26}],19:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){var t=1,n=2,r="request is null";this.SRFragmentLoader=function(o){function a(){var t;I=e.peerAgent,P=[],t={},i(t,h["default"].MPD_TYPE,f["default"].DOWNLOAD_ERROR_ID_MANIFEST),i(t,h["default"].XLINK_EXPANSION_TYPE,f["default"].DOWNLOAD_ERROR_ID_XLINK),i(t,h["default"].INIT_SEGMENT_TYPE,f["default"].DOWNLOAD_ERROR_ID_INITIALIZATION),i(t,h["default"].MEDIA_SEGMENT_TYPE,f["default"].DOWNLOAD_ERROR_ID_CONTENT),i(t,h["default"].INDEX_SEGMENT_TYPE,f["default"].DOWNLOAD_ERROR_ID_CONTENT),i(t,h["default"].BITSTREAM_SWITCHING_SEGMENT_TYPE,f["default"].DOWNLOAD_ERROR_ID_CONTENT),i(t,h["default"].OTHER_TYPE,f["default"].DOWNLOAD_ERROR_ID_CONTENT),R=t}function u(e){if("InitializationSegment"!==e.type){var t=new v["default"]({periodId:e.mediaInfo.streamInfo.index,adaptationSetId:e.mediaInfo.index,representationId:e.quality});return new _["default"]({trackView:t,timeStamp:e.startTime})}return null}function l(e){var t={};return e.range&&(t.Range="bytes="+e.range),t}function d(e,t){return{url:T.modifyRequestURL(e.url),headers:t}}function p(e){if(!e)return void C.trigger(s["default"].LOADING_COMPLETED,{request:void 0,error:new Error(n,r)});var i=l(e),o=u(e),a=d(e,i),c=new Date,f=c,h=!0,_=[],m=0,v=E.getRetryAttemptsForType(e.type),g=function(t,n){e.requestStartDate=c,e.firstByteDate=e.firstByteDate||c,e.requestEndDate=new Date,j.addHttpRequest(e.mediaType,null,e.type,e.url,null,e.serviceLocation||null,e.range||null,e.requestStartDate,e.firstByteDate,e.requestEndDate,n,e.duration,null,t?_:null)},y=function(t){g(!0,200),C.trigger(s["default"].LOADING_COMPLETED,{request:e,response:t,sender:w})},b=function(t){var n=new Date;h&&(h=!1,e.firstByteDate=n);var r=0;t.cdnDownloaded&&(r+=t.cdnDownloaded),t.p2pDownloaded&&(r+=t.p2pDownloaded),_.push({s:f,d:n.getTime()-f.getTime(),b:[r?r-m:0]}),f=n,m=r,C.trigger(s["default"].LOADING_PROGRESS,{request:e})},T=function(n){g(!1,n.target.status),v>0?(k("Failed loading fragment: "+e.mediaType+":"+e.type+":"+e.startTime+", retry in "+E.getRetryIntervalForType(e.type)+"ms attempts: "+v),v--,P.push(setTimeout(function(){
p(e,v)},E.getRetryIntervalForType(e.type)))):(k("Failed loading fragment: "+e.mediaType+":"+e.type+":"+e.startTime+" no retry attempts left"),S.downloadError(R[e.type],e.url,e),C.trigger(s["default"].LOADING_COMPLETED,{request:void 0,error:new Error(t,"failed loading fragment")}))};D=I.getSegment(a,{onSuccess:y,onProgress:b,onError:T},o)}function m(){P.forEach(function(e){return clearTimeout(e)}),P=[],D&&D.abort(),D=null}function g(){m()}var y=this.context,b=this.factory,w=this.parent,C=b.getSingletonInstance(y,"EventBus"),k=b.getSingletonInstance(y,"Debug").log,E=(0,c["default"])(y).getInstance(),S=o.errHandler,T=o.requestModifier,j=o.metricsModel,A=void 0,I=void 0,D=void 0,P=void 0,R=void 0;return A={load:p,abort:m,reset:g},a(),A}}Object.defineProperty(n,"__esModule",{value:!0});var a=e("../dashjs/src/core/events/Events.js"),s=r(a),u=e("../dashjs/src/streaming/models/MediaPlayerModel.js"),c=r(u),l=e("../dashjs/src/streaming/utils/ErrorHandler.js"),f=r(l),d=e("../dashjs/src/streaming/vo/metrics/HTTPRequest"),h=r(d),p=e("./SegmentView"),_=r(p),m=e("./TrackView"),v=r(m);n["default"]=o,t.exports=n["default"]},{"../dashjs/src/core/events/Events.js":4,"../dashjs/src/streaming/models/MediaPlayerModel.js":13,"../dashjs/src/streaming/utils/ErrorHandler.js":14,"../dashjs/src/streaming/vo/metrics/HTTPRequest":15,"./SegmentView":23,"./TrackView":25}],20:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=e("./TrackView"),s=r(a),u=e("../dashjs/src/dash/utils/SegmentsGetter"),c=r(u),l=e("./SegmentsCache"),f=r(l),d=e("./DashjsInternals"),h=r(d),p=function(){function e(t){i(this,e),this._wrapper=t;var n=this._player=t.player;this._dashjsInternals=new h["default"](n),this._segmentsCache=new f["default"](n)}return o(e,[{key:"_getSegmentsGetter",value:function(){if(!this._segmentsGetter){var e=this._dashjsInternals.getContext(),t=this._dashjsInternals.getConfig();this._segmentsGetter=(0,c["default"])(e).create(t,this.isLive())}return this._segmentsGetter}},{key:"getSegmentList",value:function(e,t,n){if(this._segmentsCache.hasSegments(e))return this._segmentsCache.getSegments(e);var r=this._dashjsInternals.getDashManifestModel(),i=this._dashjsInternals.getTimelineConverter();if(!r||!i)throw new Error("Tried to get representation before we could have access to dash.js manifest internals");var o=r.getMpd(this._manifest),a=r.getRegularPeriods(this._manifest,o)[e.periodId],s=r.getAdaptationsForPeriod(this._manifest,a)[e.adaptationSetId],u=r.getRepresentationsForAdaptation(this._manifest,s)[e.representationId],c=this.isLive(),l=0;u.segmentAvailabilityRange=i.calcSegmentAvailabilityRange(u,c);var f=this._getSegmentsGetter().getSegments(u,t,l,void 0,n);return f}},{key:"isLive",value:function(){var e=this._dashjsInternals.getDashManifestModel();if(!e)throw new Error("Tried to get representation before we could have access to dash.js manifest internals");return e.getIsDynamic(this._manifest)}},{key:"getCurrentTracks",value:function(){for(var e={},t=["audio","video"],n=0;n<t.length;n++){var r=t[n],i=this._player.getTracksFor(r);if(i&&i.length>0){var o=this._player.getCurrentTrackFor(r),a=this._player.getQualityFor(r);e[r]=new s["default"]({periodId:o.streamInfo.index,adaptationSetId:o.index,representationId:a})}}return e}},{key:"getAllTracks",value:function(){var e={},t=this._player.getStreamsFromManifest(this._manifest);if(t){var n=!0,r=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(n=(o=a.next()).done);n=!0)for(var u=o.value,c=["audio","video"],l=0;l<c.length;l++){var f=c[l];e[f]=[];var d=this._player.getTracksForTypeFromManifest(f,this._manifest,u);if(d){var h=!0,p=!1,_=void 0;try{for(var m,v=d[Symbol.iterator]();!(h=(m=v.next()).done);h=!0)for(var g=m.value,y=0;y<g.representationCount;y++)e[f].push(new s["default"]({periodId:u.index,adaptationSetId:g.index,representationId:y}))}catch(b){p=!0,_=b}finally{try{!h&&v["return"]&&v["return"]()}finally{if(p)throw _}}}}}catch(b){r=!0,i=b}finally{try{!n&&a["return"]&&a["return"]()}finally{if(r)throw i}}}return e}},{key:"_manifest",get:function(){return this._wrapper.manifest}}]),e}();n["default"]=p,t.exports=n["default"]},{"../dashjs/src/dash/utils/SegmentsGetter":7,"./DashjsInternals":16,"./SegmentsCache":24,"./TrackView":25}],21:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=e("./SegmentView"),u=r(s),c=function(){function e(t){o(this,e),this._manifestHelper=t}return a(e,[{key:"isLive",value:function(){return this._manifestHelper.isLive()}},{key:"getSegmentTime",value:function(e){return e.timeStamp}},{key:"getSegmentList",value:function(e,t,n){var r=[],i=void 0,o=this._manifestHelper.getSegmentList(e,t,n);if(void 0!==o){var a=!0,s=!1,c=void 0;try{for(var l,f=o[Symbol.iterator]();!(a=(l=f.next()).done);a=!0){var d=l.value,h=d.mediaStartTime||d.startTime;d.timescale&&(h/=d.timescale),t<=h&&h<=t+n&&(i=new u["default"]({trackView:e,timeStamp:h}),r.push(i))}}catch(p){s=!0,c=p}finally{try{!a&&f["return"]&&f["return"]()}finally{if(s)throw c}}}return r}},{key:"getNextSegmentView",value:function(e){var t=this.getSegmentTime(e)+.2,n=this.getSegmentList(e.trackView,t,30);return n.length?n[0]:null}},{key:"getTrackList",value:function(){for(var e=this._manifestHelper.getAllTracks(),t=[],n=["audio","video"],r=0;r<n.length;r++){var o=n[r];e[o]&&t.push.apply(t,i(e[o]))}return t}}]),e}();n["default"]=c,t.exports=n["default"]},{"./SegmentView":23}],22:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=e("./TrackView"),s=r(a),u=function(){function e(t,n,r){i(this,e),this._player=t,this._manifestHelper=n,this._liveDelay=r,this.MIN_BUFFER_LEVEL=10,this._bufferLevelMax=Math.max(0,this._liveDelay-this.MIN_BUFFER_LEVEL),this._listeners=new Map,this._onStreamInitialized=this._dispatchInitialOnTrackChange.bind(this),this._player.on(dashjs.MediaPlayer.events.STREAM_INITIALIZED,this._onStreamInitialized)}return o(e,[{key:"dispose",value:function(){this._player.off(dashjs.MediaPlayer.events.STREAM_INITIALIZED,this._onStreamInitialized)}},{key:"isLive",value:function(){return this._manifestHelper.isLive()}},{key:"getBufferLevelMax",value:function(){return this._bufferLevelMax}},{key:"setBufferMarginLive",value:function(e){var t=e;t>this._bufferLevelMax&&(t=this._bufferLevelMax),this._dashjsBufferTime=this.MIN_BUFFER_LEVEL+t,this._player.setStableBufferTime(this._dashjsBufferTime),this._player.setBufferTimeAtTopQuality(this._dashjsBufferTime),this._player.setBufferTimeAtTopQualityLongForm(this._dashjsBufferTime)}},{key:"addEventListener",value:function(e,t){if("onTrackChange"===e){var n=this._createOnTrackChangeListener(t);this._listeners.set(t,n),this._player.on("qualityChanged",n)}}},{key:"removeEventListener",value:function(e,t){if("onTrackChange"===e){var n=this._listeners.get(t);this._player.off("qualityChanged",n),this._listeners["delete"](t)}}},{key:"_createOnTrackChangeListener",value:function(e){var t=this._player;return function(n){var r=n.mediaType,i=n.streamInfo,o=n.newQuality,a={};a[r]=new s["default"]({periodId:i.index,adaptationSetId:t.getCurrentTrackFor(r).index,representationId:Number(o)}),e(a)}}},{key:"_dispatchInitialOnTrackChange",value:function(){var e=this._manifestHelper.getCurrentTracks(),t=!0,n=!1,r=void 0;try{for(var i,o=this._listeners.keys()[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var a=i.value;a(e)}}catch(s){n=!0,r=s}finally{try{!t&&o["return"]&&o["return"]()}finally{if(n)throw r}}}}]),e}();n["default"]=u,t.exports=n["default"]},{"./TrackView":25}],23:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(u){i=!0,o=u}finally{try{!r&&s["return"]&&s["return"]()}finally{if(i)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=e("./TrackView"),u=r(s),c=function(){function e(t){i(this,e),this.timeStamp=t.timeStamp,this.trackView=new u["default"](t.trackView)}return a(e,null,[{key:"fromArrayBuffer",value:function(t){var n=new Uint8Array(t),r=n.slice(0,12).buffer,i=new Uint32Array(r),a=o(i,3),s=a[0],u=a[1],c=a[2],l=n.slice(12).buffer,f=new Float64Array(l),d=f[0],h={periodId:s,adaptationSetId:u,representationId:c};return new e({timeStamp:d,trackView:h})}}]),a(e,[{key:"isEqual",value:function(e){if(!e)return!1;var t=e.timeStamp,n=e.trackView;return this.timeStamp===t&&this.trackView.isEqual(n)}},{key:"isInTrack",value:function(e){return this.trackView.isEqual(e)}},{key:"viewToString",value:function(){return this.trackView.viewToString()+"S"+this.timeStamp}},{key:"toArrayBuffer",value:function(){var e=new Uint32Array([this.trackView.periodId,this.trackView.adaptationSetId,this.trackView.representationId]),t=new Float64Array([this.timeStamp]),n=new Uint8Array(e.byteLength+t.byteLength);return n.set(new Uint8Array(e.buffer),0),n.set(new Uint8Array(t.buffer),12),n.buffer}},{key:"getId",value:function(){return this.timeStamp}}]),e}();n["default"]=c,t.exports=n["default"]},{"./TrackView":25}],24:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=e("./TrackView"),s=r(a),u=function(){function e(t){i(this,e),this._player=t,this._player.on("segmentsLoaded",this._onSegmentsLoaded,this),this._cache={}}return o(e,[{key:"_onSegmentsLoaded",value:function(e){var t=e.segments,n=s["default"].makeIDString(e.representation.adaptation.period.index,e.representation.adaptation.index,e.representation.index);this._cache[n]=t}},{key:"hasSegments",value:function(e){return void 0!==this._cache[e.viewToString()]}},{key:"getSegments",value:function(e){return this._cache[e.viewToString()]}}]),e}();n["default"]=u,t.exports=n["default"]},{"./TrackView":25}],25:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(){function e(t){r(this,e),this.periodId=t.periodId,this.adaptationSetId=t.adaptationSetId,this.representationId=t.representationId}return i(e,[{key:"viewToString",value:function(){return e.makeIDString(this.periodId,this.adaptationSetId,this.representationId)}},{key:"isEqual",value:function(e){return!!e&&this.periodId===e.periodId&&this.adaptationSetId===e.adaptationSetId&&this.representationId===e.representationId}}],[{key:"makeIDString",value:function(e,t,n){return"P"+e+"A"+t+"R"+n}}]),e}();n["default"]=o,t.exports=n["default"]},{}],26:[function(t,n,r){(function(i){!function(t){if("object"==typeof r&&"undefined"!=typeof n)n.exports=t();else if("function"==typeof e&&e.amd)e([],t);else{var o;o="undefined"!=typeof window?window:"undefined"!=typeof i?i:"undefined"!=typeof self?self:this,(o.Streamroot||(o.Streamroot={})).Downloader=t()}}(function(){var e;return function n(e,r,i){function o(s,u){if(!r[s]){if(!e[s]){var c="function"==typeof t&&t;if(!u&&c)return c(s,!0);if(a)return a(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var f=r[s]={exports:{}};e[s][0].call(f.exports,function(t){var n=e[s][1][t];return o(n?n:t)},f,f.exports,n,e,r,i)}return r[s].exports}for(var a="function"==typeof t&&t,s=0;s<i.length;s++)o(i[s]);return o}({1:[function(e,t,n){"use strict";function r(e){for(var t=e.from,n=e.to,r=e.step,i=[],o=t;n>o;o+=r)i.push(o);return i.push(n),i}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./js/utils/ObjectHelper"),o={SIGNALING_URL:"wss://sig.streamroot.io/websocket/",ABTEST_DATA_URL:"//files.streamroot.io/p2p/static/tracker-split.json",TRACKER_URL:"https://tracker.streamroot.io",TRACKER_URL_V3:"https://tracker-beta.streamroot.io",CLIENT_TRACKER_PROTOCOL_VERSION:"2.0.0",CLIENT_TRACKER_PROTOCOL_VERSION_V3:"3.0.0",P2P_PROTOCOL_VERSION:"3.0.0",CHUNK_SIZE:15360,P2P_CACHE_MAX_SIZE:136314880,GETSEGMENTTIME_CACHE_MAX_SIZE:1e3,MAX_DL_REQUEST_SPEED:1e3,TIME_BETWEEN_CHUNK_DL:50,NB_CHUNK_DL_GROUP:10,MAX_CHUNK_BY_SEEDER:300,NB_SEGMENT_P2P_PREBUFFER:6,MAX_SEGMENT_REQUEST_STORE:6,NB_SEGMENT_P2P_SKIP:2,MAX_BUFFER_DURATION:300,MAX_UP_SPEED:600,CHUNK_UP_RETRY_DELAY:10,PEER_CONNECTION_TIMEOUT:5e4,PEER_UP_TIMEOUT:5e3,SEND_HEARTBEAT_INTERVAL:5e3,CHECK_HEARTBEAT_INTERVAL:1e4,MAX_USELESS_COUNT:100,MIN_USEFUL_SPEED:5,MIN_NUMBER_OF_PEERS:8,MAX_NUMBER_OF_PEERS:13,MAX_NUMBER_OF_PEERS_ASKED_BY_GET_PEERS_MESSAGE:10,ASK_PEERS_INTERVAL:6e4,SEND_TRACKS_INTERVAL:6e4,CHECK_USELESS_INTERVAL:6e4,SPEED_MONITOR_INTERVAL:1e3,MEAN_SPEED_CALCULATION_INTERVAL:500,CHUNK_TIMEOUT:2500,CHUNK_UP_TIMEOUT:1900,ICECANDIDATES_TIMEOUT:1e3,UP_MAX_BUFFERED_AMOUNT:10,OFFER_DECLINED_TIMEOUT:6e4,PEER_REMOVED_TIMEOUT:9e5,PEER_CONNEXION_ATTEMPT_TIMEOUT:9e5,GEOLOCATION_REQUEST_TIMEOUT:3e3,GEOLOCATION_REQUEST_MAX_RETRY:1,MAX_P2P_PREBUFFERING_TIME:720,RETRY_P2P_START_DL_SEGMENT_DELAY:5e3,ANALYTICS:{KLARA_URL:"https://klara.streamroot.io",RETRY_NUMBER:3,RETRY_DELAY:1e4,TRAFFIC_INTERVAL_ARRAY:r({from:5e3,to:12e4,step:1e4}),STATS_INTERVAL:12e4,CONTROL_INTERVAL:6e5},ERRORS:{API_KEY:"d04c6fa616c255ac55dec6b068ad7172",HANDLER:"xhr",STAGES:["staging","qa","production"]},RY_TRACK:!0,RY_TRACKER:"srTracker",ABR_DEL_T:30,LIVE:{P2P_CACHE_MAX_SIZE:62914560},ENABLE_TURN:!1,STUNSERVERS:[{urls:"stun:stun.l.google.com:19302"}],TURNSERVERS:[{urls:"turn:23.97.160.254:3478?transport=udp",credential:"streamroot",username:"streamroot"}],ALLOW_P2P:!0,RANGE_REQUEST_ALLOWED:!0,DISPLAY_ERROR:!1,PEER_INSTANT_SPEED_CALCULATION_INTERVAL:100,PEER_INSTANT_SPEED_CALCULATION_WINDOW:1e4,PEER_COMPUTE_RTT_INTERVAL:5e3,USE_SIGNALING_SERVER:!0,SIGNALING_DELAY_STEP:2e3,SIGNALING_DELAY_MAX:3e5,TRACKER_DELAY_MAX:3e5,TRACKER_DELAY_INIT:2e3,LOCKED_RETRY_INTERVAL:30,LOCKED_RETRY_TIMEOUT:500,TIMEOUT_GET_FULL_SEGMENT:500,RETURN_COPY_SEGMENT:!0,DEBUG:!1,DEVICE_INFO:"",ID_CLIENT:"",MAX_DISTRIBUTED_SEGMENT_LIST_LENGTH:300};(0,i.deepFreeze)(o),n["default"]=o,t.exports=n["default"]},{"./js/utils/ObjectHelper":87}],2:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/json/stringify"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("./MetricSender"),f=r(l),d=e("../utils/url"),h=Math.random().toString().substring(2),p=Math.random().toString().substring(2),_=Math.random().toString().substring(2);window.Streamroot=window.Streamroot||{},window.Streamroot.klaraToken=window.Streamroot.klaraToken||h+p+_;var m=function(){function e(t,n,r,i,o){(0,s["default"])(this,e),this._serverURL=(0,d.formatUrl)(t),this._clientID=n,this._namespace=i,this._content=r,this._conf=o}return(0,c["default"])(e,[{key:"send",value:function(e,t){e.customer=this._clientID,e.content=this._content,e.version="4.1.2",e.token=window.Streamroot.klaraToken;var n=(0,o["default"])(e),r=""+this._serverURL+this._namespace;t&&(r+="/"+t);var i=new f["default"](r,n,this._conf);i.send(n)}}]),e}();n["default"]=m,t.exports=n["default"]},{"../utils/url":98,"./MetricSender":5,"babel-runtime/core-js/json/stringify":107,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],3:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=function s(){(0,o["default"])(this,s),this.open=0,this.match=0,this.offer=0,this.active=0,this.transfer=0,this.denied=0,this.dropped=0,this.timeout=0,this.disconnected=0,this.p2p=0,this.cdn=0};n["default"]=a,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123}],4:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=e("./TrafficAnalytics"),c=r(u),l=e("./StatsAnalytics"),f=r(l),d=e("../utils/Timers"),h=r(d),p=function(){function e(t,n){var r=this;(0,o["default"])(this,e),this._playerInterface=t,this._trafficIntervalCounter=0,this._conf=n.conf,this._timers=new h["default"],this._trafficAnalytics=new c["default"](this._playerInterface,n),this._statsAnalytics=new f["default"](this._playerInterface,n),this._scheduleTrafficReport(),this._scheduleStatReport(),this._scheduleControlReport(),window.onbeforeunload=function(){r._trafficAnalytics.sendUsage(!0)}}return(0,s["default"])(e,[{key:"dispose",value:function(){this._timers.clearAll()}},{key:"_scheduleTrafficReport",value:function(){var e=this;if(this._trafficIntervalCounter<this._conf.ANALYTICS.TRAFFIC_INTERVAL_ARRAY.length-1)this._timers.setTimeout(function(){e._trafficAnalytics.sendUsage(),e._scheduleTrafficReport()},this._conf.ANALYTICS.TRAFFIC_INTERVAL_ARRAY[this._trafficIntervalCounter]),this._trafficIntervalCounter++;else{var t=this._conf.ANALYTICS.TRAFFIC_INTERVAL_ARRAY[this._conf.ANALYTICS.TRAFFIC_INTERVAL_ARRAY.length-1],n=this._trafficAnalytics.sendUsage.bind(this._trafficAnalytics,!1);this._timers.setInterval(n,t)}}},{key:"_scheduleStatReport",value:function(){this._timers.setInterval(this._statsAnalytics.sendStats.bind(this._statsAnalytics),this._conf.ANALYTICS.STATS_INTERVAL)}},{key:"_scheduleControlReport",value:function(){this._timers.setInterval(this._statsAnalytics.sendControl.bind(this._statsAnalytics),this._conf.ANALYTICS.CONTROL_INTERVAL)}}]),e}();n["default"]=p,t.exports=n["default"]},{"../utils/Timers":92,"./StatsAnalytics":6,"./TrafficAnalytics":7,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],5:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(t,n,r){(0,o["default"])(this,e),this._serverURL=t,this._payload=n,this._conf=r,this._retryCount=0}return(0,s["default"])(e,[{key:"_retry",value:function(){this._retryCount<this._conf.ANALYTICS.RETRY_NUMBER&&setTimeout(this.send.bind(this),this._conf.ANALYTICS.RETRY_DELAY)}},{key:"_onLoad",value:function(e){e.target.status>=500&&e.target.status<600&&this._retry()}},{key:"_onError",value:function(){this._retry()}},{key:"send",value:function(){var e=new XMLHttpRequest;e.open("POST",this._serverURL),e.setRequestHeader("Content-Type","application/json;charset=UTF-8"),e.onload=this._onLoad.bind(this),e.onerror=this._onError.bind(this),e.send(this._payload),this._retryCount++}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],6:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=e("./AnalyticsClient"),c=r(u),l=e("../utils/Delta"),f=function(){function e(t,n){(0,o["default"])(this,e);var r=n.conf,i=n.moduleState;this._status=n.status,this._playerInterface=t,this._analyticsClient=new c["default"](r.ANALYTICS.KLARA_URL,r.ID_CLIENT,i.content,"stats",r),this._analyticsData=n.analyticsData,this._p2pUseful=new l.Delta,this._cdnDownloaded=new l.Delta,this._p2pConsumed=new l.Delta,this._cdnConsumed=new l.Delta,this._rawP2PDownloaded=new l.Delta,this._p2pUploaded=new l.Delta,this._PP=new l.Delta,this._PC=new l.Delta,this._CP=new l.Delta,this._CC=new l.Delta,this._HP=new l.Delta,this._HD=new l.Delta,this._M=new l.Delta,this._total=new l.Delta,this._open=new l.Delta,this._match=new l.Delta,this._offer=new l.Delta,this._active=new l.Delta,this._transfer=new l.Delta,this._denied=new l.Delta,this._dropped=new l.Delta,this._timeout=new l.Delta,this._disconnected=new l.Delta,this._counterMain=0,this._missedIceCandidate=new l.Delta,this._newPeerConnectionCount=new l.Delta,this._p2pSgtCheckSuccess=new l.Delta,this._p2pSgtCheckFail=new l.Delta,this._hybridSgtCheckSuccess=new l.Delta,this._hybridSgtCheckFail=new l.Delta,this._counterControl=0}return(0,s["default"])(e,[{key:"_getPeerStats",value:function(){return{open:this._open.calcDelta(this._analyticsData.open),match:this._match.calcDelta(this._analyticsData.match),offer:this._offer.calcDelta(this._analyticsData.offer),active:this._active.calcDelta(this._analyticsData.active),transfer:this._transfer.calcDelta(this._analyticsData.transfer),denied:this._denied.calcDelta(this._analyticsData.denied),dropped:this._dropped.calcDelta(this._analyticsData.dropped),timeout:this._timeout.calcDelta(this._analyticsData.timeout),disconnected:this._disconnected.calcDelta(this._analyticsData.disconnected)}}},{key:"_calculateStatsPayload",value:function(){var e=this._status.getConnectedToSignalingServer(),t=this._status.getConnected(),n=this._status.getUpgraded(),r=this._status.getTrackerVersion(),i=this._status.getTrackerId(),o={PP:this._status.getDataDownloadedTwice_PP(),PC:this._status.getDataDownloadedTwice_PC(),CP:this._status.getDataDownloadedTwice_CP(),CC:this._status.getDataDownloadedTwice_CC(),HP:this._status.getDataDownloadedTwice_HP(),HD:this._status.getDataDownloadedTwice_HD(),M:this._status.getDataDownloadedTwice_M()},a=o.PP+o.PC+o.CP+o.CC+o.HP+o.HD+o.M,s=this._cdnDownloaded.calcDelta(this._status.getCDNDownloaded()),u=s,c=this._p2pUseful.calcDelta(this._status.getP2PDownloaded()),l=this._p2pConsumed.calcDelta(this._analyticsData.p2p),f=this._cdnConsumed.calcDelta(this._analyticsData.cdn),d=this._rawP2PDownloaded.calcDelta(this._status.getRawDataDownloaded()),h=this._p2pUploaded.calcDelta(this._status.getRawDataUploaded()),p={rawP2PDownloaded:d,cdnDownloaded:s,p2pUseful:c,cdnUseful:u,p2pConsumed:l,cdnConsumed:f,p2pUploaded:h,multipleDl:{PP:this._PP.calcDelta(o.PP),PC:this._PC.calcDelta(o.PC),CP:this._CP.calcDelta(o.CP),CC:this._CC.calcDelta(o.CC),HP:this._HP.calcDelta(o.HP),HD:this._HD.calcDelta(o.HD),M:this._M.calcDelta(o.M),total:this._total.calcDelta(a)}},_={transfers:p,live:this._playerInterface.isLive(),signalingServerConnected:e,trackerConnected:t,trackerUpgraded:n,trackerVersion:r,peers:this._getPeerStats(),counter:this._counterMain,trackerId:i};return this._counterMain++,_}},{key:"_calculateControlPayload",value:function(){var e=this._missedIceCandidate.calcDelta(this._status.getMissedIceCandidateCount()),t=this._newPeerConnectionCount.calcDelta(this._status.getNewPeerConnectionCount()),n=e?e/t:0,r=this._p2pSgtCheckSuccess.calcDelta(this._status.getNbRightHashP2P()),i=this._p2pSgtCheckFail.calcDelta(this._status.getNbWrongHashP2P()),o=this._hybridSgtCheckSuccess.calcDelta(this._status.getNbRightHashDLM()),a=this._hybridSgtCheckFail.calcDelta(this._status.getNbWrongHashDLM()),s={live:this._playerInterface.isLive(),meanMissedIceCandidate:n,p2pSgtCheckSuccess:r,p2pSgtCheckFail:i,hybridSgtCheckSuccess:o,hybridSgtCheckFail:a,counter:this._counterControl};return this._counterControl++,s}},{key:"sendStats",value:function(){var e=this._calculateStatsPayload();this._analyticsClient.send(e)}},{key:"sendControl",value:function(){var e=this._calculateControlPayload();this._analyticsClient.send(e,"control")}}]),e}();n["default"]=f,t.exports=n["default"]},{"../utils/Delta":85,"./AnalyticsClient":2,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],7:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=e("./AnalyticsClient"),c=r(u),l=e("../utils/Delta"),f=function(){function e(t,n){(0,o["default"])(this,e);var r=n.conf,i=n.analyticsData,a=n.status,s=n.moduleState;this._analyticsClient=new c["default"](r.ANALYTICS.KLARA_URL,r.ID_CLIENT,s.content,"traffic",r),this._playerInterface=t,this._analyticsData=i,this._status=a,this._p2p=new l.Delta,this._cdn=new l.Delta,this._upload=new l.Delta,this._timespan=new l.Delta,this._timespan.calcDelta(Date.now())}return(0,s["default"])(e,[{key:"_calculateUsagePayload",value:function(){var e=this._p2p.calcDelta(this._status.getP2PDownloaded()),t=this._cdn.calcDelta(this._status.getCDNDownloaded()),n=this._upload.calcDelta(this._status.getP2PUploaded()),r=this._timespan.calcDelta(Date.now()),i={live:this._playerInterface.isLive(),cdn:t,p2p:e,upload:n,timespan:r};return i}},{key:"sendUsage",value:function(e){var t=this._calculateUsagePayload();e&&(t.unload=!0),this._analyticsClient.send(t,"usage")}}]),e}();n["default"]=f,t.exports=n["default"]},{"../utils/Delta":85,"./AnalyticsClient":2,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],8:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/assign"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("bugsnag-js"),f=r(l),d=e("../../defaultConf"),h=r(d),p=function(){function e(){(0,s["default"])(this,e),this._metadata={},this._scriptOrigin=null,f["default"].apiKey=h["default"].ERRORS.API_KEY,f["default"].notifyHandler=h["default"].ERRORS.HANDLER,f["default"].notifyReleaseStages=h["default"].ERRORS.STAGES,f["default"].disableLog=!0,f["default"].releaseStage="production",f["default"].appVersion=this._getAppVersion(),f["default"].beforeNotify=this._beforeNotify()}return(0,c["default"])(e,[{key:"notify",value:function(e,t,n){var r="warning";!n||"error"!==n&&"info"!==n||(r=n),f["default"].notify(e,t,this._metadata,r)}},{key:"notifyError",value:function(e){f["default"].notifyException(e,{groupingHash:e.message})}},{key:"resetRateLimit",value:function(){f["default"].refresh()}},{key:"_beforeNotify",value:function(){var e=this;return function(t){return!(!t.file||t.file!==e._scriptOrigin)}}},{key:"_getAppVersion",value:function(){var e="4.1.2";return e.split("-")[0]}},{key:"setMetadata",value:function(e){(0,o["default"])(this._metadata,e),f["default"].metaData=this._metadata}},{key:"setCustomer",value:function(e){f["default"].userId=e}},{key:"setScriptOrigin",value:function(e){this._scriptOrigin=e}}]),e}();n["default"]=new p,t.exports=n["default"]},{"../../defaultConf":1,"babel-runtime/core-js/object/assign":109,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"bugsnag-js":133}],9:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./TimedValue"),o=r(i),a=function(e){var t=[],n=e,r=function(){for(var e=-1,r=Date.now(),i=0;i<t.length&&r-t[i].timestamp()>n;i++)e=i;return e},i=function(){var e=r();e>-1&&t.splice(0,e+1)},a=function(e){if(0!==e){i();var n=new o["default"](e);t.push(n)}},s=function(){if(i(),!t.length)return 0;for(var e=0,n=0;n<t.length;n++)e+=t[n].value();return e/t.length};this.addPoint=a,this.compute=s};n["default"]=a,t.exports=n["default"]},{"./TimedValue":10}],10:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e){var t=e,n=Date.now();this.timestamp=function(){return n},this.value=function(){return t}};n["default"]=r,t.exports=n["default"]},{}],11:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/typeof"),o=r(i),a=e("babel-runtime/core-js/get-iterator"),s=r(a),u=e("../utils/Timers"),c=r(u),l=(e("../utils/nativeTimers"),function(e,t,n){function r(){var e=p.getSegmentListToDownload().slice(0,d.NB_SEGMENT_P2P_PREBUFFER);if(a()+d.NB_CHUNK_DL_GROUP*d.CHUNK_SIZE/1024<d.MAX_DL_REQUEST_SPEED)for(var t=0;t<d.NB_CHUNK_DL_GROUP;t++)i(e)}function i(e){var t=!0,n=!1,r=void 0;try{for(var i,a=function(){var e=i.value,t=_.getOrCreateSegmentHandler(e),n=t.seeders.getNextSeeder(t.chunkManager.chunkNumber);if(n){var r=function(){var r=t.chunkManager.getNextChunk();return r>=0?(n.requestChunk(e,r),l(),h.setTimeout(function(){t.chunkManager.timeOut(r),n.getHeuristic().incrementNbChunkTimeOut()},d.CHUNK_TIMEOUT),{v:{v:void 0}}):void 0}();if("object"===("undefined"==typeof r?"undefined":(0,o["default"])(r)))return r.v}},u=(0,s["default"])(e);!(t=(i=u.next()).done);t=!0){var c=a();if("object"===("undefined"==typeof c?"undefined":(0,o["default"])(c)))return c.v}}catch(f){n=!0,r=f}finally{try{!t&&u["return"]&&u["return"]()}finally{if(n)throw r}}}function a(){var e=u();return e===!1?m=[]:e>0&&m.splice(0,e),m.length*d.CHUNK_SIZE/1024}function u(){for(var e=Date.now(),t=0;t<m.length;t++)if(e-m[t]<=1e3)return t;return!1}function l(){var e=Date.now();m.push(e)}function f(){h.clearAll()}var d=n.conf,h=new c["default"],p=t,_=e,m=[];h.setInterval(r,d.TIME_BETWEEN_CHUNK_DL),this.addChunkRequest=l,this.dispose=f});n["default"]=l,t.exports=n["default"]},{"../utils/Timers":92,"../utils/nativeTimers":96,"babel-runtime/core-js/get-iterator":105,"babel-runtime/helpers/typeof":129}],12:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=e("./PartialSegment/PartialSegmentP2P"),c=r(u),l=e("eventemitter3"),f=r(l),d=e("./binaryAbstraction/Segment"),h=r(d),p=function(){function e(t,n,r,i,a){(0,o["default"])(this,e),this._sharedState=a,this._conf=a.conf,this._status=a.status,this._workerHelper=a.workerHelper;var s=new f["default"];this.p2pCache=n,this.dataLocked=!1,this._isEmpty=!0,this._segmentCoord=t,this.downloadStatus=[],
this.getEE=function(){return s},this._peerPool=r,this._segmentInfoMap=i}return(0,s["default"])(e,[{key:"addSegmentSize",value:function(e){if(!this.size){this.size=e,this.chunkNumber=Math.ceil(this.size/this._conf.CHUNK_SIZE);for(var t=0;t<this.chunkNumber;t++)this.downloadStatus.push("pending");this.segment=new h["default"](e)}}},{key:"getChunk",value:function(e,t){if(this.dataLocked||"downloaded"!==this.downloadStatus[e]&&"CDNdownloaded"!==this.downloadStatus[e])this.dataLocked,t(null);else{var n=this._conf.CHUNK_SIZE,r=e*this._conf.CHUNK_SIZE;r+n>this.size&&(n=this.size-r),this.segment.getBinaryData(r,n,t)}}},{key:"getNextChunk",value:function(){var e=this.downloadStatus.indexOf("failed");return 0>e&&(e=this.downloadStatus.indexOf("pending")),e>=0&&(this.downloadStatus[e]="downloading"),e}},{key:"chunkDownloaded",value:function(e,t){if(this._isEmpty=!1,"downloaded"===this.downloadStatus[t])this._status.correctP2PDownloaded(e.byteLength,"PP");else if("CDNdownloaded"===this.downloadStatus[t]||this._writeLock)this._status.correctP2PDownloaded(e.byteLength,"CP");else if(this.downloadStatus[t]="downloaded",this._status.setp2pDownloadedNewAnalytics(this._status.getp2pDownloadedNewAnalytics()+e.byteLength),this.segment.setBinaryData(e,t*this._conf.CHUNK_SIZE),this.isSegmentDownloaded()){var n=this.segment,r=this.p2pCache.getSegmentHandler(this._segmentCoord);r.seeders.cleanAfterDownloaded(),this.lockSegmentData(),this._checkHashP2P(n)}}},{key:"timeOut",value:function(e){"downloading"===this.downloadStatus[e]&&(this.downloadStatus[e]="failed")}},{key:"isSegmentDownloaded",value:function(){if(this.size){for(var e=this.downloadStatus.length-1;e>=0;e--)if("downloaded"!==this.downloadStatus[e]&&"CDNdownloaded"!==this.downloadStatus[e])return!1;return!0}return!1}},{key:"shouldDownloadSegment",value:function(){return!(this.isSegmentDownloaded()||this.partialSegment)}},{key:"getPartialSegment",value:function(){if(this.size&&!this._isEmpty){var e=this.partialSegment||new c["default"](this._segmentCoord,this.p2pCache,this.segment,this.downloadStatus,this.size,this,this.isSegmentDownloaded(),this._segmentInfoMap,this._sharedState);return this.dataLocked||(this._writeLock=!0,this.partialSegment=e),e}return!1}},{key:"getIndexLastChunkInARow",value:function(){for(var e=0;e<this.downloadStatus.length;e++)if("downloaded"!==this.downloadStatus[e]&&"CDNdownloaded"!==this.downloadStatus[e])return e-1;return this.downloadStatus.length-1}},{key:"storeSegment",value:function(e){this._isEmpty=!1,this.size||this.addSegmentSize(e.byteLength),this.segment=e,this._updateDownloadStatus()}},{key:"_updateDownloadStatus",value:function(){var e;e={start:0,end:this.chunkNumber},this.partialSegment&&this.partialSegment.getCDNIndexRange()&&(e=this.partialSegment.getCDNIndexRange());for(var t=e.start;t<e.end;t++){if("downloaded"===this.downloadStatus[t]||"CDNdownloaded"===this.downloadStatus[t]){var n=this._conf.CHUNK_SIZE;t===this.chunkNumber-1&&(n=this.size-(this.chunkNumber-1)*this._conf.CHUNK_SIZE),"downloaded"===this.downloadStatus[t]?this._status.correctP2PDownloaded(n,"PC"):"CDNdownloaded"===this.downloadStatus[t]&&this._status.correctP2PDownloaded(n,"CC")}this.downloadStatus[t]="CDNdownloaded"}}},{key:"getP2PDownload_CDNDownload",value:function(){var e=0,t=0;if(this.size){for(var n=0,r=this.downloadStatus.length-1;r>n;n++)"downloaded"===this.downloadStatus[n]?e+=this._conf.CHUNK_SIZE:"CDNdownloaded"===this.downloadStatus[n]&&(t+=this._conf.CHUNK_SIZE);var i=this.size-(this.chunkNumber-1)*this._conf.CHUNK_SIZE;"downloaded"===this.downloadStatus[this.chunkNumber-1]?e+=i:"CDNdownloaded"===this.downloadStatus[this.chunkNumber-1]&&(t+=i)}return{p2pDownloaded:e,cdnDownloaded:t}}},{key:"lockSegmentData",value:function(){this.dataLocked=!0}},{key:"unlockSegmentData",value:function(){this.dataLocked=!1}},{key:"removePartialSegment",value:function(){delete this.partialSegment}},{key:"_checkHashP2P",value:function(e){var t=this,n=this._segmentInfoMap.getSegmentInfo(this._segmentCoord),r=function(e,r){n.hash===r?(t._status.setNbRightHashP2P(t._status.getNbRightHashP2P()+1),t.segment=new h["default"](e),t.unlockSegmentData(),t._peerPool.broadcastSegmentInfo(n.segmentCoord)):(t._status.setNbWrongHashP2P(t._status.getNbWrongHashP2P()+1),t.p2pCache.removeSegmentHandler(n.segmentCoord),t._status.correctP2PDownloaded(t.size,"HP"))};e.getBinaryData(0,e.byteLength,function(e){t._workerHelper.callHashWorker(e,r)})}}]),e}();n["default"]=p,t.exports=n["default"]},{"./PartialSegment/PartialSegmentP2P":27,"./binaryAbstraction/Segment":43,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,eventemitter3:257}],13:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n){function r(e,t,n,r){var a=i.getSegmentHandler(t).chunkManager;a?a.chunkDownloaded(r,n):o.correctP2PDownloaded(r.byteLength,"M"),e.getHeuristic().incrementNbChunkDownloaded()}var i=e,o=n.status;t.getEE().on("chunkReceived",r)};n["default"]=r,t.exports=n["default"]},{}],14:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./UploadQueue"),o=r(i),a=function(e,t,n){function r(e,t,n){var r=Date.now(),o=i.getSegmentHandler(t).chunkManager;o&&o.getChunk(n,function(i){i&&a.add(e,t,n,i,r)})}var i=e,a=new o["default"](n);t.getEE().on("chunkRequested",r)};n["default"]=a,t.exports=n["default"]},{"./UploadQueue":42}],15:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/slicedToArray"),o=r(i),a=e("babel-runtime/core-js/get-iterator"),s=r(a),u=e("babel-runtime/core-js/map"),c=r(u),l=e("babel-runtime/helpers/classCallCheck"),f=r(l),d=e("babel-runtime/helpers/createClass"),h=r(d),p=e("../utils/Options"),_=e("../../defaultConf"),m=(r(_),function(){function e(t,n){var r=this;(0,f["default"])(this,e),this._segmentListMap=new c["default"],this._conf=n.conf;var i=t.getTrackList();i.forEach(function(e){r._segmentListMap.set(e,[])})}return(0,h["default"])(e,[{key:"insert",value:function(e){var t=this._getMatchingTrack(e),n=(0,p.unwrap)(this._segmentListMap.get(t));if(0===n.length)n.push(e);else if(n[0].getId()>e.getId())n.unshift(e);else for(var r=n.length;r>0;r--)if(e.getId()>n[r-1].getId()){n.splice(r,0,e);break}var i=n.length;if(i>this._conf.MAX_DISTRIBUTED_SEGMENT_LIST_LENGTH){var o=n.slice(i-this._conf.MAX_DISTRIBUTED_SEGMENT_LIST_LENGTH);this._segmentListMap.set(t,o)}}},{key:"getSegmentListAfter",value:function(e){var t=this._getMatchingTrack(e),n=(0,p.unwrap)(this._segmentListMap.get(t)),r=n.filter(function(t){return t.getId()>e.getId()});return this._segmentListMap.set(t,r),r}},{key:"_getMatchingTrack",value:function(e){var t=!0,n=!1,r=void 0;try{for(var i,a=(0,s["default"])(this._segmentListMap);!(t=(i=a.next()).done);t=!0){var u=(0,o["default"])(i.value,1),c=u[0];if(e.isInTrack(c))return c}}catch(l){n=!0,r=l}finally{try{!t&&a["return"]&&a["return"]()}finally{if(n)throw r}}throw new Error("The segment "+e.viewToString()+" belongs to no track")}}]),e}());n["default"]=m,t.exports=n["default"]},{"../../defaultConf":1,"../utils/Options":88,"babel-runtime/core-js/get-iterator":105,"babel-runtime/core-js/map":108,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/slicedToArray":127}],16:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=e("../utils/Timers"),c=r(u),l=function(){function e(t){(0,o["default"])(this,e),this._exclusionArray=[],this._timers=new c["default"],this._retentionTime=t}return(0,s["default"])(e,[{key:"add",value:function(e){var t=this;this._exclusionArray.push(e),this._timers.setTimeout(function(){t._exclusionArray.splice(0,1)},this._retentionTime)}},{key:"getExclusionList",value:function(){return this._exclusionArray}},{key:"dispose",value:function(){this._timers.clearAll()}}]),e}();n["default"]=l,t.exports=n["default"]},{"../utils/Timers":92,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],17:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e){var t=e,n={},r=[],i=[],o=function(e,n){r.push({eventName:e,fn:n}),t.addEventListener(e,n)},a=function(e,t){i.push({eventName:e,fn:t}),window.addEventListener(e,t)},s=function(){for(var e=0;e<r.length;e++){var n=r[e].eventName,i=r[e].fn;t.removeEventListener(n,i)}r=[]},u=function(){for(var e=0;e<i.length;e++){var t=i[e].eventName,n=i[e].fn;window.removeEventListener(t,n)}i=[]},c=function(){s(),u()},l=function(e){function t(){n[e].arguments=arguments}return n[e]={arguments:void 0,handler:t},t},f=function(e){t.addEventListener(e,l(e))},d=function(e,r){if(!n[e])throw new Error("You are trying to trigger an event that have not been cached before");t.removeEventListener(e,n[e].handler),n[e].arguments&&r.apply(void 0,n[e].arguments)};this.addMediaEventListener=o,this.addWindowEventListener=a,this.removeAllExternalEventListener=c,this.cacheMediaEvent=f,this.triggerCachedEvent=d};n["default"]=r,t.exports=n["default"]},{}],18:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("../utils/Timers"),o=r(i),a=function(){var e=.3,t=0,n=4e3,r=0,i=0,a=0,s=.5,u=0,c=new o["default"],l=function(){r++},f=function(){i++},d=function(){a++},h=function(){var e,n=i/r;return e=isNaN(n)?t:Math.min(n,1),u=e,e},p=function(){var t;return 0!==r&&(t=(1-e)*s+e*h(),s=t),s},_=function(){r=0,i=0,a=0},m=function(){p(),_()},v=function(){c.setInterval(m,n)},g=function(){c.clearAll()};this.incrementNbChunkRequested=function(){return l()},this.incrementNbChunkDownloaded=function(){return f()},this.incrementNbChunkTimeOut=function(){return d()},this.heurisInst=function(){return h()},this.mean=function(){return p()},this.getNbChunkRequested=function(){return r},this.getHeuristicScore=function(){return s},this.getLastHeuristInst=function(){return u},this.dispose=function(){g()},v()};n["default"]=a,t.exports=n["default"]},{"../utils/Timers":92}],19:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n,r){this.city=e,this.country=t,this.latitude=n,this.longitude=r};n["default"]=r,t.exports=n["default"]},{}],20:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/map"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("../../defaultConf"),f=(r(l),e("../utils/Options")),d=function(){function e(t,n){(0,s["default"])(this,e),this._mediaMap=t,this._conf=n.conf,this._cachedSegmentList=new o["default"],this._cachedSegmentTime=new o["default"]}return(0,c["default"])(e,[{key:"getSegmentList",value:function(e,t,n){var r=this._cachedSegmentList.get(e.viewToString());if(r&&r.beginTime===t&&r.duration===n)return r.cachedSegmentList;var i=this._mediaMap.getSegmentList(e,t,n);return this._cachedSegmentList.set(e.viewToString(),{beginTime:t,cachedSegmentList:i,duration:n}),i}},{key:"getSegmentTime",value:function(e){var t=this._cachedSegmentTime.get(e.viewToString());if(void 0!==t)return t;var n=this._mediaMap.getSegmentTime(e);if(this._cachedSegmentTime.set(e.viewToString(),n),this._cachedSegmentTime.size>this._conf.GETSEGMENTTIME_CACHE_MAX_SIZE){var r=this._cachedSegmentTime.keys(),i=r.next().value,o=(0,f.unwrap)(i);this._cachedSegmentTime["delete"](o)}return n}}]),e}();n["default"]=d,t.exports=n["default"]},{"../../defaultConf":1,"../utils/Options":88,"babel-runtime/core-js/map":108,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],21:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(){(0,o["default"])(this,e)}return(0,s["default"])(e,[{key:"updateCurrentTracks",value:function(e){var t=e.video;t&&(this._currentVideoTrack=t)}},{key:"getVideoTrackHash",value:function(){return this._currentVideoTrack?this._currentVideoTrack.viewToString():"defaultTrackHash"}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],22:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/slicedToArray"),o=r(i),a=e("babel-runtime/helpers/toConsumableArray"),s=r(a),u=e("babel-runtime/core-js/get-iterator"),c=r(u),l=e("babel-runtime/core-js/map"),f=r(l),d=e("./structures/SegmentHandler"),h=r(d),p=e("../utils/Timers"),_=r(p),m=e("./binaryAbstraction/Segment"),v=r(m),g=function(e,t,n,r){function i(e){var t=E.get(e.viewToString());return!!t&&t}function a(e){var t=!0,n=!1,r=void 0;try{for(var i,o=(0,c["default"])(E.values());!(t=(i=o.next()).done);t=!0){var a=i.value;a.seeders.removeSeeder(e)}}catch(s){n=!0,r=s}finally{try{!t&&o["return"]&&o["return"]()}finally{if(n)throw r}}}function u(e){var t=i(e);return t===!1&&(t=new h["default"](e,this,j,T,r),E.set(t.segmentCoord.viewToString(),t),j.requestHasSegment(e),l()),t}function l(){var e,t=0,n=S()?k.LIVE.P2P_CACHE_MAX_SIZE:k.P2P_CACHE_MAX_SIZE,r=0,i=!0,o=!1,a=void 0;try{for(var s,u=(0,c["default"])(E.values());!(i=(s=u.next()).done);i=!0){var l=s.value;if(l.chunkManager.size&&(t+=l.chunkManager.size),t>n){e=E.size-r;break}r++}}catch(f){o=!0,a=f}finally{try{!i&&u["return"]&&u["return"]()}finally{if(o)throw a}}if(e){var d=E.keys(),h=!0,p=!1,_=void 0;try{for(var m,v=(0,c["default"])(d);!(h=(m=v.next()).done);h=!0){var g=m.value;if(0===e)break;var y=E.get(g);E["delete"](g),T.removeSegmentInfo(y.segmentCoord),e--}}catch(f){p=!0,_=f}finally{try{!h&&v["return"]&&v["return"]()}finally{if(p)throw _}}}}function d(e){E["delete"](e.viewToString())}function p(){var e=0,t=0,n=!0,r=!1,i=void 0;try{for(var o,a=(0,c["default"])(E.values());!(n=(o=a.next()).done);n=!0){var s=o.value,u=s.chunkManager.getP2PDownload_CDNDownload();e+=u.p2pDownloaded,t+=u.cdnDownloaded}}catch(l){r=!0,i=l}finally{try{!n&&a["return"]&&a["return"]()}finally{if(r)throw i}}return{p2pDownloaded:e,cdnDownloaded:t}}function m(e,t){var n=u(e),r=n.chunkManager,i=new v["default"](t);r.storeSegment(i),j.broadcastSegmentInfo(e)}function g(e){var t=i(e).chunkManager;return!!t&&t.getPartialSegment()}function y(e){return[].concat((0,s["default"])(E)).filter(function(t){var n=(0,o["default"])(t,2),r=(n[0],n[1]);return r.segmentCoord.isInTrack(e)&&!r.chunkManager.shouldDownloadSegment()}).map(function(e){var t=(0,o["default"])(e,2),n=(t[0],t[1]);return n.segmentCoord})}function b(){return[].concat((0,s["default"])(E)).map(function(e){var t=(0,o["default"])(e,2),n=(t[0],t[1]);return{segmentcoord:n.segmentCoord,downloadStatusList:n.chunkManager.downloadStatus,seederCount:n.seeders.getLength()}})}function w(e){return[].concat((0,s["default"])(E)).filter(function(t){var n=(0,o["default"])(t,2),r=(n[0],n[1]);return r.segmentCoord.isInTrack(e)&&r.chunkManager.isSegmentDownloaded()}).map(function(e){var t=(0,o["default"])(e,2),n=(t[0],t[1]);return n.segmentCoord})}function C(){A.clearAll(),E=new f["default"]}var k=r.conf,E=new f["default"],S=e,T=n,j=t,A=new _["default"];p(),A.setInterval(p,1e4),this.dispose=C,this.getOrCreateSegmentHandler=u,this.removeSegmentHandler=d,this.doubleCheckP2PDownload_CDNDownload=p,this.fillSegment=m,this.getSegmentHandler=i,this.getPartialSegment=g,this.removePeer=a,this.listSegmentsToSkipForTrack=y,this.listSegmentsDownloadStatus=b,this.listDownloadedSegmentsForTrack=w};n["default"]=g,t.exports=n["default"]},{"../utils/Timers":92,"./binaryAbstraction/Segment":43,"./structures/SegmentHandler":73,"babel-runtime/core-js/get-iterator":105,"babel-runtime/core-js/map":108,"babel-runtime/helpers/slicedToArray":127,"babel-runtime/helpers/toConsumableArray":128}],23:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(t,n,r,i){(0,o["default"])(this,e),this._scheduler=t,this._p2pCache=n,this._segmentInfoMap=r,this._distributedSegmentList=i}return(0,s["default"])(e,[{key:"_onHasSegment",value:function(e,t,n){var r=n.pushed;if(this._segmentInfoMap.addSegmentInfo(t),r&&this._distributedSegmentList.insert(t.segmentCoord),this._scheduler.isSegmentRequested(t.segmentCoord)){var i=this._p2pCache.getOrCreateSegmentHandler(t.segmentCoord);i.chunkManager.addSegmentSize(t.size),i.seeders.insertSeeder(e)}}},{key:"_onPeerDestroyed",value:function(e){this._p2pCache.removePeer(e)}}],[{key:"listenEvents",value:function(t,n,r,i,o){var a=new e(n,r,i,o);t.getEE().on("hasSegment",a._onHasSegment.bind(a)).on("peerDestroyed",a._onPeerDestroyed.bind(a))}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],24:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(l),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("./PartialSegmentInterface"),_=r(p),m=function(e){function t(e){(0,s["default"])(this,t);var n=(0,f["default"])(this,(0,o["default"])(t).call(this));return n._segmentCoord=e,n}return(0,h["default"])(t,e),(0,c["default"])(t,[{key:"getUpdatedRange",value:function(e){return e}},{key:"getFullSegment",value:function(e,t){t(e,this._segmentCoord)}},{key:"isComplete",value:function(){return!1}},{key:"isLocked",value:function(){return!1}},{key:"p2pSpeed",get:function(){return 0}},{key:"p2pAmount",get:function(){return 0}}]),t}(_["default"]);n["default"]=m,t.exports=n["default"]},{"./PartialSegmentInterface":25,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],25:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u="Method not implemented",c=function(){function e(){(0,o["default"])(this,e)}return(0,s["default"])(e,[{key:"getUpdatedRange",value:function(e){throw new Error(u)}},{key:"getFullSegment",value:function(e,t,n){throw new Error(u)}},{key:"isComplete",value:function(){throw new Error(u)}},{key:"isLocked",value:function(){throw new Error(u)}},{key:"p2pSpeed",get:function(){throw new Error(u)}},{key:"p2pAmount",get:function(){throw new Error(u)}}]),e}();n["default"]=c,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],26:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(l),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("./PartialSegmentInterface"),_=r(p),m=e("../structures/SegmentInfo"),v=r(m),g=function(e){function t(e,n,r,i){function a(e,t){function i(i,o){e.response=i;var a=new v["default"](h,i.byteLength,o);r.addSegmentInfo(a),n.fillSegment(h,e.response),c.emit("piece_downloaded_prtl",h),t(e,h)}l.callHashWorker(e.response,i)}(0,s["default"])(this,t);var u=i.status,c=i.eventBus,l=i.workerHelper,d=(0,f["default"])(this,(0,o["default"])(t).call(this)),h=e;return d.getFullSegment=function(e,t){c.emit("CDNSegmentDownloaded",h);var n=e.response;u.increaseCDNDownloadedBy(n.byteLength),a(e,t)},d}return(0,h["default"])(t,e),(0,c["default"])(t,[{key:"isComplete",value:function(){return!1}},{key:"isLocked",value:function(){return!1}},{key:"getUpdatedRange",value:function(e){return e}},{key:"p2pSpeed",get:function(){return 0}},{key:"p2pAmount",get:function(){return 0}}]),t}(_["default"]);n["default"]=g,t.exports=n["default"]},{"../structures/SegmentInfo":74,"./PartialSegmentInterface":25,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],27:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/define-properties"),o=r(i),a=e("babel-runtime/core-js/object/get-prototype-of"),s=r(a),u=e("babel-runtime/helpers/classCallCheck"),c=r(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(l),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("../../errors/ErrorFunnel"),_=r(p),m=e("./PartialSegmentInterface"),v=r(m),g=function(e){function t(e,n,r,i,a,u,l,d,h){function p(e,t,r,i){function o(o,a){t.hash===a?(P.setNbRightHashDLM(P.getNbRightHashDLM()+1),e.response=o,m(e),r(e,O)):(P.setNbWrongHashDLM(P.getNbWrongHashDLM()+1),P.increaseCdnDataDiscardedBy(L),n.removeSegmentHandler(O),P.correctP2PDownloaded(S,"HD"),i(e,O))}M.callHashWorker(e.response,o)}function m(e){A=e.response,n.fillSegment(O,e.response),R.emit("piece_downloaded_prtl",O),u.unlockSegmentData(),u.removePartialSegment()}function v(){S=0;for(var e=0;e<I.length;e++)"downloaded"===I[e]&&(S+=e<I.length-1?D.CHUNK_SIZE:a-(I.length-1)*D.CHUNK_SIZE)}function g(){for(var e=0;e<I.length;e++)if("downloaded"!==I[e]&&"CDNdownloaded"!==I[e])return e}function y(){for(var e=I.length-1;e>=0;e--)if("downloaded"!==I[e]&&"CDNdownloaded"!==I[e])return e+1}function b(e){if(!D.RANGE_REQUEST_ALLOWED)return e;var t,n,r=g(),i=y();return void 0!==r&&void 0!==i?(t=e?e.start+r*D.CHUNK_SIZE:r*D.CHUNK_SIZE,i===I.length&&e?n=e.end:i<I.length&&(n=e?e.start+i*D.CHUNK_SIZE-1:i*D.CHUNK_SIZE-1),E={start:r,end:i},{start:t,end:n}):e?e:void 0}function w(){A=r,I=i.slice(),v(),T=P.getMeanInstantSpeed(),j=l}function C(e){if(void 0===E)throw new Error("assertion: _cdnIndexRange is not defined");if(void 0===A)throw new Error("assertion: _segmentData is not defined");try{A.setBinaryData(e,E.start*D.CHUNK_SIZE)}catch(t){throw _["default"].notifyError(t),new Error("Invalid configuration: The current stream has no range request enabled and the p2p configuration has range request set to true.")}return A}function k(e){P.increaseCDNDownloadedBy(e.byteLength)}(0,c["default"])(this,t);var E,S,T,j,A,I,D=h.conf,P=h.status,R=h.eventBus,M=h.workerHelper,x=(0,f["default"])(this,(0,s["default"])(t).call(this)),O=e,N=d,L=0;return x.getFullSegment=function(e,t,n){if(this.isComplete())A.getBinaryData(0,A.byteLength,function(n){e.response=n,u.removePartialSegment(),t(e,null)});else{R.emit("CDNSegmentDownloaded",O);var r=e.response;k(r),L=r.byteLength,C(r).getBinaryData(0,A.byteLength,function(r){if(e.response=r,0!==S){u.lockSegmentData();var i=N.getSegmentInfo(O);p(e,i,t,n)}else m(e),t(e,O)})}},x.getUpdatedRange=b,x.getCDNIndexRange=function(){return E},x.isComplete=function(){return j},x.isLocked=function(){return u.dataLocked},w(),(0,o["default"])(x,{p2pSpeed:{get:function(){return T},set:void 0},p2pAmount:{get:function(){return S},set:void 0}}),x}return(0,h["default"])(t,e),t}(v["default"]);n["default"]=g,t.exports=n["default"]},{"../../errors/ErrorFunnel":8,"./PartialSegmentInterface":25,"babel-runtime/core-js/object/define-properties":111,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],28:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./Heuristic"),o=r(i),a=e("../utils/Timers"),s=r(a),u=e("../utils/Cartography"),c=r(u),l=e("../metrics/MovingAverage"),f=r(l),d=e("./structures/SegmentInfo"),h=r(d),p=function(e,t,n,r,i){var a,u,l,d,p,_=i.conf,m=i.status,v=i.analyticsData,g=0,y=0,b=0,w=0,C=Date.now(),k=0,E=0,S=Date.now(),T=t,j=e,A=!1,I=v,D=0,P=0,R=new o["default"],M=this,x=new s["default"],O=0,N=new f["default"](_.PEER_INSTANT_SPEED_CALCULATION_WINDOW),L=function(){return c["default"].getDistanceFromLatitudeLongitude(l,m.getMyLocation().latitude,d,m.getMyLocation().longitude)},U=function(){var e=Date.now(),t=e-C;D=b/1024/(t/1e3),P=w/1024/(t/1e3),b=0,w=0,C=e},B=function(){N.addPoint(g-O),O=g},F=function(){return N.compute()/(_.PEER_INSTANT_SPEED_CALCULATION_INTERVAL/1e3)},H=function(){var e=Date.now(),n=(e-S)/1e3,r=g+y-(k+E);r<_.MIN_USEFUL_SPEED*n&&(t.emit("remove_peer",M,!1),Y()),k=g,E=y,S=e},q=function ee(){m.getMyLocation().city?r.sendMessage("info",{bufferLevel:m.getBufferLevel(),city:m.getMyLocation().city,country:m.getMyLocation().country,latitude:m.getMyLocation().latitude,longitude:m.getMyLocation().longitude}):m.getEE().once("location_updated",ee)},G=function(e){r.sendMessage("requestHasSegment",e)},V=function(e,t){var n=t.pushed;r.sendMessage("hasSegment",{segmentInfo:e,pushed:n})},z=function(e,t){r.sendMessage("requestChunk",{segmentCoord:e,id_chunk:t}),R.incrementNbChunkRequested()},K=function(){return R.getNbChunkRequested()<_.MAX_CHUNK_BY_SEEDER},Y=function(){x.clearAll(),R.dispose(),r.close()},W=function(){x.clearAll(),R.dispose(),r.destroy()},X=function(){x.setInterval(U,1e3),x.setInterval(H,_.CHECK_USELESS_INTERVAL),x.setInterval(B,_.PEER_INSTANT_SPEED_CALCULATION_INTERVAL),q(),m.incrementNewPeerConnectionCount(),r.once("disconnected",function(){I.disconnected++,t.emit("remove_peer",M,!1),W()}),r.on("binarydata_received",J),r.on("message_received",Z)},Z=function(e,t){switch(e){case"info":a=t.city,u=t.country,l=t.latitude,d=t.longitude,p=t.bufferLevel,I.active++;break;case"requestHasSegment":T.emit("segmentRequested",M,new n(t));break;case"hasSegment":var r=new n(t.segmentInfo.segmentCoord),i=new h["default"](r,t.segmentInfo.size,t.segmentInfo.hash),o=!!t.pushed;T.emit("hasSegment",M,i,{pushed:o});break;case"requestChunk":T.emit("chunkRequested",M,new n(t.segmentCoord),t.id_chunk);break;default:throw new Error("wrong message sent by peerConnection")}},J=function(e,n,r){b+=e.byteLength,g+=e.byteLength,m.increaseP2PDownloadedUncorrectedBy(e.byteLength),m.setP2PDownloaded(m.getP2PDownloaded()+e.byteLength),t.emit("chunkReceived",M,r,n,e),$()},Q=function(e,t,n){var i=n.byteLength,o=r.sendBinaryData(n,t,e);return!!o&&(w+=i,y+=i,m.increaseP2PUploadedBy(i),void $())},$=function(){A||(I.transfer++,A=!0)};M.getRtt=r.getRtt.bind(r),M.getDistance=L,M.requestHasSegment=G,M.answerHasSegment=V,M.requestChunk=z,M.sendChunk=Q,M.canBeAskedChunk=K,M.close=Y,M.getDataDownloaded=function(){return g},M.getDataUploaded=function(){return y},M.getBufferLevel=function(){return p},M.getId=function(){return j},M.getDlSpeed=function(){return D},M.getUpSpeed=function(){return P},M.getBufferedAmount=r.getBufferedAmount.bind(r),M.getHeuristic=function(){return R},M.getDebugInfos=function(){return{country:u,city:a,bufferLevel:p,dlSpeed:D,upSpeed:P,dataDownloaded:g,dataUploaded:y,rtt:r.getRtt(),distance:L()}},this.getMeanInstantSpeed=F,X()};n["default"]=p,t.exports=n["default"]},{"../metrics/MovingAverage":9,"../utils/Cartography":82,"../utils/Timers":92,"./Heuristic":18,"./structures/SegmentInfo":74}],29:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/get-iterator"),o=r(i),a=e("underscore"),s=r(a),u=e("eventemitter3"),c=r(u),l=e("../utils/Timers"),f=r(l),d=e("./Peer"),h=r(d),p=e("./communication/PeerConnector"),_=r(p),m=e("./ExclusionCollection"),v=r(m),g=function(e,t,n,r){var i,a,u=r.conf,l=r.status,d=r.analyticsData,p=e,m=n,g=!1,y=[],b=this,w=new c["default"],C=new v["default"](u.OFFER_DECLINED_TIMEOUT),k=new v["default"](u.PEER_REMOVED_TIMEOUT),E=new v["default"](u.PEER_CONNEXION_ATTEMPT_TIMEOUT),S=new f["default"],T=function(){S.setInterval(j,u.SPEED_MONITOR_INTERVAL),w.on("remove_peer",R),S.setInterval(I,u.MEAN_SPEED_CALCULATION_INTERVAL),p.getEE().on("tracker_ready",D,b),p.getEE().on("tracker_disconnected",P,b)},j=function(){var e=0,t=0;s["default"].forEach(y,function(n){e+=n.getDlSpeed(),t+=n.getUpSpeed()}),l.setDlSpeed(e),l.setUpSpeed(t),l.computeMaxAndAvgSpeed()},A=function(){var e=0;s["default"].forEach(y,function(t){e+=t.getMeanInstantSpeed()});var t=Math.max(0,l.getp2pDownloadedNewAnalytics()),n=l.getP2PDownloadedUncorrected();return n&&(e*=t/n),e},I=function(){var e=A();l.setMeanInstantSpeed(e)},D=function(){void 0!==a&&a.dispose(),a=new _["default"](l.getMyPeerId(),this,t,r),i||(i=S.setInterval(M,u.ASK_PEERS_INTERVAL)),g||M(),g=!0},P=function(){i&&(S.clearInterval(i),i=void 0)},R=function(e){k.add(e.getId()),d.dropped++,w.emit("peerDestroyed",e),y=s["default"].without(y,e)},M=function(){if(y.length<u.MIN_NUMBER_OF_PEERS){var e=x();l.onPeerUpdateRequest();var t=Date.now();p.askPeers(e,function(e,n){if(null===e){var r=Date.now()-t;l.onPeerUpdateResponse(r);var i=0;n.forEach(function(e){e.peers.forEach(function(e){y.length+i<u.MIN_NUMBER_OF_PEERS&&(a.createPeerConnection(e),i++,d.match++)})})}})}},x=function(){var e,t=[];for(e=0;e<y.length;e++)t.push(y[e].getId());return t=t.concat(k.getExclusionList(),C.getExclusionList(),E.getExclusionList())},O=function(){return y.length>=u.MAX_NUMBER_OF_PEERS},N=function(e){y.forEach(function(t){t.requestHasSegment(e)})},L=function(){y.forEach(function(e){e.close(),w.emit("peerDestroyed",e)}),y=[]},U=function(e,n){if(O())n.destroy();else{var i=new h["default"](e,w,t,n,r);y.push(i),d.open++}},B=function(e){C.add(e),d.denied++},F=function(e){E.add(e),d.timeout++},H=function(e){var t=m.getSegmentInfo(e),n=!0,r=!1,i=void 0;try{for(var a,s=(0,o["default"])(y);!(n=(a=s.next()).done);n=!0){var u=a.value;u.answerHasSegment(t,{pushed:!0})}}catch(c){r=!0,i=c}finally{try{!n&&s["return"]&&s["return"]()}finally{if(r)throw i}}},q=function(){p.dispose(),S.clearAll(),L(),C.dispose(),k.dispose(),E.dispose()};b.getPeerArray=function(){return y},b.getPendingConnectionDebugInfos=function(){return a?a.getPendingConnectionDebugInfos():[]},b.requestHasSegment=N,b.getEE=function(){return w},b.isFull=O,b.addPeerConnection=U,this.offerDeclined=B,this.connectionAttemptTimeout=F,b.broadcastSegmentInfo=H,b.dispose=q,T()};n["default"]=g,t.exports=n["default"]},{"../utils/Timers":92,"./ExclusionCollection":16,"./Peer":28,"./communication/PeerConnector":51,"babel-runtime/core-js/get-iterator":105,eventemitter3:257,underscore:304}],30:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=function s(e,t){(0,o["default"])(this,s),this.cdn=t.getCDNDownloaded(),this.p2p=t.getP2PDownloaded(),this.upload=t.getP2PUploaded(),e?this.peers=e.getPeerArray().length:this.peers=0};n["default"]=a,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123}],31:[function(e,t,n){(function(r){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=window.RTCPeerConnection||window.webkitPeerConnection00||window.webkitRTCPeerConnection;return!(!e||ie.isMobile())}Object.defineProperty(n,"__esModule",{value:!0});var a=e("./structures/CurrentTracks"),s=e("./P2PDownloader"),u=i(s),c=e("./ChunkDownloader"),l=i(c),f=e("./ExternalEventManager"),d=i(f),h=e("./PartialSegment/PartialSegmentNoP2P"),p=i(h),_=e("./PartialSegment/PartialSegmentDisableP2P"),m=i(_),v=e("./display/DisplayInterface"),g=i(v),y=e("./TrackerManagerABTest"),b=i(y),w=e("../analytics/AnalyticsReporter"),C=i(w),k=e("./PeerPool"),E=i(k),S=e("./P2PCache"),T=i(S),j=e("./SegmentUploader"),A=i(j),I=e("./ChunkUploader"),D=i(I),P=e("./ChunkReceivedObserver"),R=i(P),M=e("./schedulers/factory"),x=e("./SegmentInfoMap"),O=i(x),N=e("./DistributedSegmentList"),L=i(N),U=e("../utils/Timers"),B=i(U),F=e("./SRModuleInterface"),H=i(F),q=e("../../../graphs/private/BufferDisplay"),G=(i(q),
e("../../../graphs/private/chunkDisplay")),V=(i(G),e("./expectedInterfaces/SegmentCoordInterface")),z=i(V),K=e("./expectedInterfaces/MapInterface"),Y=i(K),W=e("./expectedInterfaces/TrackCoordInterface"),X=i(W),Z=e("../utils/Interface"),J=e("./SharedState"),Q=i(J),$=e("../utils/StreamTypes"),ee=e("./PublicStatsAPI"),te=i(ee),ne=e("../errors/ErrorFunnel"),re=i(ne),ie=e("../utils/uaHelper");re["default"].setScriptOrigin(window.document.currentScript&&window.document.currentScript.src?window.document.currentScript.src:null);var oe=function(e,t,n,r,i,s,c){if("string"!=typeof c||""===c||c.length>10)throw new Error("Unvalid argument in PeerAgent constructor: integration version must be a non-empty string of less than 10 characters");var f=new Q["default"](r,t,c);re["default"].setCustomer(f.conf.ID_CLIENT),re["default"].setMetadata({stream:f.moduleState.content}),(0,Z.checkInterface)(Y["default"],n),(0,Z.checkInterface)(z["default"],i.prototype),(0,$.assertStreamType)(s);var h,_,v,y,w,k,S,j,I,P,x,N,U,F,q=new B["default"],G=!1,V=s,K=function(e){var t=e.audio,n=e.video;t&&(0,Z.checkInterface)(X["default"],t),n&&(0,Z.checkInterface)(X["default"],n),f.status.incrementTrackSwitchCount(),F.updateCurrentTracks({audio:t,video:n}),f.moduleState.updateCurrentTracks({video:n})},W=function(){var e=new a.CurrentTracks;F=(0,M.createScheduler)(n,y,w,V,e,f)},J=function(){I&&(U.addMediaEventListener("onTrackChange",K),P=new O["default"],_=new b["default"](e,f),v=new E["default"](_,i,P,f),y=new T["default"](e.isLive.bind(e),v,P,f),k=new R["default"](y,v,f),S=new A["default"](v,P,y),j=new D["default"](y,v,f),w=new L["default"](n,f),W(),h=new l["default"](y,F,f),N=new C["default"](e,f),U.triggerCachedEvent("onTrackChange",K),u["default"].listenEvents(v,F,y,P,w),ee()),G=!0},ee=function se(){!e.areBuffersInitialized||e.areBuffersInitialized()?f.conf.DEBUG&&(x=new g["default"](v,e.isLive.bind(e),f)):q.setTimeout(se,300)},ne=function(){I=o()&&f.conf.ALLOW_P2P,I&&(U=new d["default"](e),U.cacheMediaEvent("onTrackChange"))},ie=function(e){if(!I)throw new Error("P2P is not activated, getP2PData can't be called");var t;return G?t=I?y.getPartialSegment(e)||new p["default"](e,y,P,f):new m["default"](e):(J(),t=new m["default"](e)),F.updateTrackEdge(e),t},oe=function(e,t,n){return null!==n&&(0,Z.checkInterface)(z["default"],n),H["default"].getSegment(this,e,t,n,f)},ae=function(){I&&(G&&(U.removeAllExternalEventListener(),N.dispose(),h.dispose(),y.dispose(),q.clearAll(),v.dispose(),x&&x.dispose()),f.dispose())};ne(),this.getSegment=oe,this.getP2PData=ie,this.dispose=ae,this.setMediaElement=function(){},Object.defineProperty(this,"stats",{get:function(){return new te["default"](v,f.status)}})};Object.defineProperty(oe,"StreamTypes",{get:function(){return $.StreamTypes}}),n["default"]=oe,r.Streamroot=r.Streamroot||{},r.Streamroot.uaHelper=ie,Object.defineProperty(r.Streamroot,"p2pAvailable",{get:function(){return o()}}),t.exports=n["default"]}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"../../../graphs/private/BufferDisplay":99,"../../../graphs/private/chunkDisplay":101,"../analytics/AnalyticsReporter":4,"../errors/ErrorFunnel":8,"../utils/Interface":86,"../utils/StreamTypes":89,"../utils/Timers":92,"../utils/uaHelper":97,"./ChunkDownloader":11,"./ChunkReceivedObserver":13,"./ChunkUploader":14,"./DistributedSegmentList":15,"./ExternalEventManager":17,"./P2PCache":22,"./P2PDownloader":23,"./PartialSegment/PartialSegmentDisableP2P":24,"./PartialSegment/PartialSegmentNoP2P":26,"./PeerPool":29,"./PublicStatsAPI":30,"./SRModuleInterface":32,"./SegmentInfoMap":34,"./SegmentUploader":35,"./SharedState":36,"./TrackerManagerABTest":40,"./display/DisplayInterface":56,"./expectedInterfaces/MapInterface":57,"./expectedInterfaces/SegmentCoordInterface":58,"./expectedInterfaces/TrackCoordInterface":59,"./schedulers/factory":67,"./structures/CurrentTracks":72}],32:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=e("babel-runtime/core-js/object/keys"),o=r(i),a=e("babel-runtime/core-js/object/assign"),s=r(a),u=e("babel-runtime/helpers/classCallCheck"),c=r(u),l=e("babel-runtime/helpers/createClass"),f=r(l),d=e("../errors/ErrorFunnel"),h=r(d),p=e("./httpRequestAbstraction/HttpRequest"),_=r(p),m=e("../utils/nativeCalls"),v=function(){},g=function(){function e(t,n,r,i,o){var a=r.onProgress,s=void 0===a?v:a,u=r.onError,l=void 0===u?v:u,f=r.onSuccess,d=void 0===f?v:f,h=this;(0,c["default"])(this,e),this._request=n,this._handlers={onProgress:s,onError:l,onSuccess:d},this._srModule=t,this._analyticsData=o.analyticsData,this._conf=o.conf,this._conf.RETURN_COPY_SEGMENT&&!function(){var e=h._handlers.onSuccess;h._handlers.onSuccess=function(t,n,r){h._analyticsData.p2p+=n.p2pDownloaded,h._analyticsData.cdn+=t.byteLength-n.p2pDownloaded;var i=t.slice(0);e(i,n,r)}}(),this._stats={cdnDownloaded:0,cdnDuration:0},this._segmentCoord=i}return(0,f["default"])(e,[{key:"getSegment",value:function(){try{null===this._segmentCoord?this._getFullSegmentFromCDN():(this._partialSegment=this._srModule.getP2PData(this._segmentCoord),this._setP2PStats(),this._handlers.onProgress(this._stats,this._request),this._partialSegment.isComplete()?this._getFullP2PSegment():this._getRemainingRangeFromCDN())}catch(e){h["default"].notifyError(e),(0,m.nativeError)(e),this._getFullSegmentFromCDN()}return{abort:this._abort.bind(this)}}},{key:"_abort",value:function(){this._httpRequest&&this._httpRequest.abort(),this._handlers.onSuccess=v}},{key:"_getFullP2PSegment",value:function(){var e=this;this._waitSegmentUnlocked(function(t){t?e._fillSegment(void 0):e._getFullSegmentFromCDN()})}},{key:"_getRemainingRangeFromCDN",value:function(){var e=this,t=this._getRangeFromRequest();this._fallbackRange=t,this._rangeToDownload=this._partialSegment.getUpdatedRange(t),this._downloadFromCDN(this._rangeToDownload,function(t,n){return t?void e._handlers.onError(t,e._request):void e._fillSegment(n)})}},{key:"_downloadFromCDN",value:function(e,t){this._httpRequest=new _["default"]("GET",this._request.url),this._httpRequest.validStatusCodeRange={start:200,end:206},this._setHttpRequestHandlers(t),this._setHttpRequestHeaders(e),this._httpRequest.setWithCredentials(!!this._request.withCredentials),this._httpRequest.send(),this._startDownloadCdn=new Date}},{key:"_setHttpRequestHandlers",value:function(e){var t=this;this._httpRequest.onresponse=function(n,r){return n?void e(n,null):(t._stats.cdnDownloaded=r.byteLength||0,t._stats.cdnDuration=new Date-t._startDownloadCdn,void e(null,r))},this._httpRequest.onprogress=function(e){t._stats.cdnDownloaded=e,t._stats.cdnDuration=new Date-t._startDownloadCdn,t._handlers.onProgress(t._stats,t._request)}}},{key:"_setHttpRequestHeaders",value:function(e){var t={},n=this._request.headers;if(n&&void 0!==n.length)throw new Error("Custom headers object should not have a `length` attribute (you might use the previous API format)");n&&((0,s["default"])(t,n),this._rangeToDownload&&delete t.Range),void 0===t.Range&&e&&(t.Range=this._rangeValue(e)),(0,o["default"])(t).length>0&&this._httpRequest.setHeaders(t)}},{key:"_rangeValue",value:function(e){var t=e.start,n=e.end||"";return"bytes="+t+"-"+n}},{key:"_fillSegment",value:function(e){var t=this,n=!1,r=function(e){return function(r,i){n||(n=!0,e.call(t,r,i))}};try{this._partialSegment.getFullSegment({response:e},r(this._onSuccessAsynchronous),r(this._getFullSegmentFromCDN))}catch(i){return h["default"].notifyError(i),(0,m.nativeError)(i),void this._getFullSegmentFromCDN()}setTimeout(function(){n||(n=!0,t._getFullSegmentFromCDN())},this._conf.TIMEOUT_GET_FULL_SEGMENT)}},{key:"_waitSegmentUnlocked",value:function(e){var t=this;if(!this._partialSegment.isLocked())return void e(!0);var n=0,r=setInterval(function(){return t._partialSegment=t._srModule.getP2PData(t._segmentCoord),t._partialSegment.isLocked()?(n+=t._conf.LOCKED_RETRY_INTERVAL,void(n>t._conf.LOCKED_RETRY_TIMEOUT&&(clearInterval(r),e(!1)))):(clearInterval(r),void e(!0))},this._conf.LOCKED_RETRY_INTERVAL)}},{key:"_getRangeFromRequest",value:function(){var e=this._request.headers;if(e&&void 0!==e.Range){var t=e.Range.split("="),n=t[1].split("-");return{start:parseInt(n[0],10),end:parseInt(n[1],10)}}}},{key:"_getFullSegmentFromCDN",value:function(){var e=this;this._stats={p2pDownloaded:0,p2pDuration:0},this._downloadFromCDN(this._fallbackRange,function(t,n){return t?void e._handlers.onError(t,e._request):void e._handlers.onSuccess(n,e._stats,e._request)})}},{key:"_setP2PStats",value:function(){this._stats.p2pDownloaded=this._partialSegment.p2pAmount,this._stats.p2pDuration=0===this._partialSegment.p2pSpeed?0:Math.round(this._partialSegment.p2pAmount/this._partialSegment.p2pSpeed*1e3)}},{key:"_onSuccessAsynchronous",value:function(e){var t=this;setTimeout(function(){t._handlers.onSuccess(e.response,t._stats,t._request)},0)}}]),e}();t.exports={getSegment:function(e,t,n,r,i){var o=new g(e,t,n,r,i);return o.getSegment()}}},{"../errors/ErrorFunnel":8,"../utils/nativeCalls":95,"./httpRequestAbstraction/HttpRequest":60,"babel-runtime/core-js/object/assign":109,"babel-runtime/core-js/object/keys":117,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],33:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("underscore"),o=r(i),a=function(){var e=[],t=0,n=function(t){for(var n=e.length,r=0;n>r;r++)if(e[r]===t){e.splice(r,1);break}n=e.length;for(var i=0;n>i;i++){var o=e[i].getHeuristic().getHeuristicScore(),a=t.getHeuristic().getHeuristicScore();if(a>=o)return void e.splice(i,0,t)}e.push(t)},r=function(t){e=o["default"].reject(e,function(e){return e===t})},i=function(){for(var t=0,n=0;n<e.length;n++)t+=e[n].getHeuristic().getHeuristicScore();return t},a=function(n){var r,o=Math.floor(Math.random()*e.length);switch(t){case 0:if(0!==e.length){r=e[o];for(var a=0;a<e.length;a++)if(e[a].getHeuristic().getNbChunkRequested()/e[a].getHeuristic().getHeuristicScore()<=e[e.length-1].getHeuristic().getNbChunkRequested()/e[e.length-1].getHeuristic().getHeuristicScore()&&e[a].canBeAskedChunk()){r=e[a];break}}break;case 1:if(0!==e.length){r=e[o];for(var s=0;s<e.length;s++)if(Math.random()<=e[s].getHeuristic().getHeuristicScore()&&e[s].canBeAskedChunk()){r=e[s];break}}break;case 2:if(0!==e.length){r=e[o];for(var u=0;u<e.length;u++)if(e[u].getHeuristic().getNbChunkRequested()<=Math.floor(e[u].getHeuristic().getHeuristicScore()/i()*n+1)&&e[u].canBeAskedChunk()){r=e[u];break}}break;case 3:if(0!==e.length){r=e[o];for(var c=0;c<e.length;c++)if(e[c].getHeuristic().getNbChunkRequested()/e[c].getHeuristic().getHeuristicScore()<=e[c+1].getHeuristic().getNbChunkRequested()/e[c+1].getHeuristic().getHeuristicScore()&&e[c].canBeAskedChunk()){r=e[c];break}}break;default:r=!1}return r},s=function(){e=[]};this.getNextSeeder=function(e){return a(e)},this.insertSeeder=function(e){n(e)},this.removeSeeder=function(e){r(e)},this.cleanAfterDownloaded=function(){s()},this.getLength=function(){return e.length}};n["default"]=a,t.exports=n["default"]},{underscore:304}],34:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/map"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=function(){function e(){(0,s["default"])(this,e),this._map=new o["default"]}return(0,c["default"])(e,[{key:"addSegmentInfo",value:function(e){var t=e.segmentCoord.viewToString();this._map.set(t,e)}},{key:"getSegmentInfo",value:function(e){var t=e.viewToString(),n=this._map.get(t);if(!n)throw new Error("segmentInfo not found in the map");return n}},{key:"removeSegmentInfo",value:function(e){var t=e.viewToString();this._map["delete"](t)}}]),e}();n["default"]=l,t.exports=n["default"]},{"babel-runtime/core-js/map":108,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],35:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e,t,n){function r(e,t){var n=a.getSegmentHandler(t).chunkManager;if(n){var r=n.getIndexLastChunkInARow();if(r>-1){var o=i.getSegmentInfo(t);return void e.answerHasSegment(o,{pushed:!1})}}}var i=t,o=e,a=n;o.getEE().on("segmentRequested",r)};n["default"]=r,t.exports=n["default"]},{}],36:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/json/stringify"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("./Status"),f=r(l),d=e("../../defaultConf"),h=r(d),p=e("./ModuleState"),_=r(p),m=e("eventemitter3"),v=r(m),g=e("../analytics/AnalyticsData"),y=r(g),b=e("../security/WorkerHelper"),w=r(b),C=e("../utils/confHelper"),k=r(C),E=e("../utils/ContentId"),S=function(){function e(t,n,r){(0,s["default"])(this,e),this.analyticsData=new y["default"];var i=JSON.parse((0,o["default"])(h["default"]));(0,k["default"])(i,t,r),this.conf=i,this.status=new f["default"];var a=(0,E.formatContentId)({contentId:t.contentId,contentUrl:n});this.moduleState=new _["default"],this.moduleState.content=a,this.eventBus=new v["default"],this.workerHelper=new w["default"]}return(0,c["default"])(e,[{key:"dispose",value:function(){this.workerHelper.dispose()}}]),e}();n["default"]=S,t.exports=n["default"]},{"../../defaultConf":1,"../analytics/AnalyticsData":3,"../security/WorkerHelper":76,"../utils/ContentId":84,"../utils/confHelper":94,"./ModuleState":21,"./Status":38,"babel-runtime/core-js/json/stringify":107,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,eventemitter3:257}],37:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=e("../../defaultConf"),c=(r(u),function(){function e(t){(0,o["default"])(this,e),this.transferedChunks=[],this._conf=t}return(0,s["default"])(e,[{key:"calculateSpeed",value:function(){var e=this._getIndexTransferOneSecondAgo();return null===e?this.transferedChunks=[]:e>0&&this.transferedChunks.splice(0,e),this.transferedChunks.length*this._conf.CHUNK_SIZE/1024}},{key:"_getIndexTransferOneSecondAgo",value:function(){for(var e=Date.now(),t=0;t<this.transferedChunks.length;t++)if(e-this.transferedChunks[t]<=1e3)return t;return null}},{key:"addChunkTransfer",value:function(){var e=Date.now();this.transferedChunks.push(e)}}]),e}());n["default"]=c,t.exports=n["default"]},{"../../defaultConf":1,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],38:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("eventemitter3"),o=r(i),a=function(){var e=!1,t={city:null,country:null,latitude:null,longitude:null},n=void 0,r=0,i=0,a=0,s=0,u=0,c=0,l=0,f=0,d=0,h=0,p=0,_=0,m=0,v=0,g=0,y=0,b=0,w=0,C=0,k=0,E=0,S=0,T=0,j=0,A=0,I=0,D=0,P="",R=0,M=0,x=0,O=0,N=0,L=0,U=0,B=[],F=!1,H="",q=-1,G=0,V=0,z=this,K=void 0,Y=void 0,W=new o["default"],X=void 0,Z=function(){var e,t,n,o;r&&(r>a&&(a=r),e=i?(i*K+r)/(K+1):r,t=K?K+1:1,K=t,i=e),s&&(s>c&&(c=s),n=u?(u*Y+s)/(Y+1):s,o=Y?Y+1:1,Y=o,u=n)},J=function(){q++},Q=function(){L++},$=function(){return L},ee=function(e){U++,B.push(e)},te=function(){return U},ne=function(){var e=0,t=0;if(B.length>0){for(var n=0;n<B.length;n++)e+=B[n];t=e/B.length}return B=[],t};z.getMyPeerId=function(){return n},z.setMyPeerId=function(e){n!==e&&(n=e)},z.getMyLocation=function(){return t},z.setMyLocation=function(e){t=e,W.emit("location_updated",e)},z.correctP2PDownloaded=function(e,t){isNaN(e)||("PP"===t?(y+=e,f-=e):"PC"===t?(b+=e,f-=e,f=d-e):"CP"===t?(w+=e,f-=e):"CC"===t?C+=e:"HP"===t?(k+=e,f-=e):"HD"===t?(E+=e,f-=e):"M"===t&&(S+=e,f-=e))},z.getDlSpeed=function(){return r},z.setDlSpeed=function(e){r=e},z.getAvgDlSpeed=function(){return i},z.getMaxDlSpeed=function(){return a},z.getUpSpeed=function(){return s},z.setUpSpeed=function(e){s=e},z.getAvgUpSpeed=function(){return u},z.getMaxUpSpeed=function(){return c},z.getP2PDownloaded=function(){return f},z.setP2PDownloaded=function(e){"number"!=typeof e||isNaN(e)||(f=e)},z.getp2pDownloadedNewAnalytics=function(){return d},z.setp2pDownloadedNewAnalytics=function(e){"number"!=typeof e||isNaN(e)||(d=e)},z.getP2PDownloadedUncorrected=function(){return h},z.increaseP2PDownloadedUncorrectedBy=function(e){h+=e},z.getP2PUploaded=function(){return p},z.increaseP2PUploadedBy=function(e){p+=e},z.getRawDataDownloaded=function(){return _},z.increaseRawDataDownloadedBy=function(e){_+=e},z.getRawDataUploaded=function(){return m},z.increaseRawDataUploadedBy=function(e){m+=e},z.getCDNDownloaded=function(){return v},z.increaseCDNDownloadedBy=function(e){v+=e},z.getCdnCancelled=function(){return g},z.increaseCdnCancelledBy=function(e){g+=e},z.getDataDownloadedTwice_PP=function(){return y},z.getDataDownloadedTwice_PC=function(){return b},z.getDataDownloadedTwice_CP=function(){return w},z.getDataDownloadedTwice_CC=function(){return C},z.getDataDownloadedTwice_HP=function(){return k},z.getDataDownloadedTwice_HD=function(){return E},z.getDataDownloadedTwice_M=function(){return S},z.getCdnDataDiscarded=function(){return T},z.increaseCdnDataDiscardedBy=function(e){T+=e},z.getNbRightHashP2P=function(){return j},z.setNbRightHashP2P=function(e){j=e},z.getNbWrongHashP2P=function(){return A},z.setNbWrongHashP2P=function(e){A=e},z.getNbRightHashDLM=function(){return I},z.setNbRightHashDLM=function(e){I=e},z.getNbWrongHashDLM=function(){return D},z.setNbWrongHashDLM=function(e){D=e},z.getTrackerConnectionCount=function(){return R},z.incrementTrackerConnectionCount=function(){R++},z.getTrackerReconnectionCount=function(){return x},z.incrementTrackerReconnectionCount=function(){x++},z.getTrackerDeconnectionCount=function(){return M},z.incrementTrackerDeconnectionCount=function(){M++},z.incrementNewPeerConnectionCount=function(){V++},z.getNewPeerConnectionCount=function(){return V},z.getConnected=function(){return e},z.getUpgraded=function(){return F},z.setTrackerConnectionTime=function(e){O=e},z.getTrackerConnectionTime=function(){return O},z.setTrackerVersion=function(e){P=e},z.getTrackerVersion=function(){return P},z.setTrackerId=function(e){H=e},z.getTrackerId=function(){return H},z.incrementMissedIceCandidateCount=function(){G++},z.getMissedIceCandidateCount=function(){return G},z.setConnected=function(t){t!==e&&(e=t,W.emit("change:connected"),t===!0&&W.emit("tracker_ready"))},z.setUpgraded=function(){F=!0},z.getEE=function(){return W},z.setConnectedToSignalingServer=function(){N=!0},z.setDisconnectedToSignalingServer=function(){N=!1},z.getConnectedToSignalingServer=function(){return N},z.computeMaxAndAvgSpeed=Z,z.setMeanInstantSpeed=function(e){l=e},z.getMeanInstantSpeed=function(){return l},z.setBufferLevel=function(e){X=e},z.getBufferLevel=function(){return X},z.incrementTrackSwitchCount=J,z.getTrackSwitchCount=function(){return q},z.onPeerUpdateRequest=Q,z.getPeerUpdateRequestCount=$,z.onPeerUpdateResponse=ee,z.getPeerUpdateResponseCount=te,z.getPeerUpdateAvgResponseTime=ne};n["default"]=a,t.exports=n["default"]},{eventemitter3:257}],39:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./socketIOAbstraction/SocketIO"),o=r(i),a=e("eventemitter3"),s=r(a),u=e("./Location"),c=r(u),l=e("../utils/Timers"),f=r(l),d=function(e,t){this._conf=t.conf,this._status=t.status,this._moduleState=t.moduleState;var n=new s["default"];this.p2pProtocolVersion="2.0.0",this.client2ClientProtocolVersion=this._conf.P2P_PROTOCOL_VERSION,this._playerInterface=e,this.trackerURL=this._conf.TRACKER_URL,this.connect(),this._timers=new f["default"],this.instantiatedTime=Date.now(),this.getEE=function(){return n}};d.prototype.connect=function(){this.socket||(this.socket=new o["default"](this.trackerURL,"tracker"),this.socket.onconnect=this.onTrackerConnected.bind(this),this.socket.onreconnecting=this.onTrackerReconnecting.bind(this),this.socket.ondisconnect=this.onTrackerDisconnected.bind(this),this.socket.onreconnect=this.onTrackerReconnect.bind(this),this.socket.ongetcurrenttracks=this.onGetCurrentTracks.bind(this),this.socket.connect({protocol_version:this._conf.CLIENT_TRACKER_PROTOCOL_VERSION,client_id:this._conf.ID_CLIENT}))},d.prototype.sockEmit=function(e,t,n){(this._status.getConnected()||"init"===e)&&this.socket.emit(e,t,n)},d.prototype.onTrackerConnected=function(){var e={manifest_url:this._moduleState.content,p2p_protocol:this.client2ClientProtocolVersion,client_id:this._conf.ID_CLIENT};this._playerInterface.isLive()&&(e.buffer_level_max=this._playerInterface.getBufferLevelMax()),this.sockEmit("init",e,this.onTrackerReady.bind(this)),this._status.incrementTrackerConnectionCount(),this._timers.setTimeout(this._inspectUsedTransport.bind(this),15e3)},d.prototype._inspectUsedTransport=function(){"websocket"===this.socket.transportName&&this._status.setUpgraded()},d.prototype.onTrackerReady=function(e,t){if(!e){var n=Date.now()-this.instantiatedTime;this._status.setTrackerConnectionTime(n),this._status.setConnected(!0),this._playerInterface.isLive()&&(this._status.setBufferLevel(t.buffer_level),this._playerInterface.setBufferMarginLive(t.buffer_level)),this._status.setMyPeerId(t.peer_id),this.askGeolocation(this._conf.GEOLOCATION_REQUEST_MAX_RETRY),this.getEE().emit("tracker_ready")}},d.prototype.askGeolocation=function(e){var t=this;this._timers.setTimeout(function(){t.sockEmit("geolocation",void 0,t.makeGeolocationAnswerHandler(e))},this._conf.GEOLOCATION_REQUEST_TIMEOUT)},d.prototype.makeGeolocationAnswerHandler=function(e){var t=this;return function(n,r){if(n)0!==e&&t.askGeolocation(e-1);else{var i=new c["default"](r.city,r.country,r.latitude,r.longitude);t._status.setMyLocation(i)}}},d.prototype.onTrackerReconnecting=function(){this._status.setConnected(!1)},d.prototype.onTrackerDisconnected=function(){!this.socketClosed,this._status.setConnected(!1),this._status.incrementTrackerDeconnectionCount(),this.getEE().emit("tracker_disconnected")},d.prototype.onTrackerReconnect=function(){this._status.incrementTrackerReconnectionCount()},d.prototype.onGetCurrentTracks=function(e){var t={tracks:[{track_hash:this._moduleState.getVideoTrackHash()}]};this._playerInterface.isLive()||(t.time_position=this._moduleState.videoCurrentTime),e(null,t)},d.prototype.askPeers=function(e,t){var n={tracks:[{track_hash:this._moduleState.getVideoTrackHash()}],exclusions:e,peer_number:this._conf.MAX_NUMBER_OF_PEERS_ASKED_BY_GET_PEERS_MESSAGE};this._playerInterface.isLive()?n.buffer_level=this._status.getBufferLevel():n.time_position=this._moduleState.videoCurrentTime,this.sockEmit("get_peers",n,t)},d.prototype.dispose=function(){this.socketClosed=!0,this._timers.clearAll(),this.socket.close()},n["default"]=d,t.exports=n["default"]},{"../utils/Timers":92,"./Location":19,"./socketIOAbstraction/SocketIO":68,eventemitter3:257}],40:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){4===n.readyState&&t(200===n.status?JSON.parse(n.responseText):null)},n.open("GET",e,!0),n.send(null)}Object.defineProperty(n,"__esModule",{value:!0});var o=e("babel-runtime/helpers/classCallCheck"),a=r(o),s=e("babel-runtime/helpers/createClass"),u=r(s),c=e("./TrackerManager"),l=r(c),f=e("./TrackerManagerV3"),d=r(f),h=e("eventemitter3"),p=r(h),_=function(){function e(t,n){(0,a["default"])(this,e),this._sharedState=n,this._conf=n.conf,this._status=n.status,this._ee=new p["default"],this._selectImplementation(t)}return(0,u["default"])(e,[{key:"getEE",value:function(){return this._ee}},{key:"askPeers",value:function(e,t){this._implementation.askPeers(e,t)}},{key:"dispose",value:function(){this._implementation.dispose()}},{key:"_selectImplementation",value:function(e){var t=this;i(this._conf.ABTEST_DATA_URL,function(n){var r=0;null!==n&&void 0!==n[t._conf.ID_CLIENT]&&(r=n[t._conf.ID_CLIENT]),Math.random()<r?(t._implementation=new d["default"](e,t._sharedState),t._status.setTrackerVersion("http")):(t._implementation=new l["default"](e,t._sharedState),t._status.setTrackerVersion("sio")),t._rewireEvents()},0)}},{key:"_rewireEvents",value:function(){var e=this.getEE();this._implementation.getEE().on("tracker_ready",e.emit.bind(e,"tracker_ready")),this._implementation.getEE().on("tracker_disconnected",e.emit.bind(e,"tracker_disconnected"))}}]),e}();n["default"]=_,t.exports=n["default"]},{"./TrackerManager":39,"./TrackerManagerV3":41,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,eventemitter3:257}],41:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){var r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&(200===r.status?n(null,JSON.parse(r.responseText)):204===r.status?n(null,null):r.status>0&&n(new Error(r.status+": "+r.responseText),null))},r.onerror=function(){n(new Error("connection error"),null)},void 0!==t?(r.open("POST",e,!0),r.send((0,a["default"])(t))):(r.open("GET",e,!0),r.send(null))}Object.defineProperty(n,"__esModule",{value:!0});var o=e("babel-runtime/core-js/json/stringify"),a=r(o),s=e("babel-runtime/helpers/classCallCheck"),u=r(s),c=e("babel-runtime/helpers/createClass"),l=r(c),f=e("eventemitter3"),d=r(f),h=e("./Location"),p=r(h),_=e("../utils/Timers"),m=r(_),v=e("../utils/Options"),g=e("../utils/url"),y=e("../../defaultConf"),b=(r(y),function(){function e(t,n){(0,u["default"])(this,e),this._conf=n.conf,this._status=n.status,this._moduleState=n.moduleState;var r=new d["default"];this._p2pProtocolVersion=this._conf.P2P_PROTOCOL_VERSION,this._trackerProtocolVersion=this._conf.CLIENT_TRACKER_PROTOCOL_VERSION_V3,this._playerInterface=t,this._connected=!1,this._delayReconnection=this._conf.TRACKER_DELAY_INIT,this._trackerURL=(0,g.formatUrl)(this._conf.TRACKER_URL_V3),this._timers=new m["default"],this._callQueue=[],this._pending=!1,this.getEE=function(){return r},this._init()}return(0,l["default"])(e,[{key:"askPeers",value:function(e,t){var n=function(e,n){t(e,[n])},r={tracks:[this._moduleState.getVideoTrackHash()],exclusions:e,peer_number:this._conf.MAX_NUMBER_OF_PEERS_ASKED_BY_GET_PEERS_MESSAGE,current_position:this._moduleState.videoCurrentTime,id:(0,v.unwrap)(this._peerID)};this._sendRequest("peers",r,n,!0)}},{key:"dispose",value:function(){this._disconnect(),this._timers.clearAll()}},{key:"_init",value:function(){var e=(0,v.unwrap)(this._moduleState.content),t=this._p2pProtocolVersion,n=this._conf.ID_CLIENT,r=this._playerInterface.isLive(),i=this._status.getTrackerId(),o=void 0;if(r){var a=this._playerInterface.getBufferLevelMax();o={content:e,p2p_protocol:t,customer_id:n,is_live:r,buffer_level_max:a,tracker_id:i}}else o={content:e,p2p_protocol:t,customer_id:n,is_live:r,tracker_id:i};this._initStartTime=Date.now(),this._sendRequest("init",o,this._onTrackerReady.bind(this),!0)}},{key:"_onTrackerReady",value:function(e,t){if(!e){var n=Date.now()-this._initStartTime;if(this._status.incrementTrackerConnectionCount(),this._status.setTrackerConnectionTime(n),this._status.setConnected(!0),this._status.setTrackerId(t.tracker_id),this._connected=!0,this._playerInterface.isLive()){var r=(0,v.unwrap)(t.buffer_level);this._status.setBufferLevel(r),this._playerInterface.setBufferMarginLive(r)}this._peerID=t.peer_id,this._status.setMyPeerId(this._peerID),this._askGeolocation(this._conf.GEOLOCATION_REQUEST_MAX_RETRY),this._timers.setNamedInterval("tracks",this._publishTracks.bind(this),this._conf.SEND_TRACKS_INTERVAL),this.getEE().emit("tracker_ready")}}},{key:"_publishTracks",value:function(){var e={tracks:[this._moduleState.getVideoTrackHash()],id:(0,v.unwrap)(this._peerID),current_position:this._moduleState.videoCurrentTime};this._sendRequest("tracks",e,function(){},!0)}},{key:"_askGeolocation",value:function(e){var t=this;this._timers.setNamedTimeout("geoloc",function(){t._sendRequest("geo",void 0,t._makeGeolocationAnswerHandler(e),!1)},this._conf.GEOLOCATION_REQUEST_TIMEOUT)}},{key:"_makeGeolocationAnswerHandler",value:function(e){var t=this;return function(n,r){if(n)0!==e&&t._askGeolocation(e-1);else{var i=new p["default"](r.city,r.country,r.latitude,r.longitude);t._status.setMyLocation(i)}}}},{key:"_sendRequest",value:function(e,t,n,r){var o=this,a=function(e,t){if(e&&r)return o._disconnect(),o._schedulReconnect(),void n(e,t);var a=o._callQueue.shift();void 0===a?o._pending=!1:i(a.url,a.data,a.callback),n(e,t)},s=this._trackerURL+e;this._pending?this._callQueue.push({url:s,data:t,callback:a}):(this._pending=!0,i(s,t,a))}},{key:"_disconnect",value:function(){this._timers.clearNamedInterval("tracks"),this._timers.clearNamedTimeout("geoloc"),this._timers.clearNamedTimeout("reconnect"),this._pending=!1,this._callQueue=[],this._connected===!0&&(this._delayReconnection=this._conf.TRACKER_DELAY_INIT,this._status.setConnected(!1),this._connected=!1,i(this._trackerURL+"bye",{id:(0,v.unwrap)(this._peerID)},function(){}),this.getEE().emit("tracker_disconnected"))}},{key:"_schedulReconnect",value:function(){this._timers.setNamedTimeout("reconnect",this._init.bind(this),this._delayReconnection),this._delayReconnection=Math.min(2*this._delayReconnection,this._conf.TRACKER_DELAY_MAX)}}]),e}());n["default"]=b,t.exports=n["default"]},{"../../defaultConf":1,"../utils/Options":88,"../utils/Timers":92,"../utils/url":98,"./Location":19,"babel-runtime/core-js/json/stringify":107,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,eventemitter3:257}],42:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=e("underscore"),c=r(u),l=e("./SpeedCalculator"),f=r(l),d=e("../utils/Timers"),h=r(d),p=e("../utils/Delta"),_=e("../errors/ErrorFunnel"),m=r(_),v=function(){function e(t){(0,o["default"])(this,e),this._conf=t.conf,this._globalEventBus=t.eventBus,this.queue=[],this.peerTimeouts={},this.saturated=!1,this.uploadSpeedCalculator=new f["default"](this._conf),this.uploadLimitation=this._conf.MAX_UP_SPEED,this._timers=new h["default"]}return(0,s["default"])(e,[{key:"add",value:function(e,t,n,r,i){this.queue.push({peer:e,segmentCoord:t,id_chunk:n,chunk:r,timeStamp:i}),this.resetPeerTimeout(e),this.sendChunk()}},{key:"removeFirstChunk",value:function(){this.queue.splice(0,1)}},{key:"getChunkToSend",value:function(){for(var e=Date.now();this.queue.length>0;){if(e-this.queue[0].timeStamp<this._conf.CHUNK_UP_TIMEOUT)return this.queue[0];this.removeFirstChunk(),this._globalEventBus.emit("uploadSaturated")}}},{key:"sendChunk",value:function(e){var t=this.uploadSpeedCalculator.calculateSpeed();if(t<this.uploadLimitation&&(!this.saturated||e)){var n=this.getChunkToSend();if(!n)return void this.unsetSaturated();var r=n.peer.getBufferedAmount();if((0,p.isNumeric)(r)&&r<this._conf.UP_MAX_BUFFERED_AMOUNT){this.uploadSpeedCalculator.addChunkTransfer();try{return n.peer.sendChunk(n.segmentCoord,n.id_chunk,n.chunk),this.removeFirstChunk(),this.resetPeerTimeout(n.peer),this.unsetSaturated(),void(this.uploadLimitation+=5)}catch(i){m["default"].notifyError(i),this.uploadLimitation>this._conf.MAX_UP_SPEED&&(this.uploadLimitation=this._conf.MAX_UP_SPEED),this.uploadLimitation>400?this.uploadLimitation-=200:this.uploadLimitation>100?this.uploadLimitation-=50:this.uploadLimitation=Math.ceil(this.uploadLimitation/2),this.setSaturated()}this.checkPeerTimeout(n.peer)}else this.uploadLimitation>30&&(this.uploadLimitation-=20,this.setSaturated())}this.setSaturated()}},{key:"checkPeerTimeout",value:function(e){
var t=Date.now();this.peerTimeouts[e.getId()]?t-this.peerTimeouts[e.getId()]>this._conf.PEER_UP_TIMEOUT&&this.clearChunksForPeer(e.getId()):this.peerTimeouts[e.getId()]=t}},{key:"resetPeerTimeout",value:function(e){delete this.peerTimeouts[e.getId()]}},{key:"clearChunksForPeer",value:function(e){this.queue=c["default"].reject(this.queue,function(t){return t.peer.getId()===e})}},{key:"setSaturated",value:function(){if(!this.saturated){this.saturated=!0;var e=this._conf.CHUNK_SIZE/1024/(this._conf.MAX_UP_SPEED/1e3);void 0===this.sendInterval&&(this.sendInterval=this._timers.setInterval(function(){this.sendChunk(!0)}.bind(this),e))}}},{key:"unsetSaturated",value:function(){this.saturated===!0,this.saturated=!1,this.queue.length||(this._timers.clearInterval(this.sendInterval),this.sendInterval=void 0)}},{key:"dispose",value:function(){this._timers.clearAll()}}]),e}();n["default"]=v,t.exports=n["default"]},{"../errors/ErrorFunnel":8,"../utils/Delta":85,"../utils/Timers":92,"./SpeedCalculator":37,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,underscore:304}],43:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){return new a["default"](e)}Object.defineProperty(n,"__esModule",{value:!0});var o=e("./browser/Segment"),a=r(o),s=e("./mobile/Segment");r(s);n["default"]=i,t.exports=n["default"]},{"./browser/Segment":46,"./mobile/Segment":48}],44:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(){(0,o["default"])(this,e)}return(0,s["default"])(e,[{key:"getBinaryData",value:function(e,t,n){throw new Error("must be implemented")}},{key:"setBinaryData",value:function(e,t){throw new Error("must be implemented")}},{key:"destroy",value:function(){}},{key:"byteLength",get:function(){return this._byteLength},set:function(e){this._byteLength=e}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],45:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=ArrayBuffer,t.exports=n["default"]},{}],46:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(l),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("../SegmentInterface"),_=r(p),m=e("./BinaryData"),v=r(m),g=function(e){function t(e){(0,s["default"])(this,t);var n=(0,f["default"])(this,(0,o["default"])(t).call(this));if("number"==typeof e){var r=e;n._binData=new Uint8Array(r)}else{if(!(e instanceof v["default"]))throw new TypeError("Wrong parameter in Segment Constructor");var i=e;n._binData=new Uint8Array(i)}return n}return(0,h["default"])(t,e),(0,c["default"])(t,[{key:"getBinaryData",value:function(e,t,n){n(new Uint8Array(this._binData.buffer.slice(e,e+t)).buffer)}},{key:"setBinaryData",value:function(e,t){this._binData.set(new Uint8Array(e),t)}},{key:"byteLength",get:function(){return this._binData.byteLength},set:function(e){throw new TypeError("Should not manually set the byteLength")}}]),t}(_["default"]);n["default"]=g,t.exports=n["default"]},{"../SegmentInterface":44,"./BinaryData":45,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],47:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=function s(e,t){if((0,o["default"])(this,s),!(e instanceof String||"number"==typeof t))throw new TypeError("Wrong parameter");this.id=e,this.byteLength=t};n["default"]=a,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123}],48:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){return e+"-"+t}Object.defineProperty(n,"__esModule",{value:!0});var o=e("babel-runtime/core-js/object/get-prototype-of"),a=r(o),s=e("babel-runtime/helpers/classCallCheck"),u=r(s),c=e("babel-runtime/helpers/createClass"),l=r(c),f=e("babel-runtime/helpers/possibleConstructorReturn"),d=r(f),h=e("babel-runtime/helpers/inherits"),p=r(h),_=e("../SegmentInterface"),m=r(_),v=e("./BinaryData"),g=r(v),y=e("uuid"),b=r(y),w=e("../../../utils/nativeCalls"),C={},k=function(e){function t(e){(0,u["default"])(this,t);var n=(0,d["default"])(this,(0,a["default"])(t).call(this));if(n.id=n._generateId(),"number"==typeof e)n.byteLength=e,(0,w.nativeCall)("segment_created",{id:n.id,size:e});else{if(!(e instanceof g["default"]))throw new TypeError("Wrong parameter in Segment Constructor");n.byteLength=e.byteLength,(0,w.nativeCall)("segment_created",{id:n.id,binaryDataId:e.id})}return n.callbacks={},n}return(0,p["default"])(t,e),(0,l["default"])(t,[{key:"_generateId",value:function(){return b["default"].v4()}},{key:"getBinaryData",value:function(e,t,n){var r=i(e,t);C[r]=n;var o={segmentId:this.id,offset:e,size:t};(0,w.nativeCall)("get_binary_data",o)}},{key:"setBinaryData",value:function(e,t){if(!(e instanceof g["default"]||"number"==typeof t))throw new TypeError("Wrong parameter");var n={segmentId:this.id,offset:t,binaryDataId:e.id};(0,w.nativeCall)("set_binary_data",n)}},{key:"destroy",value:function(){var e={segmentId:this.id};(0,w.nativeCall)("destroy_segment",e)}}],[{key:"getBinaryDataCallback",value:function(e,t,n,r){var o=i(t,r),a=C[o],s=new g["default"](n,parseInt(r,10));a(s)}}]),t}(m["default"]);n["default"]=k,t.exports=n["default"]},{"../../../utils/nativeCalls":95,"../SegmentInterface":44,"./BinaryData":47,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126,uuid:306}],49:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(){(0,o["default"])(this,e)}return(0,s["default"])(e,[{key:"sendMessage",value:function(){throw new Error("One should not call sendMessage on a PeerConnection that has already been destroyed")}},{key:"sendBinaryData",value:function(){throw new Error("One should not call sendBinaryData on a PeerConnection that has already been destroyed")}},{key:"getRtt",value:function(){throw new Error("One should not call getRtt on a PeerConnection that has already been destroyed")}},{key:"getBufferedAmount",value:function(){throw new Error("One should not call getBufferedAmount on a PeerConnection that has already been destroyed")}},{key:"destroy",value:function(){throw new Error("One should not call destroy on a PeerConnection that has already been destroyed")}},{key:"close",value:function(){throw new Error("One should not call close on a PeerConnection that has already been destroyed")}},{key:"on",value:function(){throw new Error("One should not call on on a PeerConnection that has already been destroyed")}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],50:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n,r){function i(){t.onclose=function(){S.emit("disconnected")},t.onerror=function(e){S.emit("disconnected")},t.onmessage=b,w(),j.setInterval(f,k.PEER_COMPUTE_RTT_INTERVAL)}function o(e,n){if("open"===t.readyState){var r=(0,u["default"])({type:e,args:n});C.increaseRawDataUploadedBy(r.length),t.send(r)}else S.emit("disconnected")}function s(e,n,r){var i=(0,_.encodeMetaData)(r,n,e);return"open"===t.readyState?(t.send(i),!0):(S.emit("disconnected"),!1)}function c(){return T}function f(){var t;e&&(navigator.mozGetUserMedia?e.getStats(null,function(e){for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];if(void 0!==n.mozRtt){T=n.mozRtt;break}}},function(){}):e.getStats(function(e){var n,r,i=e.result();for(r=0;r<i.length;r++)if(n=i[r],""!==n.stat("googRtt")){t=n.stat("googRtt"),T=parseFloat(t);break}}))}function h(){return t.bufferedAmount}function m(){t.close(),e.close(),this.destroy()}function v(){j.clearAll(),(0,a["default"])(this,new p["default"])}function g(e,t){S.on(e,t)}function y(e,t){S.once(e,t)}function b(e){if(E=!0,"string"==typeof e.data){C.increaseRawDataDownloadedBy(e.data.length);var t=JSON.parse(e.data);switch(t.type){case"heartbeat":break;default:S.emit("message_received",t.type,t.args)}}else{C.increaseRawDataDownloadedBy(e.data.byteLength);var r=(0,_.parseMetaData)(e.data,n.fromArrayBuffer);S.emit("binarydata_received",r.data,r.id_chunk,r.segmentCoord)}}function w(){j.setInterval(function(){E===!0?E=!1:(S.emit("disconnected"),"open"===t.readyState&&(t.close(),e.close()))},k.CHECK_HEARTBEAT_INTERVAL),j.setInterval(function(){return o("heartbeat")},k.SEND_HEARTBEAT_INTERVAL)}var C=r.status,k=r.conf;this.sendMessage=o,this.sendBinaryData=s,this.getRtt=c,this.getBufferedAmount=h,this.destroy=v,this.close=m,this.on=g,this.once=y;var E=!0,S=new l["default"],T=-1,j=new d["default"];i()}Object.defineProperty(n,"__esModule",{value:!0});var o=e("babel-runtime/core-js/object/assign"),a=r(o),s=e("babel-runtime/core-js/json/stringify"),u=r(s),c=e("eventemitter3"),l=r(c),f=e("../../utils/Timers"),d=r(f),h=e("./DestroyedPeerConnection"),p=r(h),_=e("../../utils/ChunkMetadata");n["default"]=i,t.exports=n["default"]},{"../../utils/ChunkMetadata":83,"../../utils/Timers":92,"./DestroyedPeerConnection":49,"babel-runtime/core-js/json/stringify":107,"babel-runtime/core-js/object/assign":109,eventemitter3:257}],51:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n,r){return new s["default"](e,t,n,r)}Object.defineProperty(n,"__esModule",{value:!0});var o=e("./mobile/PeerConnector"),a=(r(o),e("./browser/PeerConnector")),s=r(a);n["default"]=i,t.exports=n["default"]},{"./browser/PeerConnector":53,"./mobile/PeerConnector":55}],52:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/json/stringify"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("underscore"),f=r(l),d=function(){function e(t){(0,s["default"])(this,e),this._conf=t.conf,this._status=t.status,this._init()}return(0,c["default"])(e,[{key:"connect",value:function(e,t){this._url=e,this._id=t,this._createConnection()}},{key:"send",value:function(e){if(this._connection&&this._connection.readyState===WebSocket.OPEN){var t=e.receiver_id+","+(0,o["default"])(f["default"].omit(e,"receiver_id"));this._connection.send(t)}else this._msgBuffer.push(e)}},{key:"on",value:function(e,t){this._handlers[e]=t}},{key:"close",value:function(){this._disposing=!0,this._status.setDisconnectedToSignalingServer(),this._stopReconnectionLoop(),this._connection&&this._connection.close(),void 0!==this._connectionTimeout&&(clearTimeout(this._connectionTimeout),delete this._connectionTimeout),void 0!==this._nextReconnectAttempt&&(clearTimeout(this._nextReconnectAttempt),delete this._nextReconnectAttempt),this._init()}},{key:"_createConnection",value:function(){!this._connection||this._connection.readyState!==WebSocket.CONNECTING&&this._connection.readyState!==WebSocket.OPEN||this.close();var e="4.1.2";this._connection=new WebSocket(this._url+"?id="+this._id+"&p2pVersion="+e+"&client_id="+this._conf.ID_CLIENT);var t=this._connection;this._connectionTimeout=setTimeout(function(){t.close()},1e4),this._handleConnectionSuccess(),this._handleErrorAndClose(),this._handleMessages()}},{key:"_handleErrorAndClose",value:function(){var e=this,t=this._connection,n=function(){t===e._connection&&(e._status.setDisconnectedToSignalingServer(),e._tryReconnect())};this._connection.onerror=n,this._connection.onclose=n}},{key:"_tryReconnect",value:function(){var e=this,t=function(){delete e._nextReconnectAttempt,e._createConnection(),e._updateDelay()};void 0!==this._nextReconnectAttempt||this._disposing||(this._nextReconnectAttempt=setTimeout(t,this._delayReconnection))}},{key:"_updateDelay",value:function(){this._delayReconnection=Math.min(this._delayReconnection+this._conf.SIGNALING_DELAY_STEP,this._conf.SIGNALING_DELAY_MAX)}},{key:"_handleConnectionSuccess",value:function(){var e=this;this._connection.onopen=function(){e._status.setConnectedToSignalingServer(),clearTimeout(e._connectionTimeout),delete e._connectionTimeout,e._stopReconnectionLoop(),e._sendMessagesInBuffer()}}},{key:"_handleMessages",value:function(){var e=this;this._connection.onmessage=function(t){var n=JSON.parse(t.data);if(e._handlers[n.type]){var r=f["default"].omit(n,"type");e._handlers[n.type](r)}}}},{key:"_init",value:function(){this._handlers={},this._delayReconnection=0,this._msgBuffer=[]}},{key:"_stopReconnectionLoop",value:function(){this._delayReconnection=0}},{key:"_sendMessagesInBuffer",value:function(){this._msgBuffer.forEach(this.send.bind(this)),this._msgBuffer=[]}}]),e}();n["default"]=d,t.exports=n["default"]},{"babel-runtime/core-js/json/stringify":107,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,underscore:304}],53:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){}Object.defineProperty(n,"__esModule",{value:!0});var o=e("babel-runtime/core-js/get-iterator"),a=r(o),s=e("babel-runtime/core-js/map"),u=r(s),c=e("babel-runtime/helpers/classCallCheck"),l=r(c),f=e("babel-runtime/helpers/createClass"),d=r(f),h=e("../SignalingClient"),p=r(h),_=e("../PeerConnection"),m=r(_),v=e("../../../errors/ErrorFunnel"),g=r(v),y=e("../../../utils/WebRTC"),b=r(y),w=e("../../../utils/Bucket"),C=r(w),k=e("../../../utils/Timers"),E=r(k),S=function(){function e(t,n,r,i){(0,l["default"])(this,e),this._sharedState=i,this._conf=i.conf,this._status=i.status,this._signalingClient=new p["default"](i),this._myPeerId=t,this._peerPool=n,this._analyticsData=i.analyticsData,this._signalingClient.connect(this._conf.SIGNALING_URL,t),this._signalingClient.on("webrtc_offer",this._onOffer.bind(this)),this._signalingClient.on("webrtc_answer",this._onAnswer.bind(this)),this._signalingClient.on("webrtc_icecandidate",this._onIceCandidate.bind(this)),this._peerConnectionCollection=new u["default"],this.SegmentCoord=r,this._timers=new E["default"]}return(0,d["default"])(e,[{key:"createPeerConnection",value:function(e){var t=this,n=Math.random().toString().substr(2),r=b["default"].createPeerConnection(this._conf),o=r.createDataChannel("comm",{ordered:!1,maxPacketLifeTime:1e3});o.binaryType="arraybuffer";var a=this._timers.setTimeout(function(){t._onConnexionTimeout(e,n)},this._conf.PEER_CONNECTION_TIMEOUT),s=this._createOpenDataChannelHandler(r,o,a,e,n);o.onopen=s,this._peerConnectionCollection.set(n,{pc:r,connectionTimeout:a,dataChannel:o}),r.createOffer(function(o){r.setLocalDescription(o,function(){var r=b["default"].transformOutgoingSdp(o.sdp),i={type:"webrtc_offer",connexion_id:n,sender_id:t._myPeerId,receiver_id:e,sdp:r};t._signalingClient.send(i)},i)},i),this._manageIceCandidate(r,e,n)}},{key:"_manageIceCandidate",value:function(e,t,n){var r=this._createIceCandidateBucket(this._myPeerId,t,n);e.onicecandidate=function(e){e.candidate&&r.addElement(e.candidate)}}},{key:"_onConnexionRefused",value:function(e,t){var n=this._peerConnectionCollection.get(t),r=n.pc;r.close(),this._peerConnectionCollection["delete"](t),this._peerPool.offerDeclined(e)}},{key:"_onConnexionTimeout",value:function(e,t){var n=this._peerConnectionCollection.get(t),r=n.pc;r.close(),this._peerConnectionCollection["delete"](t),this._peerPool.connectionAttemptTimeout(e)}},{key:"_onOffer",value:function(e){var t=this;this._analyticsData.offer++;var n=e.sender_id,r=e.connexion_id;if(this._peerPool.isFull()){var o={type:"webrtc_answer",connexion_id:r,sender_id:this._myPeerId,receiver_id:n,accepted:!1};return void this._signalingClient.send(o)}var a=b["default"].createPeerConnection(this._conf);this._peerConnectionCollection.set(r,{pc:a}),this._manageIceCandidate(a,n,r);var s={sdp:e.sdp,type:"offer"},u=new b["default"].SessionDescription(s);a.setRemoteDescription(u,function(){a.createAnswer(function(e){a.setLocalDescription(e,function(){e.sdp=b["default"].transformOutgoingSdp(e.sdp);var i={type:"webrtc_answer",connexion_id:r,sender_id:t._myPeerId,receiver_id:n,accepted:!0,sdp:e.sdp};t._signalingClient.send(i)},i)},i)},i);var c=this._timers.setTimeout(function(){t._onConnexionTimeout(n,r)},this._conf.PEER_CONNECTION_TIMEOUT);a.ondatachannel=function(e){var o=e.channel||e;o.binaryType="arraybuffer";var s=t._createOpenDataChannelHandler(a,o,c,n,r);"connecting"===o.readyState?o.onopen=s:s(),o.onerror=i}}},{key:"_createOpenDataChannelHandler",value:function(e,t,n,r,i){var o=this;return function(){if(o._peerConnectionCollection.get(i)){o._peerConnectionCollection["delete"](i),o._timers.clearTimeout(n);var a=new m["default"](e,t,o.SegmentCoord,o._sharedState);o._peerPool.addPeerConnection(r,a)}}}},{key:"_onAnswer",value:function(e){var t=e.sender_id,n=e.connexion_id;if(this._peerConnectionCollection.get(n)){var r=this._peerConnectionCollection.get(n),o=r.pc,a=r.connectionTimeout;if(o)if(e.accepted){var s={sdp:e.sdp,type:"answer"},u=new b["default"].SessionDescription(s);o.setRemoteDescription(u,function(){},i)}else this._timers.clearTimeout(a),this._onConnexionRefused(t,n)}}},{key:"_onIceCandidate",value:function(e){var t=this,n=e.connexion_id;if(this._peerConnectionCollection.get(n)){var r=this._peerConnectionCollection.get(n),i=r.pc;e.icecandidate_array.forEach(function(e){t._addIceCandidate(i,e)})}}},{key:"_addIceCandidate",value:function(e,t){try{e.addIceCandidate(new b["default"].IceCandidate(t))}catch(n){g["default"].notifyError(n)}}},{key:"_createIceCandidateBucket",value:function(e,t,n){var r=this,i=function(i){var o={type:"webrtc_icecandidate",connexion_id:n,sender_id:e,receiver_id:t,icecandidate_array:i};r._signalingClient.send(o)},o=new C["default"](i,this._status.incrementMissedIceCandidateCount,this._conf.ICECANDIDATES_TIMEOUT);return o}},{key:"dispose",value:function(){this._signalingClient.close(),this._timers.clearAll();var e=!0,t=!1,n=void 0;try{for(var r,i=(0,a["default"])(this._peerConnectionCollection.values());!(e=(r=i.next()).done);e=!0){var o=r.value.pc;o.close()}}catch(s){t=!0,n=s}finally{try{!e&&i["return"]&&i["return"]()}finally{if(t)throw n}}}},{key:"getPendingConnectionDebugInfos",value:function(){var e=[],t=!0,n=!1,r=void 0;try{for(var i,o=(0,a["default"])(this._peerConnectionCollection.values());!(t=(i=o.next()).done);t=!0){var s=i.value,u=s.pc,c=u.iceGatheringState,l=u.signalingState,f=u.iceConnectionState,d=s.dataChannel?s.dataChannel.readyState:null;e.push({iceGatheringState:c,signalingState:l,iceConnectionState:f,readyState:d})}}catch(h){n=!0,r=h}finally{try{!t&&o["return"]&&o["return"]()}finally{if(n)throw r}}return e}}]),e}();n["default"]=S,t.exports=n["default"]},{"../../../errors/ErrorFunnel":8,"../../../utils/Bucket":80,"../../../utils/Timers":92,"../../../utils/WebRTC":93,"../PeerConnection":50,"../SignalingClient":52,"babel-runtime/core-js/get-iterator":105,"babel-runtime/core-js/map":108,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],54:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/json/stringify"),o=r(i),a=e("babel-runtime/core-js/object/get-prototype-of"),s=r(a),u=e("babel-runtime/helpers/classCallCheck"),c=r(u),l=e("babel-runtime/helpers/createClass"),f=r(l),d=e("babel-runtime/helpers/possibleConstructorReturn"),h=r(d),p=e("babel-runtime/helpers/inherits"),_=r(p),m=e("eventemitter3"),v=r(m),g=e("../../../utils/nativeCalls"),y=e("../../../utils/Timers"),b=r(y),w=e("../../binaryAbstraction/mobile/BinaryData"),C=r(w),k={},E=function(e){function t(e,n){(0,c["default"])(this,t);var r=(0,h["default"])(this,(0,s["default"])(t).call(this));return r._conf=n,k[e]=r,r.connectionId=e,r._timers=new b["default"],r._manageHeartbeat(),r._isCommunicating=!0,r}return(0,_["default"])(t,e),(0,f["default"])(t,[{key:"sendMessage",value:function(e,t){var n=(0,o["default"])({type:e,args:t}),r={connection_id:this.connectionId,message:n};(0,g.nativeCall)("peer_connection_send_message",r)}},{key:"sendBinaryData",value:function(e,t,n){var r={connection_id:this.connectionId,binary_data_id:e.id,chunk_id:t,segment_coord:n};return(0,g.nativeCall)("peer_connection_send_data",r),!0}},{key:"getRtt",value:function(){return-1}},{key:"getBufferedAmount",value:function(){return 0}},{key:"destroy",value:function(){delete k[this.connectionId],this._timers.clearAll()}},{key:"close",value:function(){(0,g.nativeCall)("peer_connection_close",{connectionId:this.connectionId}),this.destroy()}},{key:"_manageHeartbeat",value:function(){var e=this;this._timers.setInterval(function(){e._isCommunicating===!0?e._isCommunicating=!1:(e.emit("disconnected"),(0,g.nativeCall)("peer_connection_close",{connection_id:e.connectionId}))},this._conf.CHECK_HEARTBEAT_INTERVAL),this._timers.setInterval(function(){return e.sendMessage("heartbeat")},this._conf.SEND_HEARTBEAT_INTERVAL)}}],[{key:"receivedMessage",value:function(e,t){var n=JSON.parse(t);switch(n.type){case"heartbeat":break;default:var r=k[e];r._isCommunicating=!0,r.emit("message_received",n.type,n.args)}}},{key:"receivedData",value:function(e,t,n,r,i){var o=new C["default"](t,parseInt(n,10)),a=k[e];a._isCommunicating=!0,a.emit("binarydata_received",o,r,i)}},{key:"onDisconnect",value:function(e){var t=k[e];t&&t.emit("disconnected")}}]),t}(v["default"]);n["default"]=E,t.exports=n["default"]},{"../../../utils/Timers":92,"../../../utils/nativeCalls":95,"../../binaryAbstraction/mobile/BinaryData":47,"babel-runtime/core-js/json/stringify":107,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126,eventemitter3:257}],55:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=e("../../../utils/nativeCalls"),c=e("./PeerConnection"),l=r(c),f=void 0,d=function(){function e(t,n,r){(0,o["default"])(this,e),this._conf=r,this.peerId=t,f=n}return(0,s["default"])(e,[{key:"createPeerConnection",value:function(e){var t={peerId:this.peerId,remotePeerId:e};(0,u.nativeCall)("signaling_create_peer_connection",t)}}],[{key:"peerConnectionCallback",value:function(e,t,n){switch(e){case"success":var r=new l["default"](t,this._conf);f.addPeerConnection(n,r);break;case"timeout":f.connectionAttemptTimeout(n);break;case"declined":f.offerDeclined(n);break;default:(0,u.nativeError)("[SIGNALING] bad status")}}}]),e}();n["default"]=d,t.exports=n["default"]},{"../../../utils/nativeCalls":95,"./PeerConnection":54,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],56:[function(e,t,n){(function(e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(t,n,r){var i=r.status,o=function(){var e,r={download:{p2pDownloaded:i.getP2PDownloaded(),p2pDownloadedNewAnalytics:i.getp2pDownloadedNewAnalytics(),p2pUploaded:i.getP2PUploaded(),cdnDownloaded:i.getCDNDownloaded(),dlSpeed:i.getDlSpeed(),upSpeed:i.getUpSpeed()},peers:{count:0},bufferLevel:i.getBufferLevel(),tracker:{connected:i.getConnected()},trackerConnected:i.getConnected(),sigConnected:i.getConnectedToSignalingServer(),isLive:n()},o=[];for(e=0;e<t.getPeerArray().length;e++){var a=t.getPeerArray()[e];a.getId()&&r.peers.count++,o.push(a.getDebugInfos())}return r.peerList=o,r},a=function(){e.SR_DISPLAY_INTERFACE={getStats:o}};a(),this.dispose=function(){delete window.SR_DISPLAY_INTERFACE}};n["default"]=r,t.exports=n["default"]}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],57:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(){(0,o["default"])(this,e)}return(0,s["default"])(e,[{key:"getSegmentTime",value:function(e){}},{key:"getSegmentList",value:function(e,t,n){}},{key:"getTrackList",value:function(){}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],58:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(){(0,o["default"])(this,e)}return(0,s["default"])(e,[{key:"isEqual",value:function(e){return!0}},{key:"viewToString",value:function(){return""}},{key:"toArrayBuffer",value:function(){return new ArrayBuffer(0)}},{key:"isInTrack",value:function(e){return!1}},{key:"getId",value:function(){return 0}}],[{key:"fromArrayBuffer",value:function(t){return new e}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],59:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(){(0,o["default"])(this,e)}return(0,s["default"])(e,[{key:"viewToString",value:function(){return""}},{key:"isEqual",value:function(e){return!0}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],60:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){return new a["default"](e,t)}Object.defineProperty(n,"__esModule",{value:!0});var o=e("./browser/HttpRequest"),a=r(o),s=e("./mobile/HttpRequest");r(s);i.progress=function(e,t,n){},i.response=function(e,t,n,r){},n["default"]=i,t.exports=n["default"]},{"./browser/HttpRequest":62,"./mobile/HttpRequest":63}],61:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(){(0,o["default"])(this,e)}return(0,s["default"])(e,[{key:"setHeaders",value:function(e){throw new Error("must be implemented")}},{key:"setWithCredentials",value:function(e){throw new Error("must be implemented")}},{key:"send",value:function(){throw arguments.length<=0||void 0===arguments[0]?null:arguments[0],new Error("must be implemented")}},{key:"abort",value:function(){throw new Error("must be implemented")}},{key:"validStatusCodeRange",get:function(){return this._statusCodeRange},set:function(e){this._statusCodeRange=e}},{key:"onresponse",set:function(e){throw new Error("must be implemented")},get:function(){throw new Error("must be implemented")}},{key:"onprogress",set:function(e){throw new Error("must be implemented")},get:function(){throw new Error("must be implemented")}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],62:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/keys"),o=r(i),a=e("babel-runtime/core-js/get-iterator"),s=r(a),u=e("babel-runtime/core-js/object/get-prototype-of"),c=r(u),l=e("babel-runtime/helpers/classCallCheck"),f=r(l),d=e("babel-runtime/helpers/createClass"),h=r(d),p=e("babel-runtime/helpers/possibleConstructorReturn"),_=r(p),m=e("babel-runtime/helpers/inherits"),v=r(m),g=e("../HttpRequestInterface"),y=r(g),b=function(e){function t(e,n){(0,f["default"])(this,t);var r=(0,_["default"])(this,(0,c["default"])(t).call(this));return r._xhr=new XMLHttpRequest,r._xhr.open(e,n,!0),r._xhr.responseType="arraybuffer",r}return(0,v["default"])(t,e),(0,h["default"])(t,[{key:"setHeaders",value:function(e){var t=!0,n=!1,r=void 0;try{for(var i,a=(0,s["default"])((0,o["default"])(e));!(t=(i=a.next()).done);t=!0){var u=i.value;this._xhr.setRequestHeader(u,e[u])}}catch(c){n=!0,r=c}finally{try{!t&&a["return"]&&a["return"]()}finally{if(n)throw r}}}},{key:"setWithCredentials",value:function(e){this._xhr.withCredentials=e}},{key:"send",value:function(){var e=arguments.length<=0||void 0===arguments[0]?null:arguments[0];this._xhr.send(e)}},{key:"abort",value:function(){this._xhr.abort()}},{key:"onresponse",set:function(e){var t=this;this._onreponseCallback=e,this._xhr.onloadend=function(e){var n=t._xhr.status,r=n>=t.validStatusCodeRange.start&&n<=t.validStatusCodeRange.end;r?t._onreponseCallback(null,t._xhr.response):t._onreponseCallback(e,null)},this._xhr.onerror=function(e){t._onreponseCallback(e,null)}},get:function(){return this._onreponseCallback}},{key:"onprogress",set:function(e){var t=this;this._onprogressCallback=e,this._xhr.onprogress=function(e){t._onprogressCallback(e.loaded,e.total)}},get:function(){return this._onprogressCallback}}]),t}(y["default"]);n["default"]=b,t.exports=n["default"]},{"../HttpRequestInterface":61,"babel-runtime/core-js/get-iterator":105,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/core-js/object/keys":117,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],63:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(l),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("../HttpRequestInterface"),_=r(p),m=e("uuid"),v=r(m),g=e("../../binaryAbstraction/mobile/BinaryData"),y=r(g),b=e("../../../utils/nativeCalls"),w={},C=function(e){function t(e,n){(0,s["default"])(this,t);var r=(0,f["default"])(this,(0,o["default"])(t).call(this));return r.id=v["default"].v4(),r._method=e,r._url=n,r._withCredentials=!1,r._headers=[],r}return(0,h["default"])(t,e),(0,c["default"])(t,[{key:"setHeaders",value:function(e){this._headers=e}},{key:"setWithCredentials",value:function(e){this._withCredentials=e}},{key:"send",value:function(){var e=arguments.length<=0||void 0===arguments[0]?null:arguments[0];w[this.id]=this;var t={id:this.id,method:this._method,url:this._url,headers:this._headers,with_credentials:this._withCredentials,valid_status_code_range:this.validStatusCodeRange};null!==e&&(t.body=e),(0,b.nativeCall)("send_http_request",t)}},{key:"abort",value:function(){}},{key:"onresponse",set:function(e){this._onreponseCallback=e},get:function(){return this._onreponseCallback}},{key:"onprogress",set:function(e){this._onprogressCallback=e},get:function(){return this._onprogressCallback}}],[{key:"progress",value:function(e,t,n){w[e].onprogress(t,n)}},{key:"response",value:function(e,t,n,r){
var i=new y["default"](t,parseInt(n,10));w[e].onresponse(r,i)}}]),t}(_["default"]);n["default"]=C,t.exports=n["default"]},{"../../../utils/nativeCalls":95,"../../binaryAbstraction/mobile/BinaryData":47,"../HttpRequestInterface":61,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126,uuid:306}],64:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/array/from"),o=r(i),a=e("babel-runtime/core-js/map"),s=r(a),u=e("babel-runtime/core-js/get-iterator"),c=r(u),l=e("babel-runtime/helpers/classCallCheck"),f=r(l),d=e("babel-runtime/helpers/createClass"),h=r(d),p=e("underscore"),_=r(p),m=e("../structures/TrackEdges"),v=r(m),g=e("../MediaMapCache"),y=r(g),b=e("../../../defaultConf"),w=(r(b),function(){function e(t,n,r,i,o){(0,f["default"])(this,e),this._conf=o.conf,this._p2pCache=n,this._distributedSegmentList=r,this._currentTracks=i,this._mediaMapCache=new y["default"](t,o),this._edges=new v["default"](this._mediaMapCache,o)}return(0,h["default"])(e,[{key:"updateCurrentTracks",value:function(e){this._currentTracks.update(e)}},{key:"_getSegmentsToDownloadByTrack",value:function(e,t){var n=[],r=void 0;if(r="audio"===t?this._edges.audio:this._edges.video){var i=this._mediaMapCache.getSegmentTime(r),o=this._mediaMapCache.getSegmentList(e,i,this._conf.MAX_BUFFER_DURATION),a=this._distributedSegmentList.getSegmentListAfter(r),s=this._mergeDedupe(o,a),u=this._p2pCache.listSegmentsToSkipForTrack(e);n=this._getDifference(s,u)}return n}},{key:"isSegmentRequested",value:function(e){var t=this.getSegmentListToDownload(),n=!0,r=!1,i=void 0;try{for(var o,a=(0,c["default"])(t);!(n=(o=a.next()).done);n=!0){var s=o.value;if(e.isEqual(s))return!0}}catch(u){r=!0,i=u}finally{try{!n&&a["return"]&&a["return"]()}finally{if(r)throw i}}return!1}},{key:"_getDifference",value:function(e,t){return _["default"].reject(e,function(e){return void 0!==_["default"].find(t,function(t){return e.isEqual(t)})})}},{key:"_mergeDedupe",value:function(e,t){var n=new s["default"],r=!0,i=!1,a=void 0;try{for(var u,l=(0,c["default"])(e);!(r=(u=l.next()).done);r=!0){var f=u.value;n.set(f.viewToString(),f)}}catch(d){i=!0,a=d}finally{try{!r&&l["return"]&&l["return"]()}finally{if(i)throw a}}var h=!0,p=!1,_=void 0;try{for(var m,v=(0,c["default"])(t);!(h=(m=v.next()).done);h=!0){var g=m.value;n.set(g.viewToString(),g)}}catch(d){p=!0,_=d}finally{try{!h&&v["return"]&&v["return"]()}finally{if(p)throw _}}return(0,o["default"])(n.values())}},{key:"getSegmentListToDownload",value:function(){throw new Error("Cannot call abstract method")}},{key:"updateTrackEdge",value:function(e){throw new Error("Cannot call abstract method")}}]),e}());n["default"]=w,t.exports=n["default"]},{"../../../defaultConf":1,"../MediaMapCache":20,"../structures/TrackEdges":75,"babel-runtime/core-js/array/from":104,"babel-runtime/core-js/get-iterator":105,"babel-runtime/core-js/map":108,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,underscore:304}],65:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(l),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("./AbstractScheduler"),_=r(p),m=function(e){function t(){return(0,s["default"])(this,t),(0,f["default"])(this,(0,o["default"])(t).apply(this,arguments))}return(0,h["default"])(t,e),(0,c["default"])(t,[{key:"getSegmentListToDownload",value:function(){var e=[],t=this._currentTracks.audio;t&&(e=this._getSegmentsToDownloadByTrack(t,"audio"));var n=this._currentTracks.video;return n&&(e=e.concat(this._getSegmentsToDownloadByTrack(n,"video"))),e.sort(function(e,t){return e.getId()-t.getId()})}},{key:"updateTrackEdge",value:function(e){var t=this._findTrack(e);"audio"===t?this._edges.update({audio:e,video:null}):"video"===t&&this._edges.update({audio:null,video:e})}},{key:"_findTrack",value:function(e){var t=this._currentTracks.video;if(t&&e.isInTrack(t))return"video";var n=this._currentTracks.audio;return n&&e.isInTrack(n)?"audio":void 0}}]),t}(_["default"]);n["default"]=m,t.exports=n["default"]},{"./AbstractScheduler":64,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],66:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(l),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("./AbstractScheduler"),_=r(p),m=function(e){function t(){return(0,s["default"])(this,t),(0,f["default"])(this,(0,o["default"])(t).apply(this,arguments))}return(0,h["default"])(t,e),(0,c["default"])(t,[{key:"getSegmentListToDownload",value:function(){var e=[],t=this._currentTracks.video;return t&&(e=this._getSegmentsToDownloadByTrack(t,"video")),e.sort(function(e,t){return e.getId()-t.getId()})}},{key:"updateTrackEdge",value:function(e){this._currentTracks.video&&e.isInTrack(this._currentTracks.video)&&this._edges.update({video:e,audio:null})}}]),t}(_["default"]);n["default"]=m,t.exports=n["default"]},{"./AbstractScheduler":64,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126}],67:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n,r,i,o){return"hls"===r?new a["default"](e,t,n,i,o):new u["default"](e,t,n,i,o)}Object.defineProperty(n,"__esModule",{value:!0}),n.createScheduler=i;var o=e("./HlsScheduler"),a=r(o),s=e("./GenericScheduler"),u=r(s)},{"./GenericScheduler":65,"./HlsScheduler":66}],68:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){return new a["default"](e,t)}Object.defineProperty(n,"__esModule",{value:!0});var o=e("./browser/SocketIO"),a=r(o),s=e("./mobile/SocketIO");r(s);i.emitCallback=function(e,t,n,r){},i.onConnect=function(e){},i.onDisconnect=function(e){},i.onReconnect=function(e){},i.onGetCurrentTracks=function(e,t){},n["default"]=i,t.exports=n["default"]},{"./browser/SocketIO":70,"./mobile/SocketIO":71}],69:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(t){arguments.length<=1||void 0===arguments[1]?null:arguments[1],(0,o["default"])(this,e)}return(0,s["default"])(e,[{key:"connect",value:function(){throw arguments.length<=0||void 0===arguments[0]?{}:arguments[0],new Error("must be implemented")}},{key:"emit",value:function(e,t,n){throw new Error("must be implemented")}},{key:"close",value:function(){throw new Error("must be implemented")}},{key:"transportName",get:function(){throw new Error("must be implemented")}},{key:"onconnect",set:function(e){this._onconnect=e},get:function(){return this._onconnect}},{key:"ondisconnect",set:function(e){this._ondisconnect=e},get:function(){return this._ondisconnect}},{key:"onreconnect",set:function(e){this._onreconnect=e},get:function(){return this._onreconnect}},{key:"onreconnecting",set:function(e){this._onreconnecting=e},get:function(){return this._onreconnecting}},{key:"ongetcurrenttracks",set:function(e){this._ongetcurrenttracks=e},get:function(){return this._ongetcurrenttracks}}]),e}();n["default"]=u,t.exports=n["default"]},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],70:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(l),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("../SocketIOInterface"),_=r(p),m=e("socket.io-client"),v=r(m),g=function(e){function t(e){(0,s["default"])(this,t);var n=(0,f["default"])(this,(0,o["default"])(t).call(this));return n._url=e,n}return(0,h["default"])(t,e),(0,c["default"])(t,[{key:"connect",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this._socket=v["default"].connect(this._url,{"force new connection":!0,query:t,reconnectionDelay:2e3,reconnectionDelayMax:3e5}),this._socket.on("connect",function(){e.onconnect()}),this._socket.on("disconnect",this.ondisconnect.bind(this)),this._socket.on("reconnecting",this.onreconnecting.bind(this)),this._socket.on("reconnect",this.onreconnect.bind(this)),this._socket.on("get_current_tracks",this.ongetcurrenttracks.bind(this))}},{key:"emit",value:function(e,t,n){void 0===t?this._socket.emit(e,n):this._socket.emit(e,t,n)}},{key:"close",value:function(){this._socket.close()}},{key:"transportName",get:function(){return this._socket.io.engine.transport.name}}]),t}(_["default"]);n["default"]=g,t.exports=n["default"]},{"../SocketIOInterface":69,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126,"socket.io-client":269}],71:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/get-prototype-of"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=e("babel-runtime/helpers/possibleConstructorReturn"),f=r(l),d=e("babel-runtime/helpers/inherits"),h=r(d),p=e("../SocketIOInterface"),_=r(p),m=e("uuid"),v=r(m),g=e("../../../utils/nativeCalls"),y={},b={},w=function(e){function t(e){var n=arguments.length<=1||void 0===arguments[1]?null:arguments[1];(0,s["default"])(this,t);var r=(0,f["default"])(this,(0,o["default"])(t).call(this));return r.id=v["default"].v4(),r._url=e,r._reason=n,r}return(0,h["default"])(t,e),(0,c["default"])(t,[{key:"connect",value:function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];y[this.id]=this;var t={id:this.id,url:this._url,query_params:e};null!==this._reason&&(t.reason=this._reason),(0,g.nativeCall)("socket_io_connect",t)}},{key:"emit",value:function(e,t,n){void 0!==n&&(void 0===b[this.id]&&(b[this.id]={}),b[this.id][e]=n);var r={id:this.id,label:e};void 0!==t&&(r.data=t),(0,g.nativeCall)("socket_io_emit",r)}},{key:"close",value:function(){var e={id:this.id};(0,g.nativeCall)("socket_io_close",e)}},{key:"transportName",get:function(){return"websocket"}}],[{key:"emitCallback",value:function(e,t,n,r){var i=b[e][t];i(n,r),delete b[e][t]}},{key:"onConnect",value:function(e){var t=y[e];void 0!==t.onconnect&&t.onconnect()}},{key:"onDisconnect",value:function(e){var t=y[e];void 0!==t.ondisconnect&&t.ondisconnect()}},{key:"onReconnect",value:function(e){var t=y[e];void 0!==t.onreconnect&&t.onreconnect()}},{key:"onReconnecting",value:function(e){var t=y[e];void 0!==t.onreconnecting&&t.onreconnecting()}},{key:"onGetCurrentTracks",value:function(e,t){var n=y[e];void 0!==n.ongetcurrenttracks&&n.ongetcurrenttracks(t)}}]),t}(_["default"]);n["default"]=w,t.exports=n["default"]},{"../../../utils/nativeCalls":95,"../SocketIOInterface":69,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124,"babel-runtime/helpers/inherits":125,"babel-runtime/helpers/possibleConstructorReturn":126,uuid:306}],72:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.CurrentTracks=void 0;var i=e("babel-runtime/core-js/object/seal"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u);n.CurrentTracks=function(){function e(){(0,s["default"])(this,e),this.audio=void 0,this.video=void 0,(0,o["default"])(this)}return(0,c["default"])(e,[{key:"update",value:function(e){var t=e.audio,n=e.video;if(!t&&!n)throw new Error("There must be at least one updated track");this.audio=t||this.audio,this.video=n||this.video}}]),e}()},{"babel-runtime/core-js/object/seal":118,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],73:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/freeze"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("../ChunkManager"),c=r(u),l=e("../Seeders"),f=r(l),d=e("../expectedInterfaces/SegmentCoordInterface"),h=r(d),p=e("../../utils/Interface"),_=function m(e,t,n,r,i){(0,s["default"])(this,m),(0,p.checkInterface)(h["default"],e),this.segmentCoord=e,this.chunkManager=new c["default"](e,t,n,r,i),this.seeders=new f["default"],(0,o["default"])(this)};n["default"]=_,t.exports=n["default"]},{"../../utils/Interface":86,"../ChunkManager":12,"../Seeders":33,"../expectedInterfaces/SegmentCoordInterface":58,"babel-runtime/core-js/object/freeze":113,"babel-runtime/helpers/classCallCheck":123}],74:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/freeze"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("../../utils/Delta"),c=e("../expectedInterfaces/SegmentCoordInterface"),l=r(c),f=e("../../utils/Interface"),d=function h(e,t,n){if((0,s["default"])(this,h),(0,f.checkInterface)(l["default"],e),!(0,u.isNumeric)(t))throw new Error("Invalid value for size");if(!n)throw new Error("No hash");this.segmentCoord=e,this.size=t,this.hash=n,(0,o["default"])(this)};n["default"]=d,t.exports=n["default"]},{"../../utils/Delta":85,"../../utils/Interface":86,"../expectedInterfaces/SegmentCoordInterface":58,"babel-runtime/core-js/object/freeze":113,"babel-runtime/helpers/classCallCheck":123}],75:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/core-js/object/seal"),o=r(i),a=e("babel-runtime/helpers/classCallCheck"),s=r(a),u=e("babel-runtime/helpers/createClass"),c=r(u),l=function(){function e(t,n){(0,s["default"])(this,e),this.audio=void 0,this.video=void 0,this._mediaMapCache=t,this._moduleState=n.moduleState,(0,o["default"])(this)}return(0,c["default"])(e,[{key:"update",value:function(e){var t=e.audio,n=e.video;if(void 0===t&&void 0===n)throw new Error("There must be at least one updated track edge");t&&(this.audio=t),n&&(this.video=n,this._moduleState.videoCurrentTime=this._mediaMapCache.getSegmentTime(n))}}]),e}();n["default"]=l,t.exports=n["default"]},{"babel-runtime/core-js/object/seal":118,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],76:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=e("./browser/callHashWorker"),c=r(u),l=(e("./mobile/callHashWorker"),function(){function e(){(0,o["default"])(this,e),this._disposed=!1}return(0,s["default"])(e,[{key:"callHashWorker",value:function(e,t){var n=this,r=function(){n._disposed||t.apply(void 0,arguments)};return(0,c["default"])(e,r)}},{key:"dispose",value:function(){this._disposed=!0}}]),e}());n["default"]=l,t.exports=n["default"]},{"./browser/callHashWorker":78,"./mobile/callHashWorker":79,"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],77:[function(e,t,n){"use strict";function r(){var e={mul32:function(e,t){var n=65535&t,r=t-n;return(r*e|0)+(n*e|0)|0},hashBytes:function(e,t,n){for(var r=3432918353,i=461845907,o=n,a=-4&t,s=0;a>s;s+=4){var u=255&e[s]|(255&e[s+1])<<8|(255&e[s+2])<<16|(255&e[s+3])<<24;u=this.mul32(u,r),u=(131071&u)<<15|u>>>17,u=this.mul32(u,i),o^=u,o=(524287&o)<<13|o>>>19,o=5*o+3864292196|0}switch(u=0,t%4){case 3:u=(255&e[a+2])<<16;case 2:u|=(255&e[a+1])<<8;case 1:u|=255&e[a],u=this.mul32(u,r),u=(131071&u)<<15|u>>>17,u=this.mul32(u,i),o^=u}return o^=t,o^=o>>>16,o=this.mul32(o,2246822507),o^=o>>>13,o=this.mul32(o,3266489909),o^=o>>>16}};self.onmessage=function(t){var n=new Uint8Array(t.data.segmentData),r=e.hashBytes(n,n.length,0).toString();self.postMessage({segmentData:t.data.segmentData,jobIndex:t.data.jobIndex,hash:r},[t.data.segmentData])}}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=r,t.exports=n["default"]},{}],78:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(){var e=URL.createObjectURL(new Blob(["("+u["default"].toString()+")()"],{type:"application/javascript"})),t=new Worker(e);return URL.revokeObjectURL(e),t}function o(e){var t=e.data,n=t.jobIndex,r=t.segmentData,i=t.hash,o=c[n];delete c[n],o(r,i)}function a(e,t){var n=c.push(t)-1;l.postMessage({segmentData:e,jobIndex:n},[e])}Object.defineProperty(n,"__esModule",{value:!0});var s=e("./HashWorker"),u=r(s),c=[],l=i();l.onmessage=o,n["default"]=a,t.exports=n["default"]},{"./HashWorker":77}],79:[function(e,t,n){"use strict";function r(e,t){o[e.id]=t,a[e.id]=e,window.webkit.messageHandlers.call_hash_worker.postMessage({binaryDataId:e.id})}function i(e,t){var n=a[e],r=o[e];r(n,t),delete o[e]}Object.defineProperty(n,"__esModule",{value:!0});var o={},a={};n.callHashWorkerMobile=r,n.hasherCallback=i},{}],80:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0});var i=e("./Timers"),o=r(i),a=function(e,t,n){var r=[],i=!1,a=new o["default"],s=function(e){i?t(e):r.push(e)},u=function(){a.setTimeout(function(){i=!0,e(r),r=[]},n)};u(),this.addElement=s};n["default"]=a,t.exports=n["default"]},{"./Timers":92}],81:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e){var t=Math.floor(e/256),n=e%256;return new Uint8Array([n,t])},i=function(e){var t=r(Math.floor(e/65536)),n=r(e%65536);return new Uint8Array([n[0],n[1],t[0],t[1]])};n.uint16ToUint8Array2=r,n.numToUint8Array4=i},{}],82:[function(e,t,n){"use strict";var r=function(e,t,n,r){var i=6371,o=(e-t)*Math.PI/180,a=(n-r)*Math.PI/180,s=e*Math.PI/180,u=t*Math.PI/180,c=Math.sin(o/2)*Math.sin(o/2)+Math.sin(a/2)*Math.sin(a/2)*Math.cos(s)*Math.cos(u),l=2*Math.atan2(Math.sqrt(c),Math.sqrt(1-c)),f=i*l;return f};t.exports={getDistanceFromLatitudeLongitude:r}},{}],83:[function(e,t,n){"use strict";function r(e,t,n){var r=e.toArrayBuffer(),i=(0,o.numToUint8Array4)(t),a=n.byteLength,s=(0,o.uint16ToUint8Array2)(a),u=new Uint8Array(i.byteLength+s.byteLength+a+r.byteLength);return u.set(i,0),u.set(s,4),u.set(new Uint8Array(n),6),u.set(new Uint8Array(r),6+a),u.buffer}function i(e,t){var n=e.slice(0,4),r=e.slice(4,6),i=new Uint16Array(r)[0],o=e.slice(6,6+i),a=e.slice(6+i),s=new Uint32Array(n)[0],u=t(a);return{segmentCoord:u,id_chunk:s,data:o}}Object.defineProperty(n,"__esModule",{value:!0}),n.parseMetaData=n.encodeMetaData=void 0;var o=e("./Bytes");n.encodeMetaData=r,n.parseMetaData=i},{"./Bytes":81}],84:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){if("string"!=typeof e||!e.length)throw new TypeError(t)}function o(e){var t=e.contentUrl,n=e.contentId;if(null!==n&&void 0!==n)return i(n,"Unvalid p2pConfig property: contentId needs to be a non-empty string"),n;i(t,"Unvalid PeerAgent constructor argument: contentUrl needs to be a non-empty string");var r=s["default"].parse(t,!0,!0);return r.host+r.pathname}Object.defineProperty(n,"__esModule",{value:!0}),n.formatContentId=void 0;var a=e("url"),s=r(a);n.formatContentId=o},{url:132}],85:[function(e,t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=function(e){return"number"==typeof e&&!isNaN(e)},i=function(){var e=0,t=function(t){var n=t-e;return e=t,n};this.calcDelta=t};n.Delta=i,n.isNumeric=r},{}],86:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t){var n=e.prototype,r=!0,i=!1,a=void 0;try{for(var s,u=(0,h["default"])(o(n));!(r=(s=u.next()).done);r=!0){var c=s.value;if((0,f["default"])(t[c])!==(0,f["default"])(n[c])){var l=t.constructor.name;throw new Error("The method "+c+" of "+e.name+" is not defined in "+l)}}}catch(d){i=!0,a=d}finally{try{!r&&u["return"]&&u["return"]()}finally{if(i)throw a}}}function o(e){var t=(0,c["default"])(e).filter(function(e){return"constructor"!==e}),n=Object.prototype;if((0,s["default"])(e)===n)return t;var r=(0,s["default"])(e);return t.concat(o(r))}Object.defineProperty(n,"__esModule",{value:!0}),n._getEveryPropertyNames=n.checkInterface=void 0;var a=e("babel-runtime/core-js/object/get-prototype-of"),s=r(a),u=e("babel-runtime/core-js/object/get-own-property-names"),c=r(u),l=e("babel-runtime/helpers/typeof"),f=r(l),d=e("babel-runtime/core-js/get-iterator"),h=r(d);n.checkInterface=i,n._getEveryPropertyNames=o},{"babel-runtime/core-js/get-iterator":105,"babel-runtime/core-js/object/get-own-property-names":114,"babel-runtime/core-js/object/get-prototype-of":115,"babel-runtime/helpers/typeof":129}],87:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){(0,d["default"])(e),(0,l["default"])(e).forEach(function(t){var n=e[t];null===n||"object"!==("undefined"==typeof n?"undefined":(0,u["default"])(n))||(0,a["default"])(n)||i(n)})}Object.defineProperty(n,"__esModule",{value:!0}),n.deepFreeze=void 0;var o=e("babel-runtime/core-js/object/is-frozen"),a=r(o),s=e("babel-runtime/helpers/typeof"),u=r(s),c=e("babel-runtime/core-js/object/get-own-property-names"),l=r(c),f=e("babel-runtime/core-js/object/freeze"),d=r(f);n.deepFreeze=i},{"babel-runtime/core-js/object/freeze":113,"babel-runtime/core-js/object/get-own-property-names":114,"babel-runtime/core-js/object/is-frozen":116,"babel-runtime/helpers/typeof":129}],88:[function(e,t,n){"use strict";function r(e){if(null===e)throw new Error("Panic! Attempted to unwrap null");if(void 0===e)throw new Error("Panic! Attempted to unwrap undefined");return e}Object.defineProperty(n,"__esModule",{value:!0}),n.unwrap=r},{}],89:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(n,"__esModule",{value:!0}),n.assertStreamType=n.StreamTypes=void 0;var i=e("babel-runtime/core-js/object/values"),o=r(i),a=e("babel-runtime/core-js/object/freeze"),s=r(a),u={HLS:"hls",DASH:"dash",SMOOTH:"smooth"};(0,s["default"])(u);var c=function(e){if(-1===(0,o["default"])(u).indexOf(e))throw new TypeError('"'+e+'" is not a valid value for stream type.')};n.StreamTypes=u,n.assertStreamType=c},{"babel-runtime/core-js/object/freeze":113,"babel-runtime/core-js/object/values":120}],90:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(){var e=URL.createObjectURL(new Blob(["("+h["default"].toString()+")()"],{type:"application/javascript"})),t=new Worker(e);return URL.revokeObjectURL(e),t}function o(e){var t=e.data,n=t.id,r=t.type,i=p[n];"setTimeout"===r&&delete p[n],i&&i()}function a(e,t,n){return m++,p[m]=t,_.postMessage({time:n,id:m,type:e}),m}function s(e,t){delete p[t],_.postMessage({id:t,type:e})}function u(e,t){return a("setTimeout",e,t)}function c(e,t){return a("setInterval",e,t)}function l(e){s("clearTimeout",e)}function f(e){s("clearInterval",e)}Object.defineProperty(n,"__esModule",{value:!0}),n.reliableSetTimeout=u,n.reliableSetInterval=c,n.reliableClearTimeout=l,n.reliableClearInterval=f;var d=e("./TimerWorker"),h=r(d),p={},_=void 0;_=i(),_.onmessage=o;var m=0},{"./TimerWorker":91}],91:[function(e,t,n){"use strict";function r(){function e(e,t){return function(){return self.postMessage({id:e,type:t})}}self.onmessage=function(t){var n=t.data,r=n.type,i=n.id;switch(r){case"setTimeout":var o=n.time;setTimeout(e(i,r),o);break;case"setInterval":var a=n.time;setInterval(e(i,r),a);break;case"clearTimeout":clearTimeout(i);break;case"clearInterval":clearInterval(i)}}}Object.defineProperty(n,"__esModule",{value:!0}),n["default"]=r,t.exports=n["default"]},{}],92:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=e("babel-runtime/core-js/map"),o=r(i),a=e("./TimerAbstraction"),s=function(){var e=this,t=[],n=[],r=new o["default"],i=new o["default"],s=function(e,n){var r=(0,a.reliableSetTimeout)(function(){u(r),e()},n);return t.push(r),r},u=function(e){for(var n in t)if(t[n]===e){(0,a.reliableClearTimeout)(e),t.splice(n,1);break}},c=function(e,t){var r=(0,a.reliableSetInterval)(e,t);return n.push(r),r},l=function(e){for(var t in n)if(n[t]===e){(0,a.reliableClearInterval)(e),n.splice(t,1);break}},f=function(e,t,n){if(!r.get(e)){var i=(0,a.reliableSetTimeout)(function(){d(e),t()},n);return r.set(e,i),i}return!1},d=function(e){var t=r.get(e);t&&((0,a.reliableClearTimeout)(t),r["delete"](e))},h=function(e,t,n){if(!i.get(e)){var r=(0,a.reliableSetInterval)(t,n);return i.set(e,r),r}return!1},p=function(e){var t=i.get(e);t&&((0,a.reliableClearInterval)(t),i["delete"](e))},_=function(){t.forEach(function(e){(0,a.reliableClearTimeout)(e)}),t=[],n.forEach(function(e){(0,a.reliableClearInterval)(e)}),n=[],i.forEach(function(e){(0,a.reliableClearInterval)(e)}),i.clear(),r.forEach(function(e){(0,a.reliableClearTimeout)(e)}),r.clear()};e.setTimeout=s,e.clearTimeout=u,e.setInterval=c,e.clearInterval=l,e.clearAll=_,e.setNamedTimeout=f,e.clearNamedTimeout=d,e.setNamedInterval=h,e.clearNamedInterval=p,e._getTimeoutArray=function(){return t},e._getIntervalArray=function(){return n},e._getNamedTimeoutMap=function(){return r},e._getNamedIntervalMap=function(){return i}};t.exports=s},{"./TimerAbstraction":90,"babel-runtime/core-js/map":108}],93:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e){return new s(l(e),{optional:[{DtlsSrtpKeyAgreement:!0}]})}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../../defaultConf"),a=(r(o),function(e){return e=e.replace(/b=AS([^\r\n]+\r\n)/g,""),e=e.replace(/a=mid:audio\r\n/g,"a=mid:audio\r\nb=AS:50\r\n"),e=e.replace(/a=mid:video\r\n/g,"a=mid:video\r\nb=AS:256\r\n"),e=e.replace(/a=mid:data\r\n/g,"a=mid:data\r\nb=AS:1638400\r\n")}),s=window.RTCPeerConnection||window.webkitRTCPeerConnection,u=window.RTCIceCandidate,c=window.RTCSessionDescription,l=function(e){var t=e.ENABLE_TURN;return t?{iceServers:e.TURNSERVERS.concat(e.STUNSERVERS)}:{iceServers:e.STUNSERVERS}};n["default"]={transformOutgoingSdp:a,createPeerConnection:i,IceCandidate:u,SessionDescription:c},t.exports=n["default"]},{"../../defaultConf":1}],94:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){if(t.cacheSize&&(e.P2P_CACHE_MAX_SIZE=1024*t.cacheSize*1024,e.LIVE.P2P_CACHE_MAX_SIZE=e.P2P_CACHE_MAX_SIZE),void 0!==t.activateP2P&&(e.ALLOW_P2P=!!t.activateP2P),void 0!==t.debug&&(e.DEBUG=!!t.debug),t.signalingUrl&&(e.SIGNALING_URL=t.signalingUrl),t.trackerUrl&&(e.TRACKER_URL=t.trackerUrl),t.analyticsUrl&&(e.ANALYTICS.KLARA_URL=t.analyticsUrl),t.deviceInfo&&(e.DEVICE_INFO=t.deviceInfo),void 0!==t.rangeRequestEnabled&&(e.RANGE_REQUEST_ALLOWED=!!t.rangeRequestEnabled),!t.streamrootKey)throw new Error("There must be a streamrootKey in the P2PConfig object");e.ID_CLIENT=t.streamrootKey,e.P2P_PROTOCOL_VERSION+="-"+n}Object.defineProperty(n,"__esModule",{value:!0});var o=e("../../defaultConf");r(o);n["default"]=i,t.exports=n["default"]},{"../../defaultConf":1}],95:[function(e,t,n){"use strict";function r(e,t){}function i(e){r("log",e)}function o(e){}Object.defineProperty(n,"__esModule",{value:!0}),n.nativeCall=r,n.nativeLog=i,n.nativeError=o},{}],96:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){var r=u["default"].v4();return l[r]=e,(0,c.nativeCall)("set_timer",{timer_id:r,interval:t,repeats:n}),r}function o(e){(0,c.nativeCall)("clear_timer",{timer_id:e})}function a(e){l[e]()}Object.defineProperty(n,"__esModule",{value:!0}),n.clearTimer=n.setTimer=n.timersCallback=void 0;var s=e("uuid"),u=r(s),c=e("./nativeCalls"),l={};n.timersCallback=a,n.setTimer=i,n.clearTimer=o},{"./nativeCalls":95,uuid:306}],97:[function(e,t,n){"use strict";var r=e("ua-parser-js"),i=new r;i.setUA(window.navigator.userAgent);var o=i.getResult();t.exports.isMobile=function(){var e="mobile"===o.device.type||"tablet"===o.device.type||"console"===o.device.type||"Android"===o.os.name||"iOS"===o.os.name;return e},t.exports.uaObject=o},{"ua-parser-js":303}],98:[function(e,t,n){"use strict";function r(){String.prototype.endsWith=function(e){var t=this.toString();return t.lastIndexOf(e)===t.length-1}}function i(e){return e.endsWith("/")?e:e+"/"}Object.defineProperty(n,"__esModule",{value:!0}),n.polyfillEndsWith=r,n.formatUrl=i,String.prototype.endsWith||r()},{}],99:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){var r=document.getElementsByTagName("video");if(1!==r.length)throw new Error("BufferDisplay debug tool requiresa page with a single video");var i=r[0],a=document.createElement("canvas");a.width=i.clientWidth||C;var s=document.getElementById("bufferDisplay");s||(s=document.createElement("div"),document.getElementsByTagName("body")[0].appendChild(s)),s.appendChild(a);var u=o.bind(null,a,i,e,t,n),c=setInterval(u,30),l=function(){clearInterval(c),s.removeChild(a)};return{dispose:l}}function o(e,t,n,r,i){var o=a(n,r);s(e,{video:t,cacheState:o,currentTracks:i})}function a(e,t){var n=t.getTrackList(),r=[],i=!0,o=!1,a=void 0;try{for(var s,u=(0,h["default"])(n);!(i=(s=u.next()).done);i=!0){var c=s.value,l=new _["default"](t),f=e.listDownloadedSegmentsForTrack(c),d=!0,p=!1,m=void 0;try{for(var v,g=(0,h["default"])(f);!(d=(v=g.next()).done);d=!0){var y=v.value;l.addSegmentCoord(y)}}catch(b){p=!0,m=b}finally{try{!d&&g["return"]&&g["return"]()}finally{if(p)throw m}}r.push({vbm:l,coord:c})}}catch(b){o=!0,a=b}finally{try{!i&&u["return"]&&u["return"]()}finally{if(o)throw a}}return r}function s(e,t){var n=t.video,r=t.cacheState,i=t.currentTracks,o=n.buffered,a=n.currentTime,s=e.getContext("2d");e.height=(m+g)*r.length;var d=1/0,p=0,_=!0,C=!1,k=void 0;try{for(var E,S=(0,h["default"])(r);!(_=(E=S.next()).done);_=!0){var T=E.value.vbm;if(T.length){var j=T.start(0),A=T.end(T.length-1);d>j&&(d=j),A>p&&(p=A)}}}catch(I){C=!0,k=I}finally{try{!_&&S["return"]&&S["return"]()}finally{if(C)throw k}}if(o.length){var D=o.start(0),P=o.end(o.length-1);d>D&&(d=D),P>p&&(p=P)}for(var R={min:d,max:p,canvasWidth:e.width},M=0;M<r.length;M++){var x=r[M],T=x.vbm,O=x.coord,N=(m+g)*M,L={scale:R,height:m,yPosition:N,color:y};l(s,L,T);var U=N+m/2;if(c(s,O.viewToString(),U),u(O,i)){var B={scale:R,height:v,yPosition:N+(m-v),color:b};l(s,B,o)}}var F={height:e.height,color:w,scale:R};f(s,F,a)}function u(e,t){return e.isEqual(t.video)||e.isEqual(t.audio)}function c(e,t,n){e.fillStyle="green",e.font=E,e.fillText(t,0,n)}function l(e,t,n){for(var r=t.scale,i=t.height,o=t.yPosition,a=t.color,s=0;s<n.length;s++){var u=S(r,n.start(s)),c=S(r,n.end(s)),l=c-u>1?c-u:1;e.fillStyle=a,e.fillRect(u,o,l,i)}}function f(e,t,n){var r=t.color,i=t.scale,o=t.height,a=S(i,n);
e.fillStyle=r,e.fillRect(a,0,1,o),e.fillStyle=r,e.font=E,e.fillText(n.toFixed(3),0,o)}Object.defineProperty(n,"__esModule",{value:!0});var d=e("babel-runtime/core-js/get-iterator"),h=r(d),p=e("./VirtualBufferedManager"),_=r(p),m=30,v=10,g=3,y="#97b9e2",b="#202429",w="#bf0101",C=460,k=60,E="12px Arial",S=function(e,t){var n=e.min,r=e.max,i=e.canvasWidth,o=i-k,a=Math.max(r-n,180);return k+(t-n)*o/a};n["default"]=i,t.exports=n["default"]},{"./VirtualBufferedManager":100,"babel-runtime/core-js/get-iterator":105}],100:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}var i=e("babel-runtime/helpers/classCallCheck"),o=r(i),a=e("babel-runtime/helpers/createClass"),s=r(a),u=function(){function e(t){(0,o["default"])(this,e),this._buffered=[],this._mapManager=t}return(0,s["default"])(e,[{key:"start",value:function(e){return e in this._buffered?this._buffered[e].start:0}},{key:"end",value:function(e){return e in this._buffered?this._buffered[e].end:0}},{key:"addSegmentCoord",value:function(e){var t=void 0,n=void 0;try{t=this._mapManager.getSegmentTime(e),n=t+this._mapManager.getSegmentDuration(e)}catch(r){return}if(!this._buffered.length)return void this._buffered.push({start:t,end:n});for(var i=void 0,o=void 0,a=0;a<this._buffered.length;a++){var s=this._buffered[a],u=this._buffered[a+1]||{start:1/0,end:1/0};if(s.end===t&&n===u.start){s.end=u.end,i=a+1;break}if(s.end===t&&n!==u.start){s.end=n;break}if(s.end!==t&&n===u.start){u.start=t;break}if(s.end<=t&&n<=u.start){o=a+1;break}}void 0!==i&&this._buffered.splice(i,1),void 0!==o&&this._buffered.splice(o,0,{start:t,end:n})}},{key:"length",get:function(){return this._buffered.length}}]),e}();t.exports=u},{"babel-runtime/helpers/classCallCheck":123,"babel-runtime/helpers/createClass":124}],101:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function i(e,t,n){var r=document.getElementsByTagName("video");if(1!==r.length)throw new Error("BufferDisplay debug tool requiresa page with a single video");var i=r[0],a=document.createElement("canvas"),s=document.getElementById("chunkDisplay");s||(s=document.createElement("div"),document.getElementsByTagName("body")[0].appendChild(s)),s.appendChild(a);var u=o.bind(null,a,e,t,i,n),c=setInterval(u,30),l=function(){clearInterval(c),s.removeChild(a)};return{dispose:l}}function o(e,t,n,r,i){for(var o=n.getTrackList(),s=new v["default"],u=0;u<o.length;u++){var c=o[u];s.set(c,[])}for(var l=t.listSegmentsDownloadStatus(),d=i.getSegmentListToDownload(),h=0;h<l.length;h++)for(var p=l[h],m=p.segmentcoord,g=p.downloadStatusList,y=p.seederCount,b=0;b<o.length;b++){var w=o[b];if(m.isInTrack(w)){var C=f(g);try{for(var k=n.getSegmentTime(m),E=!1,S=0;S<d.length;S++)if(d[S].isEqual(m)){d.splice(S,1),E=!0;break}s.get(w).push({segmentAreas:C,id:m.viewToString(),time:k,length:g.length,seederCount:y,inSchedulerList:E})}catch(T){}}}var j=!0,A=!1,I=void 0;try{for(var D,P=(0,_["default"])(d);!(j=(D=P.next()).done);j=!0){var R=D.value,M=!0,x=!1,O=void 0;try{for(var N,L=(0,_["default"])(o);!(M=(N=L.next()).done);M=!0){var U=N.value;if(R.isInTrack(U)){var B=n.getSegmentTime(R);s.get(U).push({id:R.viewToString(),time:B,seederCount:0,inSchedulerList:!0})}}}catch(F){x=!0,O=F}finally{try{!M&&L["return"]&&L["return"]()}finally{if(x)throw O}}}}catch(F){A=!0,I=F}finally{try{!j&&P["return"]&&P["return"]()}finally{if(A)throw I}}a(e,s,r.currentTime)}function a(e,t,n){e.height=1e3,e.width=A*t.size;var r=void 0,i=e.getContext("2d"),o=0,a=!0,l=!1,f=void 0;try{for(var d,p=(0,_["default"])(t);!(a=(d=p.next()).done);a=!0){var m=(0,h["default"])(d.value,2),v=m[0],g=m[1];r=k,s(i,v,r,o);var y=!0,w=!1,C=void 0;try{for(var E,S=(0,_["default"])(g);!(y=(E=S.next()).done);y=!0){var I=E.value,D=I.id,P=I.time,R=I.segmentAreas,M=I.length,x=I.seederCount,O=I.inSchedulerList;P>n-j&&(r+=T,R&&c(i,R,M,r,o),u(i,{id:D,time:P,seederCount:x,inSchedulerList:O},r,o),r+=b)}}catch(N){w=!0,C=N}finally{try{!y&&S["return"]&&S["return"]()}finally{if(w)throw C}}o++}}catch(N){l=!0,f=N}finally{try{!a&&p["return"]&&p["return"]()}finally{if(l)throw f}}}function s(e,t,n,r){var i=A*r;e.fillStyle=w,e.font=E,e.fillText(t.viewToString(),i,n)}function u(e,t,n,r){var i=t.id,o=t.time,a=t.seederCount,s=t.inSchedulerList,u=A*r;e.fillStyle=C,e.font=s?S:E,e.fillText(i+"  --  "+o.toFixed(1)+" -- "+a,u,n+b)}function c(e,t,n,r,i){var o=A*i,a=0,s=!0,u=!1,c=void 0;try{for(var f,d=(0,_["default"])(t);!(s=(f=d.next()).done);s=!0){var h=f.value,p=(h.end-h.start)*y/n;e.fillStyle=l(h.status),e.fillRect(o+g+a,r,p,b),a+=p}}catch(m){u=!0,c=m}finally{try{!s&&d["return"]&&d["return"]()}finally{if(u)throw c}}t.length||(e.fillStyle="#D490D4",e.fillRect(o+g,r,y,b))}function l(e){switch(e){case"pending":return"gray";case"downloading":return"blue";case"downloaded":return"green";case"CDNdownloaded":return"orange";case"failed":return"red"}}function f(e){for(var t=void 0,n=[],r=0;r<e.length;r++){var i=e[r];if(t===i)n[n.length-1].end++;else{var o={start:r,end:r+1,status:i};t=i,n.push(o)}}return n}Object.defineProperty(n,"__esModule",{value:!0});var d=e("babel-runtime/helpers/slicedToArray"),h=r(d),p=e("babel-runtime/core-js/get-iterator"),_=r(p),m=e("babel-runtime/core-js/map"),v=r(m),g=100,y=100,b=15,w="red",C="black",k=15,E=k+"px Arial",S="bold "+E,T=5,j=10,A=g+y+20;n["default"]=i,t.exports=n["default"]},{"babel-runtime/core-js/get-iterator":105,"babel-runtime/core-js/map":108,"babel-runtime/helpers/slicedToArray":127}],102:[function(e,t,n){function r(e,t,n){function r(e,i){if(r.count<=0)throw new Error("after called too many times");--r.count,e?(o=!0,t(e),t=n):0!==r.count||o||t(null,i)}var o=!1;return n=n||i,r.count=e,0===e?t():r}function i(){}t.exports=r},{}],103:[function(e,t,n){t.exports=function(e,t,n){var r=e.byteLength;if(t=t||0,n=n||r,e.slice)return e.slice(t,n);if(0>t&&(t+=r),0>n&&(n+=r),n>r&&(n=r),t>=r||t>=n||0===r)return new ArrayBuffer(0);for(var i=new Uint8Array(e),o=new Uint8Array(n-t),a=t,s=0;n>a;a++,s++)o[s]=i[a];return o.buffer}},{}],104:[function(e,t,n){t.exports={"default":e("core-js/library/fn/array/from"),__esModule:!0}},{"core-js/library/fn/array/from":137}],105:[function(e,t,n){t.exports={"default":e("core-js/library/fn/get-iterator"),__esModule:!0}},{"core-js/library/fn/get-iterator":138}],106:[function(e,t,n){t.exports={"default":e("core-js/library/fn/is-iterable"),__esModule:!0}},{"core-js/library/fn/is-iterable":139}],107:[function(e,t,n){t.exports={"default":e("core-js/library/fn/json/stringify"),__esModule:!0}},{"core-js/library/fn/json/stringify":140}],108:[function(e,t,n){t.exports={"default":e("core-js/library/fn/map"),__esModule:!0}},{"core-js/library/fn/map":141}],109:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/assign"),__esModule:!0}},{"core-js/library/fn/object/assign":142}],110:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/create"),__esModule:!0}},{"core-js/library/fn/object/create":143}],111:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/define-properties"),__esModule:!0}},{"core-js/library/fn/object/define-properties":144}],112:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/define-property"),__esModule:!0}},{"core-js/library/fn/object/define-property":145}],113:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/freeze"),__esModule:!0}},{"core-js/library/fn/object/freeze":146}],114:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/get-own-property-names"),__esModule:!0}},{"core-js/library/fn/object/get-own-property-names":147}],115:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/get-prototype-of"),__esModule:!0}},{"core-js/library/fn/object/get-prototype-of":148}],116:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/is-frozen"),__esModule:!0}},{"core-js/library/fn/object/is-frozen":149}],117:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/keys"),__esModule:!0}},{"core-js/library/fn/object/keys":150}],118:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/seal"),__esModule:!0}},{"core-js/library/fn/object/seal":151}],119:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/set-prototype-of"),__esModule:!0}},{"core-js/library/fn/object/set-prototype-of":152}],120:[function(e,t,n){t.exports={"default":e("core-js/library/fn/object/values"),__esModule:!0}},{"core-js/library/fn/object/values":153}],121:[function(e,t,n){t.exports={"default":e("core-js/library/fn/symbol"),__esModule:!0}},{"core-js/library/fn/symbol":154}],122:[function(e,t,n){t.exports={"default":e("core-js/library/fn/symbol/iterator"),__esModule:!0}},{"core-js/library/fn/symbol/iterator":155}],123:[function(e,t,n){"use strict";n.__esModule=!0,n["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},{}],124:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}n.__esModule=!0;var i=e("../core-js/object/define-property"),o=r(i);n["default"]=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o["default"])(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},{"../core-js/object/define-property":112}],125:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}n.__esModule=!0;var i=e("../core-js/object/set-prototype-of"),o=r(i),a=e("../core-js/object/create"),s=r(a),u=e("../helpers/typeof"),c=r(u);n["default"]=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof t?"undefined":(0,c["default"])(t)));e.prototype=(0,s["default"])(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(o["default"]?(0,o["default"])(e,t):e.__proto__=t)}},{"../core-js/object/create":110,"../core-js/object/set-prototype-of":119,"../helpers/typeof":129}],126:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}n.__esModule=!0;var i=e("../helpers/typeof"),o=r(i);n["default"]=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==("undefined"==typeof t?"undefined":(0,o["default"])(t))&&"function"!=typeof t?e:t}},{"../helpers/typeof":129}],127:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}n.__esModule=!0;var i=e("../core-js/is-iterable"),o=r(i),a=e("../core-js/get-iterator"),s=r(a);n["default"]=function(){function e(e,t){var n=[],r=!0,i=!1,o=void 0;try{for(var a,u=(0,s["default"])(e);!(r=(a=u.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(c){i=!0,o=c}finally{try{!r&&u["return"]&&u["return"]()}finally{if(i)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if((0,o["default"])(Object(t)))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}()},{"../core-js/get-iterator":105,"../core-js/is-iterable":106}],128:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}n.__esModule=!0;var i=e("../core-js/array/from"),o=r(i);n["default"]=function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return(0,o["default"])(e)}},{"../core-js/array/from":104}],129:[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}n.__esModule=!0;var i=e("../core-js/symbol/iterator"),o=r(i),a=e("../core-js/symbol"),s=r(a),u="function"==typeof s["default"]&&"symbol"==typeof o["default"]?function(e){return typeof e}:function(e){return e&&"function"==typeof s["default"]&&e.constructor===s["default"]?"symbol":typeof e};n["default"]="function"==typeof s["default"]&&"symbol"===u(o["default"])?function(e){return"undefined"==typeof e?"undefined":u(e)}:function(e){return e&&"function"==typeof s["default"]&&e.constructor===s["default"]?"symbol":"undefined"==typeof e?"undefined":u(e)}},{"../core-js/symbol":121,"../core-js/symbol/iterator":122}],130:[function(e,t,n){function r(e){e=e||{},this.ms=e.min||100,this.max=e.max||1e4,this.factor=e.factor||2,this.jitter=e.jitter>0&&e.jitter<=1?e.jitter:0,this.attempts=0}t.exports=r,r.prototype.duration=function(){var e=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),n=Math.floor(t*this.jitter*e);e=0==(1&Math.floor(10*t))?e-n:e+n}return 0|Math.min(e,this.max)},r.prototype.reset=function(){this.attempts=0},r.prototype.setMin=function(e){this.ms=e},r.prototype.setMax=function(e){this.max=e},r.prototype.setJitter=function(e){this.jitter=e}},{}],131:[function(e,t,n){!function(e){"use strict";n.encode=function(t){var n,r=new Uint8Array(t),i=r.length,o="";for(n=0;i>n;n+=3)o+=e[r[n]>>2],o+=e[(3&r[n])<<4|r[n+1]>>4],o+=e[(15&r[n+1])<<2|r[n+2]>>6],o+=e[63&r[n+2]];return i%3===2?o=o.substring(0,o.length-1)+"=":i%3===1&&(o=o.substring(0,o.length-2)+"=="),o},n.decode=function(t){var n,r,i,o,a,s=.75*t.length,u=t.length,c=0;"="===t[t.length-1]&&(s--,"="===t[t.length-2]&&s--);var l=new ArrayBuffer(s),f=new Uint8Array(l);for(n=0;u>n;n+=4)r=e.indexOf(t[n]),i=e.indexOf(t[n+1]),o=e.indexOf(t[n+2]),a=e.indexOf(t[n+3]),f[c++]=r<<2|i>>4,f[c++]=(15&i)<<4|o>>2,f[c++]=(3&o)<<6|63&a;return l}}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/")},{}],132:[function(e,t,n){function r(){this.protocol=null,this.slashes=null,this.auth=null,this.host=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.query=null,this.pathname=null,this.path=null,this.href=null}function i(e,t,n){if(e&&c(e)&&e instanceof r)return e;var i=new r;return i.parse(e,t,n),i}function o(e){return u(e)&&(e=i(e)),e instanceof r?e.format():r.prototype.format.call(e)}function a(e,t){return i(e,!1,!0).resolve(t)}function s(e,t){return e?i(e,!1,!0).resolveObject(t):t}function u(e){return"string"==typeof e}function c(e){return"object"==typeof e&&null!==e}function l(e){return null===e}function f(e){return null==e}var d=e("punycode");n.parse=i,n.resolve=a,n.resolveObject=s,n.format=o,n.Url=r;var h=/^([a-z0-9.+-]+:)/i,p=/:[0-9]*$/,_=["<",">",'"',"`"," ","\r","\n","\t"],m=["{","}","|","\\","^","`"].concat(_),v=["'"].concat(m),g=["%","/","?",";","#"].concat(v),y=["/","?","#"],b=255,w=/^[a-z0-9A-Z_-]{0,63}$/,C=/^([a-z0-9A-Z_-]{0,63})(.*)$/,k={javascript:!0,"javascript:":!0},E={javascript:!0,"javascript:":!0},S={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0},T=e("querystring");r.prototype.parse=function(e,t,n){if(!u(e))throw new TypeError("Parameter 'url' must be a string, not "+typeof e);var r=e;r=r.trim();var i=h.exec(r);if(i){i=i[0];var o=i.toLowerCase();this.protocol=o,r=r.substr(i.length)}if(n||i||r.match(/^\/\/[^@\/]+@[^@\/]+/)){var a="//"===r.substr(0,2);!a||i&&E[i]||(r=r.substr(2),this.slashes=!0)}if(!E[i]&&(a||i&&!S[i])){for(var s=-1,c=0;c<y.length;c++){var l=r.indexOf(y[c]);-1!==l&&(-1===s||s>l)&&(s=l)}var f,p;p=-1===s?r.lastIndexOf("@"):r.lastIndexOf("@",s),-1!==p&&(f=r.slice(0,p),r=r.slice(p+1),this.auth=decodeURIComponent(f)),s=-1;for(var c=0;c<g.length;c++){var l=r.indexOf(g[c]);-1!==l&&(-1===s||s>l)&&(s=l)}-1===s&&(s=r.length),this.host=r.slice(0,s),r=r.slice(s),this.parseHost(),this.hostname=this.hostname||"";var _="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!_)for(var m=this.hostname.split(/\./),c=0,j=m.length;j>c;c++){var A=m[c];if(A&&!A.match(w)){for(var I="",D=0,P=A.length;P>D;D++)I+=A.charCodeAt(D)>127?"x":A[D];if(!I.match(w)){var R=m.slice(0,c),M=m.slice(c+1),x=A.match(C);x&&(R.push(x[1]),M.unshift(x[2])),M.length&&(r="/"+M.join(".")+r),this.hostname=R.join(".");break}}}if(this.hostname.length>b?this.hostname="":this.hostname=this.hostname.toLowerCase(),!_){for(var O=this.hostname.split("."),N=[],c=0;c<O.length;++c){var L=O[c];N.push(L.match(/[^A-Za-z0-9_-]/)?"xn--"+d.encode(L):L)}this.hostname=N.join(".")}var U=this.port?":"+this.port:"",B=this.hostname||"";this.host=B+U,this.href+=this.host,_&&(this.hostname=this.hostname.substr(1,this.hostname.length-2),"/"!==r[0]&&(r="/"+r))}if(!k[o])for(var c=0,j=v.length;j>c;c++){var F=v[c],H=encodeURIComponent(F);H===F&&(H=escape(F)),r=r.split(F).join(H)}var q=r.indexOf("#");-1!==q&&(this.hash=r.substr(q),r=r.slice(0,q));var G=r.indexOf("?");if(-1!==G?(this.search=r.substr(G),this.query=r.substr(G+1),t&&(this.query=T.parse(this.query)),r=r.slice(0,G)):t&&(this.search="",this.query={}),r&&(this.pathname=r),S[o]&&this.hostname&&!this.pathname&&(this.pathname="/"),this.pathname||this.search){var U=this.pathname||"",L=this.search||"";this.path=U+L}return this.href=this.format(),this},r.prototype.format=function(){var e=this.auth||"";e&&(e=encodeURIComponent(e),e=e.replace(/%3A/i,":"),e+="@");var t=this.protocol||"",n=this.pathname||"",r=this.hash||"",i=!1,o="";this.host?i=e+this.host:this.hostname&&(i=e+(-1===this.hostname.indexOf(":")?this.hostname:"["+this.hostname+"]"),this.port&&(i+=":"+this.port)),this.query&&c(this.query)&&Object.keys(this.query).length&&(o=T.stringify(this.query));var a=this.search||o&&"?"+o||"";return t&&":"!==t.substr(-1)&&(t+=":"),this.slashes||(!t||S[t])&&i!==!1?(i="//"+(i||""),n&&"/"!==n.charAt(0)&&(n="/"+n)):i||(i=""),r&&"#"!==r.charAt(0)&&(r="#"+r),a&&"?"!==a.charAt(0)&&(a="?"+a),n=n.replace(/[?#]/g,function(e){return encodeURIComponent(e)}),a=a.replace("#","%23"),t+i+n+a+r},r.prototype.resolve=function(e){return this.resolveObject(i(e,!1,!0)).format()},r.prototype.resolveObject=function(e){if(u(e)){var t=new r;t.parse(e,!1,!0),e=t}var n=new r;if(Object.keys(this).forEach(function(e){n[e]=this[e]},this),n.hash=e.hash,""===e.href)return n.href=n.format(),n;if(e.slashes&&!e.protocol)return Object.keys(e).forEach(function(t){"protocol"!==t&&(n[t]=e[t])}),S[n.protocol]&&n.hostname&&!n.pathname&&(n.path=n.pathname="/"),n.href=n.format(),n;if(e.protocol&&e.protocol!==n.protocol){if(!S[e.protocol])return Object.keys(e).forEach(function(t){n[t]=e[t]}),n.href=n.format(),n;if(n.protocol=e.protocol,e.host||E[e.protocol])n.pathname=e.pathname;else{for(var i=(e.pathname||"").split("/");i.length&&!(e.host=i.shift()););e.host||(e.host=""),e.hostname||(e.hostname=""),""!==i[0]&&i.unshift(""),i.length<2&&i.unshift(""),n.pathname=i.join("/")}if(n.search=e.search,n.query=e.query,n.host=e.host||"",n.auth=e.auth,n.hostname=e.hostname||e.host,n.port=e.port,n.pathname||n.search){var o=n.pathname||"",a=n.search||"";n.path=o+a}return n.slashes=n.slashes||e.slashes,n.href=n.format(),n}var s=n.pathname&&"/"===n.pathname.charAt(0),c=e.host||e.pathname&&"/"===e.pathname.charAt(0),d=c||s||n.host&&e.pathname,h=d,p=n.pathname&&n.pathname.split("/")||[],i=e.pathname&&e.pathname.split("/")||[],_=n.protocol&&!S[n.protocol];if(_&&(n.hostname="",n.port=null,n.host&&(""===p[0]?p[0]=n.host:p.unshift(n.host)),n.host="",e.protocol&&(e.hostname=null,e.port=null,e.host&&(""===i[0]?i[0]=e.host:i.unshift(e.host)),e.host=null),d=d&&(""===i[0]||""===p[0])),c)n.host=e.host||""===e.host?e.host:n.host,n.hostname=e.hostname||""===e.hostname?e.hostname:n.hostname,n.search=e.search,n.query=e.query,p=i;else if(i.length)p||(p=[]),p.pop(),p=p.concat(i),n.search=e.search,n.query=e.query;else if(!f(e.search)){if(_){n.hostname=n.host=p.shift();var m=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");m&&(n.auth=m.shift(),n.host=n.hostname=m.shift())}return n.search=e.search,n.query=e.query,l(n.pathname)&&l(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.href=n.format(),n}if(!p.length)return n.pathname=null,n.search?n.path="/"+n.search:n.path=null,n.href=n.format(),n;for(var v=p.slice(-1)[0],g=(n.host||e.host)&&("."===v||".."===v)||""===v,y=0,b=p.length;b>=0;b--)v=p[b],"."==v?p.splice(b,1):".."===v?(p.splice(b,1),y++):y&&(p.splice(b,1),y--);if(!d&&!h)for(;y--;y)p.unshift("..");!d||""===p[0]||p[0]&&"/"===p[0].charAt(0)||p.unshift(""),g&&"/"!==p.join("/").substr(-1)&&p.push("");var w=""===p[0]||p[0]&&"/"===p[0].charAt(0);if(_){n.hostname=n.host=w?"":p.length?p.shift():"";var m=!!(n.host&&n.host.indexOf("@")>0)&&n.host.split("@");m&&(n.auth=m.shift(),n.host=n.hostname=m.shift())}return d=d||n.host&&p.length,d&&!w&&p.unshift(""),p.length?n.pathname=p.join("/"):(n.pathname=null,n.path=null),l(n.pathname)&&l(n.search)||(n.path=(n.pathname?n.pathname:"")+(n.search?n.search:"")),n.auth=e.auth||n.auth,n.slashes=n.slashes||e.slashes,n.href=n.format(),n},r.prototype.parseHost=function(){var e=this.host,t=p.exec(e);t&&(t=t[0],":"!==t&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)}},{punycode:265,querystring:268}],133:[function(t,n,r){!function(t,r){function i(e,t){try{if("function"!=typeof e)return e;if(!e.bugsnag){var n=a();e.bugsnag=function(r){if(t&&t.eventHandler&&(C=r),k=n,!T){var i=e.apply(this,arguments);return k=null,i}try{return e.apply(this,arguments)}catch(o){throw h("autoNotify",!0)&&(S.notifyException(o,null,null,"error"),b()),o}finally{k=null}},e.bugsnag.bugsnag=e.bugsnag}return e.bugsnag}catch(r){return e}}function o(){D=!1}function a(){var e=document.currentScript||k;if(!e&&D){var t=document.scripts||document.getElementsByTagName("script");e=t[t.length-1]}return e}function s(e){var t=a();t&&(e.script={src:t.src,content:h("inlineScript",!0)?t.innerHTML:""})}function u(e){var n=h("disableLog"),r=t.console;void 0===r||void 0===r.log||n||r.log("[Bugsnag] "+e)}function c(e,n,r){var i=h("maxDepth",I);if(r>=i)return encodeURIComponent(n)+"=[RECURSIVE]";r=r+1||1;try{if(t.Node&&e instanceof t.Node)return encodeURIComponent(n)+"="+encodeURIComponent(y(e));var o=[];for(var a in e)if(e.hasOwnProperty(a)&&null!=a&&null!=e[a]){var s=n?n+"["+a+"]":a,u=e[a];o.push("object"==typeof u?c(u,s,r):encodeURIComponent(s)+"="+encodeURIComponent(u))}return o.join("&")}catch(l){return encodeURIComponent(n)+"="+encodeURIComponent(""+l)}}function l(e,t,n){if(null==t)return e;if(n>=h("maxDepth",I))return"[RECURSIVE]";e=e||{};for(var r in t)if(t.hasOwnProperty(r))try{t[r].constructor===Object?e[r]=l(e[r],t[r],n+1||1):e[r]=t[r]}catch(i){e[r]=t[r]}return e}function f(e,t){if(e+="?"+c(t)+"&ct=img&cb="+(new Date).getTime(),"undefined"!=typeof BUGSNAG_TESTING&&S.testRequest)S.testRequest(e,t);else{var n=h("notifyHandler");if("xhr"===n){var r=new XMLHttpRequest;r.open("GET",e,!0),r.send()}else{var i=new Image;i.src=e}}}function d(e){var t={},n=/^data\-([\w\-]+)$/;if(e)for(var r=e.attributes,i=0;i<r.length;i++){var o=r[i];if(n.test(o.nodeName)){var a=o.nodeName.match(n)[1];t[a]=o.value||o.nodeValue}}return t}function h(e,t){P=P||d(U);var n=void 0!==S[e]?S[e]:P[e.toLowerCase()];return"false"===n&&(n=!1),void 0!==n?n:t}function p(e){return!(!e||!e.match(R))||(u("Invalid API key '"+e+"'"),!1)}function _(e,n){var r=h("apiKey");if(p(r)&&A){A-=1;var i=h("releaseStage","production"),o=h("notifyReleaseStages");if(o){for(var a=!1,s=0;s<o.length;s++)if(i===o[s]){a=!0;break}if(!a)return}var c=[e.name,e.message,e.stacktrace].join("|");if(c!==E){E=c,C&&(n=n||{},n["Last Event"]=g(C));var d={notifierVersion:N,apiKey:r,projectRoot:h("projectRoot")||t.location.protocol+"//"+t.location.host,context:h("context")||t.location.pathname,userId:h("userId"),user:h("user"),metaData:l(l({},h("metaData")),n),releaseStage:i,appVersion:h("appVersion"),url:t.location.href,userAgent:navigator.userAgent,language:navigator.language||navigator.userLanguage,severity:e.severity,name:e.name,message:e.message,stacktrace:e.stacktrace,file:e.file,lineNumber:e.lineNumber,columnNumber:e.columnNumber,payloadVersion:"2"},_=S.beforeNotify;if("function"==typeof _){var m=_(d,d.metaData);if(m===!1)return}return 0===d.lineNumber&&/Script error\.?/.test(d.message)?u("Ignoring cross-domain script error. See https://bugsnag.com/docs/notifiers/js/cors"):void f(h("endpoint")||O,d)}}}function m(){var e,t,n=10,r="[anonymous]";try{throw new Error("")}catch(i){e="<generated>\n",t=v(i)}if(!t){e="<generated-ie>\n";var o=[];try{for(var a=arguments.callee.caller.caller;a&&o.length<n;){var s=M.test(a.toString())?RegExp.$1||r:r;o.push(s),a=a.caller}}catch(c){u(c)}t=o.join("\n")}return e+t}function v(e){return e.stack||e.backtrace||e.stacktrace}function g(e){var t={millisecondsAgo:new Date-e.timeStamp,type:e.type,which:e.which,target:y(e.target)};return t}function y(e){if(e){var t=e.attributes;if(t){for(var n="<"+e.nodeName.toLowerCase(),r=0;r<t.length;r++)t[r].value&&"null"!==t[r].value.toString()&&(n+=" "+t[r].name+'="'+t[r].value+'"');return n+">"}return e.nodeName}}function b(){j+=1,t.setTimeout(function(){j-=1})}function w(e,n,r){var i=e[n],o=r(i);e[n]=o,"undefined"!=typeof BUGSNAG_TESTING&&t.undo&&t.undo.push(function(){e[n]=i})}var C,k,E,S={},T=!0,j=0,A=10,I=5;S.noConflict=function(){return t.Bugsnag=r,"undefined"==typeof r&&delete t.Bugsnag,S},S.refresh=function(){A=10},S.notifyException=function(e,t,n,r){e&&(t&&"string"!=typeof t&&(n=t,t=void 0),n||(n={}),s(n),_({name:t||e.name,message:e.message||e.description,stacktrace:v(e)||m(),file:e.fileName||e.sourceURL,lineNumber:e.lineNumber||e.line,columnNumber:e.columnNumber?e.columnNumber+1:void 0,severity:r||"warning"},n))},S.notify=function(e,n,r,i){_({name:e,message:n,stacktrace:m(),file:t.location.toString(),lineNumber:1,severity:i||"warning"},r)};var D="complete"!==document.readyState;document.addEventListener?(document.addEventListener("DOMContentLoaded",o,!0),t.addEventListener("load",o,!0)):t.attachEvent("onload",o);var P,R=/^[0-9a-f]{32}$/i,M=/function\s*([\w\-$]+)?\s*\(/i,x="https://notify.bugsnag.com/",O=x+"js",N="2.5.0",L=document.getElementsByTagName("script"),U=L[L.length-1];if(t.atob){if(t.ErrorEvent)try{0===new t.ErrorEvent("test").colno&&(T=!1)}catch(B){}}else T=!1;if(h("autoNotify",!0)){w(t,"onerror",function(e){return"undefined"!=typeof BUGSNAG_TESTING&&(S._onerror=e),function(n,r,i,o,a){var u=h("autoNotify",!0),c={};!o&&t.event&&(o=t.event.errorCharacter),s(c),k=null,u&&!j&&_({name:a&&a.name||"window.onerror",message:n,file:r,lineNumber:i,columnNumber:o,stacktrace:a&&v(a)||m(),severity:"error"},c),"undefined"!=typeof BUGSNAG_TESTING&&(e=S._onerror),e&&e(n,r,i,o,a)}});var F=function(e){return function(t,n){if("function"==typeof t){t=i(t);var r=Array.prototype.slice.call(arguments,2);return e(function(){t.apply(this,r)},n)}return e(t,n)}};w(t,"setTimeout",F),w(t,"setInterval",F),t.requestAnimationFrame&&w(t,"requestAnimationFrame",function(e){return function(t){return e(i(t))}}),t.setImmediate&&w(t,"setImmediate",function(e){return function(){var t=Array.prototype.slice.call(arguments);return t[0]=i(t[0]),e.apply(this,t)}}),"EventTarget Window Node ApplicationCache AudioTrackList ChannelMergerNode CryptoOperation EventSource FileReader HTMLUnknownElement IDBDatabase IDBRequest IDBTransaction KeyOperation MediaController MessagePort ModalWindow Notification SVGElementInstance Screen TextTrack TextTrackCue TextTrackList WebSocket WebSocketWorker Worker XMLHttpRequest XMLHttpRequestEventTarget XMLHttpRequestUpload".replace(/\w+/g,function(e){var n=t[e]&&t[e].prototype;n&&n.hasOwnProperty&&n.hasOwnProperty("addEventListener")&&(w(n,"addEventListener",function(e){return function(t,n,r,o){try{n&&n.handleEvent&&(n.handleEvent=i(n.handleEvent,{eventHandler:!0}))}catch(a){u(a)}return e.call(this,t,i(n,{eventHandler:!0}),r,o)}}),w(n,"removeEventListener",function(e){return function(t,n,r,o){return e.call(this,t,n,r,o),e.call(this,t,i(n),r,o)}}))})}t.Bugsnag=S,"function"==typeof e&&e.amd?e([],function(){return S}):"object"==typeof n&&"object"==typeof n.exports&&(n.exports=S)}(window,window.Bugsnag)},{}],134:[function(e,t,n){var r=[].slice;t.exports=function(e,t){if("string"==typeof t&&(t=e[t]),"function"!=typeof t)throw new Error("bind() requires a function");var n=r.call(arguments,2);return function(){return t.apply(e,n.concat(r.call(arguments)))}}},{}],135:[function(e,t,n){function r(e){return e?i(e):void 0}function i(e){for(var t in r.prototype)e[t]=r.prototype[t];return e}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks[e]=this._callbacks[e]||[]).push(t),this},r.prototype.once=function(e,t){function n(){r.off(e,n),t.apply(this,arguments)}var r=this;return this._callbacks=this._callbacks||{},n.fn=t,this.on(e,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks[e];if(!n)return this;if(1==arguments.length)return delete this._callbacks[e],this;for(var r,i=0;i<n.length;i++)if(r=n[i],r===t||r.fn===t){n.splice(i,1);break}return this},r.prototype.emit=function(e){this._callbacks=this._callbacks||{};var t=[].slice.call(arguments,1),n=this._callbacks[e];if(n){n=n.slice(0);for(var r=0,i=n.length;i>r;++r)n[r].apply(this,t)}return this},r.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks[e]||[]},r.prototype.hasListeners=function(e){return!!this.listeners(e).length}},{}],136:[function(e,t,n){t.exports=function(e,t){var n=function(){};n.prototype=t.prototype,e.prototype=new n,e.prototype.constructor=e}},{}],137:[function(e,t,n){e("../../modules/es6.string.iterator"),e("../../modules/es6.array.from"),t.exports=e("../../modules/_core").Array.from},{"../../modules/_core":170,"../../modules/es6.array.from":235,"../../modules/es6.string.iterator":250}],138:[function(e,t,n){e("../modules/web.dom.iterable"),e("../modules/es6.string.iterator"),t.exports=e("../modules/core.get-iterator")},{"../modules/core.get-iterator":233,"../modules/es6.string.iterator":250,"../modules/web.dom.iterable":256}],139:[function(e,t,n){e("../modules/web.dom.iterable"),e("../modules/es6.string.iterator"),t.exports=e("../modules/core.is-iterable")},{"../modules/core.is-iterable":234,"../modules/es6.string.iterator":250,"../modules/web.dom.iterable":256}],140:[function(e,t,n){var r=e("../../modules/_core"),i=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(e){return i.stringify.apply(i,arguments)}},{"../../modules/_core":170}],141:[function(e,t,n){e("../modules/es6.object.to-string"),e("../modules/es6.string.iterator"),e("../modules/web.dom.iterable"),e("../modules/es6.map"),e("../modules/es7.map.to-json"),t.exports=e("../modules/_core").Map},{"../modules/_core":170,"../modules/es6.map":237,"../modules/es6.object.to-string":249,"../modules/es6.string.iterator":250,"../modules/es7.map.to-json":252,"../modules/web.dom.iterable":256}],142:[function(e,t,n){e("../../modules/es6.object.assign"),t.exports=e("../../modules/_core").Object.assign},{"../../modules/_core":170,"../../modules/es6.object.assign":238}],143:[function(e,t,n){e("../../modules/es6.object.create");var r=e("../../modules/_core").Object;t.exports=function(e,t){return r.create(e,t)}},{"../../modules/_core":170,"../../modules/es6.object.create":239}],144:[function(e,t,n){e("../../modules/es6.object.define-properties");var r=e("../../modules/_core").Object;t.exports=function(e,t){return r.defineProperties(e,t)}},{"../../modules/_core":170,"../../modules/es6.object.define-properties":240}],145:[function(e,t,n){e("../../modules/es6.object.define-property");var r=e("../../modules/_core").Object;t.exports=function(e,t,n){return r.defineProperty(e,t,n)}},{"../../modules/_core":170,"../../modules/es6.object.define-property":241}],146:[function(e,t,n){e("../../modules/es6.object.freeze"),t.exports=e("../../modules/_core").Object.freeze},{"../../modules/_core":170,"../../modules/es6.object.freeze":242}],147:[function(e,t,n){e("../../modules/es6.object.get-own-property-names");var r=e("../../modules/_core").Object;t.exports=function(e){return r.getOwnPropertyNames(e)}},{"../../modules/_core":170,"../../modules/es6.object.get-own-property-names":243}],148:[function(e,t,n){e("../../modules/es6.object.get-prototype-of"),t.exports=e("../../modules/_core").Object.getPrototypeOf},{"../../modules/_core":170,"../../modules/es6.object.get-prototype-of":244}],149:[function(e,t,n){e("../../modules/es6.object.is-frozen"),
t.exports=e("../../modules/_core").Object.isFrozen},{"../../modules/_core":170,"../../modules/es6.object.is-frozen":245}],150:[function(e,t,n){e("../../modules/es6.object.keys"),t.exports=e("../../modules/_core").Object.keys},{"../../modules/_core":170,"../../modules/es6.object.keys":246}],151:[function(e,t,n){e("../../modules/es6.object.seal"),t.exports=e("../../modules/_core").Object.seal},{"../../modules/_core":170,"../../modules/es6.object.seal":247}],152:[function(e,t,n){e("../../modules/es6.object.set-prototype-of"),t.exports=e("../../modules/_core").Object.setPrototypeOf},{"../../modules/_core":170,"../../modules/es6.object.set-prototype-of":248}],153:[function(e,t,n){e("../../modules/es7.object.values"),t.exports=e("../../modules/_core").Object.values},{"../../modules/_core":170,"../../modules/es7.object.values":253}],154:[function(e,t,n){e("../../modules/es6.symbol"),e("../../modules/es6.object.to-string"),e("../../modules/es7.symbol.async-iterator"),e("../../modules/es7.symbol.observable"),t.exports=e("../../modules/_core").Symbol},{"../../modules/_core":170,"../../modules/es6.object.to-string":249,"../../modules/es6.symbol":251,"../../modules/es7.symbol.async-iterator":254,"../../modules/es7.symbol.observable":255}],155:[function(e,t,n){e("../../modules/es6.string.iterator"),e("../../modules/web.dom.iterable"),t.exports=e("../../modules/_wks-ext").f("iterator")},{"../../modules/_wks-ext":230,"../../modules/es6.string.iterator":250,"../../modules/web.dom.iterable":256}],156:[function(e,t,n){t.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},{}],157:[function(e,t,n){t.exports=function(){}},{}],158:[function(e,t,n){t.exports=function(e,t,n,r){if(!(e instanceof t)||void 0!==r&&r in e)throw TypeError(n+": incorrect invocation!");return e}},{}],159:[function(e,t,n){var r=e("./_is-object");t.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},{"./_is-object":189}],160:[function(e,t,n){var r=e("./_for-of");t.exports=function(e,t){var n=[];return r(e,!1,n.push,n,t),n}},{"./_for-of":180}],161:[function(e,t,n){var r=e("./_to-iobject"),i=e("./_to-length"),o=e("./_to-index");t.exports=function(e){return function(t,n,a){var s,u=r(t),c=i(u.length),l=o(a,c);if(e&&n!=n){for(;c>l;)if(s=u[l++],s!=s)return!0}else for(;c>l;l++)if((e||l in u)&&u[l]===n)return e||l||0;return!e&&-1}}},{"./_to-index":222,"./_to-iobject":224,"./_to-length":225}],162:[function(e,t,n){var r=e("./_ctx"),i=e("./_iobject"),o=e("./_to-object"),a=e("./_to-length"),s=e("./_array-species-create");t.exports=function(e,t){var n=1==e,u=2==e,c=3==e,l=4==e,f=6==e,d=5==e||f,h=t||s;return function(t,s,p){for(var _,m,v=o(t),g=i(v),y=r(s,p,3),b=a(g.length),w=0,C=n?h(t,b):u?h(t,0):void 0;b>w;w++)if((d||w in g)&&(_=g[w],m=y(_,w,v),e))if(n)C[w]=m;else if(m)switch(e){case 3:return!0;case 5:return _;case 6:return w;case 2:C.push(_)}else if(l)return!1;return f?-1:c||l?l:C}}},{"./_array-species-create":164,"./_ctx":172,"./_iobject":186,"./_to-length":225,"./_to-object":226}],163:[function(e,t,n){var r=e("./_is-object"),i=e("./_is-array"),o=e("./_wks")("species");t.exports=function(e){var t;return i(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!i(t.prototype)||(t=void 0),r(t)&&(t=t[o],null===t&&(t=void 0))),void 0===t?Array:t}},{"./_is-array":188,"./_is-object":189,"./_wks":231}],164:[function(e,t,n){var r=e("./_array-species-constructor");t.exports=function(e,t){return new(r(e))(t)}},{"./_array-species-constructor":163}],165:[function(e,t,n){var r=e("./_cof"),i=e("./_wks")("toStringTag"),o="Arguments"==r(function(){return arguments}()),a=function(e,t){try{return e[t]}catch(n){}};t.exports=function(e){var t,n,s;return void 0===e?"Undefined":null===e?"Null":"string"==typeof(n=a(t=Object(e),i))?n:o?r(t):"Object"==(s=r(t))&&"function"==typeof t.callee?"Arguments":s}},{"./_cof":166,"./_wks":231}],166:[function(e,t,n){var r={}.toString;t.exports=function(e){return r.call(e).slice(8,-1)}},{}],167:[function(e,t,n){"use strict";var r=e("./_object-dp").f,i=e("./_object-create"),o=(e("./_hide"),e("./_redefine-all")),a=e("./_ctx"),s=e("./_an-instance"),u=e("./_defined"),c=e("./_for-of"),l=e("./_iter-define"),f=e("./_iter-step"),d=e("./_set-species"),h=e("./_descriptors"),p=e("./_meta").fastKey,_=h?"_s":"size",m=function(e,t){var n,r=p(t);if("F"!==r)return e._i[r];for(n=e._f;n;n=n.n)if(n.k==t)return n};t.exports={getConstructor:function(e,t,n,l){var f=e(function(e,r){s(e,f,t,"_i"),e._i=i(null),e._f=void 0,e._l=void 0,e[_]=0,void 0!=r&&c(r,n,e[l],e)});return o(f.prototype,{clear:function(){for(var e=this,t=e._i,n=e._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete t[n.i];e._f=e._l=void 0,e[_]=0},"delete":function(e){var t=this,n=m(t,e);if(n){var r=n.n,i=n.p;delete t._i[n.i],n.r=!0,i&&(i.n=r),r&&(r.p=i),t._f==n&&(t._f=r),t._l==n&&(t._l=i),t[_]--}return!!n},forEach:function(e){s(this,f,"forEach");for(var t,n=a(e,arguments.length>1?arguments[1]:void 0,3);t=t?t.n:this._f;)for(n(t.v,t.k,this);t&&t.r;)t=t.p},has:function(e){return!!m(this,e)}}),h&&r(f.prototype,"size",{get:function(){return u(this[_])}}),f},def:function(e,t,n){var r,i,o=m(e,t);return o?o.v=n:(e._l=o={i:i=p(t,!0),k:t,v:n,p:r=e._l,n:void 0,r:!1},e._f||(e._f=o),r&&(r.n=o),e[_]++,"F"!==i&&(e._i[i]=o)),e},getEntry:m,setStrong:function(e,t,n){l(e,t,function(e,t){this._t=e,this._k=t,this._l=void 0},function(){for(var e=this,t=e._k,n=e._l;n&&n.r;)n=n.p;return e._t&&(e._l=n=n?n.n:e._t._f)?"keys"==t?f(0,n.k):"values"==t?f(0,n.v):f(0,[n.k,n.v]):(e._t=void 0,f(1))},n?"entries":"values",!n,!0),d(t)}}},{"./_an-instance":158,"./_ctx":172,"./_defined":173,"./_descriptors":174,"./_for-of":180,"./_hide":183,"./_iter-define":192,"./_iter-step":194,"./_meta":198,"./_object-create":200,"./_object-dp":201,"./_redefine-all":214,"./_set-species":217}],168:[function(e,t,n){var r=e("./_classof"),i=e("./_array-from-iterable");t.exports=function(e){return function(){if(r(this)!=e)throw TypeError(e+"#toJSON isn't generic");return i(this)}}},{"./_array-from-iterable":160,"./_classof":165}],169:[function(e,t,n){"use strict";var r=e("./_global"),i=e("./_export"),o=e("./_meta"),a=e("./_fails"),s=e("./_hide"),u=e("./_redefine-all"),c=e("./_for-of"),l=e("./_an-instance"),f=e("./_is-object"),d=e("./_set-to-string-tag"),h=e("./_object-dp").f,p=e("./_array-methods")(0),_=e("./_descriptors");t.exports=function(e,t,n,m,v,g){var y=r[e],b=y,w=v?"set":"add",C=b&&b.prototype,k={};return _&&"function"==typeof b&&(g||C.forEach&&!a(function(){(new b).entries().next()}))?(b=t(function(t,n){l(t,b,e,"_c"),t._c=new y,void 0!=n&&c(n,v,t[w],t)}),p("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(e){var t="add"==e||"set"==e;e in C&&(!g||"clear"!=e)&&s(b.prototype,e,function(n,r){if(l(this,b,e),!t&&g&&!f(n))return"get"==e&&void 0;var i=this._c[e](0===n?0:n,r);return t?this:i})}),"size"in C&&h(b.prototype,"size",{get:function(){return this._c.size}})):(b=m.getConstructor(t,e,v,w),u(b.prototype,n),o.NEED=!0),d(b,e),k[e]=b,i(i.G+i.W+i.F,k),g||m.setStrong(b,e,v),b}},{"./_an-instance":158,"./_array-methods":162,"./_descriptors":174,"./_export":178,"./_fails":179,"./_for-of":180,"./_global":181,"./_hide":183,"./_is-object":189,"./_meta":198,"./_object-dp":201,"./_redefine-all":214,"./_set-to-string-tag":218}],170:[function(e,t,n){var r=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},{}],171:[function(e,t,n){"use strict";var r=e("./_object-dp"),i=e("./_property-desc");t.exports=function(e,t,n){t in e?r.f(e,t,i(0,n)):e[t]=n}},{"./_object-dp":201,"./_property-desc":213}],172:[function(e,t,n){var r=e("./_a-function");t.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},{"./_a-function":156}],173:[function(e,t,n){t.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},{}],174:[function(e,t,n){t.exports=!e("./_fails")(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},{"./_fails":179}],175:[function(e,t,n){var r=e("./_is-object"),i=e("./_global").document,o=r(i)&&r(i.createElement);t.exports=function(e){return o?i.createElement(e):{}}},{"./_global":181,"./_is-object":189}],176:[function(e,t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},{}],177:[function(e,t,n){var r=e("./_object-keys"),i=e("./_object-gops"),o=e("./_object-pie");t.exports=function(e){var t=r(e),n=i.f;if(n)for(var a,s=n(e),u=o.f,c=0;s.length>c;)u.call(e,a=s[c++])&&t.push(a);return t}},{"./_object-gops":206,"./_object-keys":209,"./_object-pie":210}],178:[function(e,t,n){var r=e("./_global"),i=e("./_core"),o=e("./_ctx"),a=e("./_hide"),s="prototype",u=function(e,t,n){var c,l,f,d=e&u.F,h=e&u.G,p=e&u.S,_=e&u.P,m=e&u.B,v=e&u.W,g=h?i:i[t]||(i[t]={}),y=g[s],b=h?r:p?r[t]:(r[t]||{})[s];h&&(n=t);for(c in n)l=!d&&b&&void 0!==b[c],l&&c in g||(f=l?b[c]:n[c],g[c]=h&&"function"!=typeof b[c]?n[c]:m&&l?o(f,r):v&&b[c]==f?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[s]=e[s],t}(f):_&&"function"==typeof f?o(Function.call,f):f,_&&((g.virtual||(g.virtual={}))[c]=f,e&u.R&&y&&!y[c]&&a(y,c,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},{"./_core":170,"./_ctx":172,"./_global":181,"./_hide":183}],179:[function(e,t,n){t.exports=function(e){try{return!!e()}catch(t){return!0}}},{}],180:[function(e,t,n){var r=e("./_ctx"),i=e("./_iter-call"),o=e("./_is-array-iter"),a=e("./_an-object"),s=e("./_to-length"),u=e("./core.get-iterator-method"),c={},l={},n=t.exports=function(e,t,n,f,d){var h,p,_,m,v=d?function(){return e}:u(e),g=r(n,f,t?2:1),y=0;if("function"!=typeof v)throw TypeError(e+" is not iterable!");if(o(v)){for(h=s(e.length);h>y;y++)if(m=t?g(a(p=e[y])[0],p[1]):g(e[y]),m===c||m===l)return m}else for(_=v.call(e);!(p=_.next()).done;)if(m=i(_,g,p.value,t),m===c||m===l)return m};n.BREAK=c,n.RETURN=l},{"./_an-object":159,"./_ctx":172,"./_is-array-iter":187,"./_iter-call":190,"./_to-length":225,"./core.get-iterator-method":232}],181:[function(e,t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},{}],182:[function(e,t,n){var r={}.hasOwnProperty;t.exports=function(e,t){return r.call(e,t)}},{}],183:[function(e,t,n){var r=e("./_object-dp"),i=e("./_property-desc");t.exports=e("./_descriptors")?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},{"./_descriptors":174,"./_object-dp":201,"./_property-desc":213}],184:[function(e,t,n){t.exports=e("./_global").document&&document.documentElement},{"./_global":181}],185:[function(e,t,n){t.exports=!e("./_descriptors")&&!e("./_fails")(function(){return 7!=Object.defineProperty(e("./_dom-create")("div"),"a",{get:function(){return 7}}).a})},{"./_descriptors":174,"./_dom-create":175,"./_fails":179}],186:[function(e,t,n){var r=e("./_cof");t.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},{"./_cof":166}],187:[function(e,t,n){var r=e("./_iterators"),i=e("./_wks")("iterator"),o=Array.prototype;t.exports=function(e){return void 0!==e&&(r.Array===e||o[i]===e)}},{"./_iterators":195,"./_wks":231}],188:[function(e,t,n){var r=e("./_cof");t.exports=Array.isArray||function(e){return"Array"==r(e)}},{"./_cof":166}],189:[function(e,t,n){t.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},{}],190:[function(e,t,n){var r=e("./_an-object");t.exports=function(e,t,n,i){try{return i?t(r(n)[0],n[1]):t(n)}catch(o){var a=e["return"];throw void 0!==a&&r(a.call(e)),o}}},{"./_an-object":159}],191:[function(e,t,n){"use strict";var r=e("./_object-create"),i=e("./_property-desc"),o=e("./_set-to-string-tag"),a={};e("./_hide")(a,e("./_wks")("iterator"),function(){return this}),t.exports=function(e,t,n){e.prototype=r(a,{next:i(1,n)}),o(e,t+" Iterator")}},{"./_hide":183,"./_object-create":200,"./_property-desc":213,"./_set-to-string-tag":218,"./_wks":231}],192:[function(e,t,n){"use strict";var r=e("./_library"),i=e("./_export"),o=e("./_redefine"),a=e("./_hide"),s=e("./_has"),u=e("./_iterators"),c=e("./_iter-create"),l=e("./_set-to-string-tag"),f=e("./_object-gpo"),d=e("./_wks")("iterator"),h=!([].keys&&"next"in[].keys()),p="@@iterator",_="keys",m="values",v=function(){return this};t.exports=function(e,t,n,g,y,b,w){c(n,t,g);var C,k,E,S=function(e){if(!h&&e in I)return I[e];switch(e){case _:return function(){return new n(this,e)};case m:return function(){return new n(this,e)}}return function(){return new n(this,e)}},T=t+" Iterator",j=y==m,A=!1,I=e.prototype,D=I[d]||I[p]||y&&I[y],P=D||S(y),R=y?j?S("entries"):P:void 0,M="Array"==t?I.entries||D:D;if(M&&(E=f(M.call(new e)),E!==Object.prototype&&(l(E,T,!0),r||s(E,d)||a(E,d,v))),j&&D&&D.name!==m&&(A=!0,P=function(){return D.call(this)}),r&&!w||!h&&!A&&I[d]||a(I,d,P),u[t]=P,u[T]=v,y)if(C={values:j?P:S(m),keys:b?P:S(_),entries:R},w)for(k in C)k in I||o(I,k,C[k]);else i(i.P+i.F*(h||A),t,C);return C}},{"./_export":178,"./_has":182,"./_hide":183,"./_iter-create":191,"./_iterators":195,"./_library":197,"./_object-gpo":207,"./_redefine":215,"./_set-to-string-tag":218,"./_wks":231}],193:[function(e,t,n){var r=e("./_wks")("iterator"),i=!1;try{var o=[7][r]();o["return"]=function(){i=!0},Array.from(o,function(){throw 2})}catch(a){}t.exports=function(e,t){if(!t&&!i)return!1;var n=!1;try{var o=[7],a=o[r]();a.next=function(){return{done:n=!0}},o[r]=function(){return a},e(o)}catch(s){}return n}},{"./_wks":231}],194:[function(e,t,n){t.exports=function(e,t){return{value:t,done:!!e}}},{}],195:[function(e,t,n){t.exports={}},{}],196:[function(e,t,n){var r=e("./_object-keys"),i=e("./_to-iobject");t.exports=function(e,t){for(var n,o=i(e),a=r(o),s=a.length,u=0;s>u;)if(o[n=a[u++]]===t)return n}},{"./_object-keys":209,"./_to-iobject":224}],197:[function(e,t,n){t.exports=!0},{}],198:[function(e,t,n){var r=e("./_uid")("meta"),i=e("./_is-object"),o=e("./_has"),a=e("./_object-dp").f,s=0,u=Object.isExtensible||function(){return!0},c=!e("./_fails")(function(){return u(Object.preventExtensions({}))}),l=function(e){a(e,r,{value:{i:"O"+ ++s,w:{}}})},f=function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!o(e,r)){if(!u(e))return"F";if(!t)return"E";l(e)}return e[r].i},d=function(e,t){if(!o(e,r)){if(!u(e))return!0;if(!t)return!1;l(e)}return e[r].w},h=function(e){return c&&p.NEED&&u(e)&&!o(e,r)&&l(e),e},p=t.exports={KEY:r,NEED:!1,fastKey:f,getWeak:d,onFreeze:h}},{"./_fails":179,"./_has":182,"./_is-object":189,"./_object-dp":201,"./_uid":228}],199:[function(e,t,n){"use strict";var r=e("./_object-keys"),i=e("./_object-gops"),o=e("./_object-pie"),a=e("./_to-object"),s=e("./_iobject"),u=Object.assign;t.exports=!u||e("./_fails")(function(){var e={},t={},n=Symbol(),r="abcdefghijklmnopqrst";return e[n]=7,r.split("").forEach(function(e){t[e]=e}),7!=u({},e)[n]||Object.keys(u({},t)).join("")!=r})?function(e,t){for(var n=a(e),u=arguments.length,c=1,l=i.f,f=o.f;u>c;)for(var d,h=s(arguments[c++]),p=l?r(h).concat(l(h)):r(h),_=p.length,m=0;_>m;)f.call(h,d=p[m++])&&(n[d]=h[d]);return n}:u},{"./_fails":179,"./_iobject":186,"./_object-gops":206,"./_object-keys":209,"./_object-pie":210,"./_to-object":226}],200:[function(e,t,n){var r=e("./_an-object"),i=e("./_object-dps"),o=e("./_enum-bug-keys"),a=e("./_shared-key")("IE_PROTO"),s=function(){},u="prototype",c=function(){var t,n=e("./_dom-create")("iframe"),r=o.length,i=">";for(n.style.display="none",e("./_html").appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+i),t.close(),c=t.F;r--;)delete c[u][o[r]];return c()};t.exports=Object.create||function(e,t){var n;return null!==e?(s[u]=r(e),n=new s,s[u]=null,n[a]=e):n=c(),void 0===t?n:i(n,t)}},{"./_an-object":159,"./_dom-create":175,"./_enum-bug-keys":176,"./_html":184,"./_object-dps":202,"./_shared-key":219}],201:[function(e,t,n){var r=e("./_an-object"),i=e("./_ie8-dom-define"),o=e("./_to-primitive"),a=Object.defineProperty;n.f=e("./_descriptors")?Object.defineProperty:function(e,t,n){if(r(e),t=o(t,!0),r(n),i)try{return a(e,t,n)}catch(s){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},{"./_an-object":159,"./_descriptors":174,"./_ie8-dom-define":185,"./_to-primitive":227}],202:[function(e,t,n){var r=e("./_object-dp"),i=e("./_an-object"),o=e("./_object-keys");t.exports=e("./_descriptors")?Object.defineProperties:function(e,t){i(e);for(var n,a=o(t),s=a.length,u=0;s>u;)r.f(e,n=a[u++],t[n]);return e}},{"./_an-object":159,"./_descriptors":174,"./_object-dp":201,"./_object-keys":209}],203:[function(e,t,n){var r=e("./_object-pie"),i=e("./_property-desc"),o=e("./_to-iobject"),a=e("./_to-primitive"),s=e("./_has"),u=e("./_ie8-dom-define"),c=Object.getOwnPropertyDescriptor;n.f=e("./_descriptors")?c:function(e,t){if(e=o(e),t=a(t,!0),u)try{return c(e,t)}catch(n){}return s(e,t)?i(!r.f.call(e,t),e[t]):void 0}},{"./_descriptors":174,"./_has":182,"./_ie8-dom-define":185,"./_object-pie":210,"./_property-desc":213,"./_to-iobject":224,"./_to-primitive":227}],204:[function(e,t,n){var r=e("./_to-iobject"),i=e("./_object-gopn").f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return i(e)}catch(t){return a.slice()}};t.exports.f=function(e){return a&&"[object Window]"==o.call(e)?s(e):i(r(e))}},{"./_object-gopn":205,"./_to-iobject":224}],205:[function(e,t,n){var r=e("./_object-keys-internal"),i=e("./_enum-bug-keys").concat("length","prototype");n.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},{"./_enum-bug-keys":176,"./_object-keys-internal":208}],206:[function(e,t,n){n.f=Object.getOwnPropertySymbols},{}],207:[function(e,t,n){var r=e("./_has"),i=e("./_to-object"),o=e("./_shared-key")("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(e){return e=i(e),r(e,o)?e[o]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?a:null}},{"./_has":182,"./_shared-key":219,"./_to-object":226}],208:[function(e,t,n){var r=e("./_has"),i=e("./_to-iobject"),o=e("./_array-includes")(!1),a=e("./_shared-key")("IE_PROTO");t.exports=function(e,t){var n,s=i(e),u=0,c=[];for(n in s)n!=a&&r(s,n)&&c.push(n);for(;t.length>u;)r(s,n=t[u++])&&(~o(c,n)||c.push(n));return c}},{"./_array-includes":161,"./_has":182,"./_shared-key":219,"./_to-iobject":224}],209:[function(e,t,n){var r=e("./_object-keys-internal"),i=e("./_enum-bug-keys");t.exports=Object.keys||function(e){return r(e,i)}},{"./_enum-bug-keys":176,"./_object-keys-internal":208}],210:[function(e,t,n){n.f={}.propertyIsEnumerable},{}],211:[function(e,t,n){var r=e("./_export"),i=e("./_core"),o=e("./_fails");t.exports=function(e,t){var n=(i.Object||{})[e]||Object[e],a={};a[e]=t(n),r(r.S+r.F*o(function(){n(1)}),"Object",a)}},{"./_core":170,"./_export":178,"./_fails":179}],212:[function(e,t,n){var r=e("./_object-keys"),i=e("./_to-iobject"),o=e("./_object-pie").f;t.exports=function(e){return function(t){for(var n,a=i(t),s=r(a),u=s.length,c=0,l=[];u>c;)o.call(a,n=s[c++])&&l.push(e?[n,a[n]]:a[n]);return l}}},{"./_object-keys":209,"./_object-pie":210,"./_to-iobject":224}],213:[function(e,t,n){t.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},{}],214:[function(e,t,n){var r=e("./_hide");t.exports=function(e,t,n){for(var i in t)n&&e[i]?e[i]=t[i]:r(e,i,t[i]);return e}},{"./_hide":183}],215:[function(e,t,n){t.exports=e("./_hide")},{"./_hide":183}],216:[function(e,t,n){var r=e("./_is-object"),i=e("./_an-object"),o=function(e,t){if(i(e),!r(t)&&null!==t)throw TypeError(t+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,r){try{r=e("./_ctx")(Function.call,e("./_object-gopd").f(Object.prototype,"__proto__").set,2),r(t,[]),n=!(t instanceof Array)}catch(i){n=!0}return function(e,t){return o(e,t),n?e.__proto__=t:r(e,t),e}}({},!1):void 0),check:o}},{"./_an-object":159,"./_ctx":172,"./_is-object":189,"./_object-gopd":203}],217:[function(e,t,n){"use strict";var r=e("./_global"),i=e("./_core"),o=e("./_object-dp"),a=e("./_descriptors"),s=e("./_wks")("species");t.exports=function(e){var t="function"==typeof i[e]?i[e]:r[e];a&&t&&!t[s]&&o.f(t,s,{configurable:!0,get:function(){return this}})}},{"./_core":170,"./_descriptors":174,"./_global":181,"./_object-dp":201,"./_wks":231}],218:[function(e,t,n){var r=e("./_object-dp").f,i=e("./_has"),o=e("./_wks")("toStringTag");t.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,o)&&r(e,o,{configurable:!0,value:t})}},{"./_has":182,"./_object-dp":201,"./_wks":231}],219:[function(e,t,n){var r=e("./_shared")("keys"),i=e("./_uid");t.exports=function(e){return r[e]||(r[e]=i(e))}},{"./_shared":220,"./_uid":228}],220:[function(e,t,n){var r=e("./_global"),i="__core-js_shared__",o=r[i]||(r[i]={});t.exports=function(e){return o[e]||(o[e]={})}},{"./_global":181}],221:[function(e,t,n){var r=e("./_to-integer"),i=e("./_defined");t.exports=function(e){return function(t,n){var o,a,s=String(i(t)),u=r(n),c=s.length;return 0>u||u>=c?e?"":void 0:(o=s.charCodeAt(u),55296>o||o>56319||u+1===c||(a=s.charCodeAt(u+1))<56320||a>57343?e?s.charAt(u):o:e?s.slice(u,u+2):(o-55296<<10)+(a-56320)+65536)}}},{"./_defined":173,"./_to-integer":223}],222:[function(e,t,n){var r=e("./_to-integer"),i=Math.max,o=Math.min;t.exports=function(e,t){return e=r(e),0>e?i(e+t,0):o(e,t)}},{"./_to-integer":223}],223:[function(e,t,n){var r=Math.ceil,i=Math.floor;t.exports=function(e){return isNaN(e=+e)?0:(e>0?i:r)(e)}},{}],224:[function(e,t,n){var r=e("./_iobject"),i=e("./_defined");t.exports=function(e){return r(i(e))}},{"./_defined":173,"./_iobject":186}],225:[function(e,t,n){var r=e("./_to-integer"),i=Math.min;t.exports=function(e){return e>0?i(r(e),9007199254740991):0}},{"./_to-integer":223}],226:[function(e,t,n){var r=e("./_defined");t.exports=function(e){return Object(r(e))}},{"./_defined":173}],227:[function(e,t,n){var r=e("./_is-object");t.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},{"./_is-object":189}],228:[function(e,t,n){var r=0,i=Math.random();t.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++r+i).toString(36))}},{}],229:[function(e,t,n){var r=e("./_global"),i=e("./_core"),o=e("./_library"),a=e("./_wks-ext"),s=e("./_object-dp").f;t.exports=function(e){var t=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:a.f(e)})}},{"./_core":170,"./_global":181,"./_library":197,"./_object-dp":201,"./_wks-ext":230}],230:[function(e,t,n){n.f=e("./_wks")},{"./_wks":231}],231:[function(e,t,n){var r=e("./_shared")("wks"),i=e("./_uid"),o=e("./_global").Symbol,a="function"==typeof o,s=t.exports=function(e){return r[e]||(r[e]=a&&o[e]||(a?o:i)("Symbol."+e))};s.store=r},{"./_global":181,"./_shared":220,"./_uid":228}],232:[function(e,t,n){var r=e("./_classof"),i=e("./_wks")("iterator"),o=e("./_iterators");t.exports=e("./_core").getIteratorMethod=function(e){return void 0!=e?e[i]||e["@@iterator"]||o[r(e)]:void 0}},{"./_classof":165,"./_core":170,"./_iterators":195,"./_wks":231}],233:[function(e,t,n){var r=e("./_an-object"),i=e("./core.get-iterator-method");t.exports=e("./_core").getIterator=function(e){var t=i(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return r(t.call(e))}},{"./_an-object":159,"./_core":170,"./core.get-iterator-method":232}],234:[function(e,t,n){var r=e("./_classof"),i=e("./_wks")("iterator"),o=e("./_iterators");t.exports=e("./_core").isIterable=function(e){var t=Object(e);return void 0!==t[i]||"@@iterator"in t||o.hasOwnProperty(r(t))}},{"./_classof":165,"./_core":170,"./_iterators":195,"./_wks":231}],235:[function(e,t,n){"use strict";var r=e("./_ctx"),i=e("./_export"),o=e("./_to-object"),a=e("./_iter-call"),s=e("./_is-array-iter"),u=e("./_to-length"),c=e("./_create-property"),l=e("./core.get-iterator-method");i(i.S+i.F*!e("./_iter-detect")(function(e){Array.from(e)}),"Array",{from:function(e){var t,n,i,f,d=o(e),h="function"==typeof this?this:Array,p=arguments.length,_=p>1?arguments[1]:void 0,m=void 0!==_,v=0,g=l(d);if(m&&(_=r(_,p>2?arguments[2]:void 0,2)),void 0==g||h==Array&&s(g))for(t=u(d.length),n=new h(t);t>v;v++)c(n,v,m?_(d[v],v):d[v]);else for(f=g.call(d),n=new h;!(i=f.next()).done;v++)c(n,v,m?a(f,_,[i.value,v],!0):i.value);return n.length=v,n}})},{"./_create-property":171,"./_ctx":172,"./_export":178,"./_is-array-iter":187,"./_iter-call":190,"./_iter-detect":193,"./_to-length":225,"./_to-object":226,"./core.get-iterator-method":232}],236:[function(e,t,n){"use strict";var r=e("./_add-to-unscopables"),i=e("./_iter-step"),o=e("./_iterators"),a=e("./_to-iobject");t.exports=e("./_iter-define")(Array,"Array",function(e,t){this._t=a(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,i(1)):"keys"==t?i(0,n):"values"==t?i(0,e[n]):i(0,[n,e[n]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},{"./_add-to-unscopables":157,"./_iter-define":192,"./_iter-step":194,"./_iterators":195,"./_to-iobject":224}],237:[function(e,t,n){"use strict";var r=e("./_collection-strong");t.exports=e("./_collection")("Map",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{get:function(e){var t=r.getEntry(this,e);return t&&t.v},set:function(e,t){return r.def(this,0===e?0:e,t)}},r,!0)},{"./_collection":169,"./_collection-strong":167}],238:[function(e,t,n){var r=e("./_export");r(r.S+r.F,"Object",{assign:e("./_object-assign")})},{"./_export":178,"./_object-assign":199}],239:[function(e,t,n){var r=e("./_export");r(r.S,"Object",{create:e("./_object-create")})},{"./_export":178,"./_object-create":200}],240:[function(e,t,n){var r=e("./_export");r(r.S+r.F*!e("./_descriptors"),"Object",{defineProperties:e("./_object-dps")})},{"./_descriptors":174,"./_export":178,"./_object-dps":202}],241:[function(e,t,n){var r=e("./_export");r(r.S+r.F*!e("./_descriptors"),"Object",{defineProperty:e("./_object-dp").f})},{"./_descriptors":174,"./_export":178,"./_object-dp":201}],242:[function(e,t,n){var r=e("./_is-object"),i=e("./_meta").onFreeze;e("./_object-sap")("freeze",function(e){return function(t){return e&&r(t)?e(i(t)):t}})},{"./_is-object":189,"./_meta":198,"./_object-sap":211}],243:[function(e,t,n){e("./_object-sap")("getOwnPropertyNames",function(){return e("./_object-gopn-ext").f})},{"./_object-gopn-ext":204,"./_object-sap":211}],244:[function(e,t,n){var r=e("./_to-object"),i=e("./_object-gpo");e("./_object-sap")("getPrototypeOf",function(){return function(e){return i(r(e))}})},{"./_object-gpo":207,"./_object-sap":211,"./_to-object":226}],245:[function(e,t,n){var r=e("./_is-object");e("./_object-sap")("isFrozen",function(e){return function(t){return!r(t)||!!e&&e(t)}})},{"./_is-object":189,"./_object-sap":211}],246:[function(e,t,n){var r=e("./_to-object"),i=e("./_object-keys");e("./_object-sap")("keys",function(){return function(e){return i(r(e))}})},{"./_object-keys":209,"./_object-sap":211,"./_to-object":226}],247:[function(e,t,n){var r=e("./_is-object"),i=e("./_meta").onFreeze;e("./_object-sap")("seal",function(e){return function(t){return e&&r(t)?e(i(t)):t}})},{"./_is-object":189,"./_meta":198,"./_object-sap":211}],248:[function(e,t,n){var r=e("./_export");r(r.S,"Object",{setPrototypeOf:e("./_set-proto").set})},{"./_export":178,"./_set-proto":216}],249:[function(e,t,n){},{}],250:[function(e,t,n){"use strict";var r=e("./_string-at")(!0);e("./_iter-define")(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},{"./_iter-define":192,"./_string-at":221}],251:[function(e,t,n){"use strict";var r=e("./_global"),i=e("./_has"),o=e("./_descriptors"),a=e("./_export"),s=e("./_redefine"),u=e("./_meta").KEY,c=e("./_fails"),l=e("./_shared"),f=e("./_set-to-string-tag"),d=e("./_uid"),h=e("./_wks"),p=e("./_wks-ext"),_=e("./_wks-define"),m=e("./_keyof"),v=e("./_enum-keys"),g=e("./_is-array"),y=e("./_an-object"),b=e("./_to-iobject"),w=e("./_to-primitive"),C=e("./_property-desc"),k=e("./_object-create"),E=e("./_object-gopn-ext"),S=e("./_object-gopd"),T=e("./_object-dp"),j=e("./_object-keys"),A=S.f,I=T.f,D=E.f,P=r.Symbol,R=r.JSON,M=R&&R.stringify,x="prototype",O=h("_hidden"),N=h("toPrimitive"),L={}.propertyIsEnumerable,U=l("symbol-registry"),B=l("symbols"),F=l("op-symbols"),H=Object[x],q="function"==typeof P,G=r.QObject,V=!G||!G[x]||!G[x].findChild,z=o&&c(function(){return 7!=k(I({},"a",{get:function(){return I(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=A(H,t);r&&delete H[t],I(e,t,n),r&&e!==H&&I(H,t,r)}:I,K=function(e){var t=B[e]=k(P[x]);return t._k=e,t},Y=q&&"symbol"==typeof P.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof P},W=function(e,t,n){return e===H&&W(F,t,n),y(e),t=w(t,!0),y(n),i(B,t)?(n.enumerable?(i(e,O)&&e[O][t]&&(e[O][t]=!1),n=k(n,{enumerable:C(0,!1)})):(i(e,O)||I(e,O,C(1,{})),e[O][t]=!0),z(e,t,n)):I(e,t,n)},X=function(e,t){y(e);for(var n,r=v(t=b(t)),i=0,o=r.length;o>i;)W(e,n=r[i++],t[n]);return e},Z=function(e,t){return void 0===t?k(e):X(k(e),t)},J=function(e){var t=L.call(this,e=w(e,!0));return!(this===H&&i(B,e)&&!i(F,e))&&(!(t||!i(this,e)||!i(B,e)||i(this,O)&&this[O][e])||t)},Q=function(e,t){if(e=b(e),t=w(t,!0),e!==H||!i(B,t)||i(F,t)){var n=A(e,t);return!n||!i(B,t)||i(e,O)&&e[O][t]||(n.enumerable=!0),n}},$=function(e){for(var t,n=D(b(e)),r=[],o=0;n.length>o;)i(B,t=n[o++])||t==O||t==u||r.push(t);return r},ee=function(e){for(var t,n=e===H,r=D(n?F:b(e)),o=[],a=0;r.length>a;)i(B,t=r[a++])&&(!n||i(H,t))&&o.push(B[t]);return o};q||(P=function(){if(this instanceof P)throw TypeError("Symbol is not a constructor!");var e=d(arguments.length>0?arguments[0]:void 0),t=function(n){this===H&&t.call(F,n),i(this,O)&&i(this[O],e)&&(this[O][e]=!1),z(this,e,C(1,n))};return o&&V&&z(H,e,{configurable:!0,set:t}),K(e)},s(P[x],"toString",function(){return this._k}),S.f=Q,T.f=W,e("./_object-gopn").f=E.f=$,e("./_object-pie").f=J,e("./_object-gops").f=ee,o&&!e("./_library")&&s(H,"propertyIsEnumerable",J,!0),p.f=function(e){return K(h(e))}),a(a.G+a.W+a.F*!q,{Symbol:P});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)h(te[ne++]);for(var te=j(h.store),ne=0;te.length>ne;)_(te[ne++]);a(a.S+a.F*!q,"Symbol",{"for":function(e){return i(U,e+="")?U[e]:U[e]=P(e)},keyFor:function(e){if(Y(e))return m(U,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){V=!0},useSimple:function(){V=!1}}),a(a.S+a.F*!q,"Object",{create:Z,defineProperty:W,defineProperties:X,getOwnPropertyDescriptor:Q,getOwnPropertyNames:$,getOwnPropertySymbols:ee}),R&&a(a.S+a.F*(!q||c(function(){var e=P();return"[null]"!=M([e])||"{}"!=M({a:e})||"{}"!=M(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!Y(e)){for(var t,n,r=[e],i=1;arguments.length>i;)r.push(arguments[i++]);return t=r[1],"function"==typeof t&&(n=t),!n&&g(t)||(t=function(e,t){return n&&(t=n.call(this,e,t)),Y(t)?void 0:t}),r[1]=t,M.apply(R,r)}}}),P[x][N]||e("./_hide")(P[x],N,P[x].valueOf),f(P,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},{"./_an-object":159,"./_descriptors":174,"./_enum-keys":177,"./_export":178,"./_fails":179,"./_global":181,"./_has":182,"./_hide":183,"./_is-array":188,"./_keyof":196,"./_library":197,"./_meta":198,
"./_object-create":200,"./_object-dp":201,"./_object-gopd":203,"./_object-gopn":205,"./_object-gopn-ext":204,"./_object-gops":206,"./_object-keys":209,"./_object-pie":210,"./_property-desc":213,"./_redefine":215,"./_set-to-string-tag":218,"./_shared":220,"./_to-iobject":224,"./_to-primitive":227,"./_uid":228,"./_wks":231,"./_wks-define":229,"./_wks-ext":230}],252:[function(e,t,n){var r=e("./_export");r(r.P+r.R,"Map",{toJSON:e("./_collection-to-json")("Map")})},{"./_collection-to-json":168,"./_export":178}],253:[function(e,t,n){var r=e("./_export"),i=e("./_object-to-array")(!1);r(r.S,"Object",{values:function(e){return i(e)}})},{"./_export":178,"./_object-to-array":212}],254:[function(e,t,n){e("./_wks-define")("asyncIterator")},{"./_wks-define":229}],255:[function(e,t,n){e("./_wks-define")("observable")},{"./_wks-define":229}],256:[function(e,t,n){e("./es6.array.iterator");for(var r=e("./_global"),i=e("./_hide"),o=e("./_iterators"),a=e("./_wks")("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],u=0;5>u;u++){var c=s[u],l=r[c],f=l&&l.prototype;f&&!f[a]&&i(f,a,c),o[c]=o.Array}},{"./_global":181,"./_hide":183,"./_iterators":195,"./_wks":231,"./es6.array.iterator":236}],257:[function(e,t,n){"use strict";function r(e,t,n){this.fn=e,this.context=t,this.once=n||!1}function i(){}i.prototype._events=void 0,i.prototype.listeners=function(e){if(!this._events||!this._events[e])return[];if(this._events[e].fn)return[this._events[e].fn];for(var t=0,n=this._events[e].length,r=new Array(n);n>t;t++)r[t]=this._events[e][t].fn;return r},i.prototype.emit=function(e,t,n,r,i,o){if(!this._events||!this._events[e])return!1;var a,s,u=this._events[e],c=arguments.length;if("function"==typeof u.fn){switch(u.once&&this.removeListener(e,u.fn,!0),c){case 1:return u.fn.call(u.context),!0;case 2:return u.fn.call(u.context,t),!0;case 3:return u.fn.call(u.context,t,n),!0;case 4:return u.fn.call(u.context,t,n,r),!0;case 5:return u.fn.call(u.context,t,n,r,i),!0;case 6:return u.fn.call(u.context,t,n,r,i,o),!0}for(s=1,a=new Array(c-1);c>s;s++)a[s-1]=arguments[s];u.fn.apply(u.context,a)}else{var l,f=u.length;for(s=0;f>s;s++)switch(u[s].once&&this.removeListener(e,u[s].fn,!0),c){case 1:u[s].fn.call(u[s].context);break;case 2:u[s].fn.call(u[s].context,t);break;case 3:u[s].fn.call(u[s].context,t,n);break;default:if(!a)for(l=1,a=new Array(c-1);c>l;l++)a[l-1]=arguments[l];u[s].fn.apply(u[s].context,a)}}return!0},i.prototype.on=function(e,t,n){var i=new r(t,n||this);return this._events||(this._events={}),this._events[e]?this._events[e].fn?this._events[e]=[this._events[e],i]:this._events[e].push(i):this._events[e]=i,this},i.prototype.once=function(e,t,n){var i=new r(t,n||this,(!0));return this._events||(this._events={}),this._events[e]?this._events[e].fn?this._events[e]=[this._events[e],i]:this._events[e].push(i):this._events[e]=i,this},i.prototype.removeListener=function(e,t,n){if(!this._events||!this._events[e])return this;var r=this._events[e],i=[];if(t&&(r.fn&&(r.fn!==t||n&&!r.once)&&i.push(r),!r.fn))for(var o=0,a=r.length;a>o;o++)(r[o].fn!==t||n&&!r[o].once)&&i.push(r[o]);return i.length?this._events[e]=1===i.length?i[0]:i:delete this._events[e],this},i.prototype.removeAllListeners=function(e){return this._events?(e?delete this._events[e]:this._events={},this):this},i.prototype.off=i.prototype.removeListener,i.prototype.addListener=i.prototype.on,i.prototype.setMaxListeners=function(){return this},i.EventEmitter=i,i.EventEmitter2=i,i.EventEmitter3=i,t.exports=i},{}],258:[function(e,t,n){t.exports=function(){return this}()},{}],259:[function(e,t,n){var r=[].indexOf;t.exports=function(e,t){if(r)return e.indexOf(t);for(var n=0;n<e.length;++n)if(e[n]===t)return n;return-1}},{}],260:[function(e,t,n){t.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}},{}],261:[function(t,n,r){!function(t){function n(e){if(n[e]!==a)return n[e];var t;if("bug-string-char-index"==e)t="a"!="a"[0];else if("json"==e)t=n("json-stringify")&&n("json-parse");else{var r,i='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';if("json-stringify"==e){var o=l.stringify,u="function"==typeof o&&f;if(u){(r=function(){return 1}).toJSON=r;try{u="0"===o(0)&&"0"===o(new Number)&&'""'==o(new String)&&o(s)===a&&o(a)===a&&o()===a&&"1"===o(r)&&"[1]"==o([r])&&"[null]"==o([a])&&"null"==o(null)&&"[null,null,null]"==o([a,s,null])&&o({a:[r,!0,!1,null,"\0\b\n\f\r\t"]})==i&&"1"===o(null,r)&&"[\n 1,\n 2\n]"==o([1,2],null,1)&&'"-271821-04-20T00:00:00.000Z"'==o(new Date((-864e13)))&&'"+275760-09-13T00:00:00.000Z"'==o(new Date(864e13))&&'"-000001-01-01T00:00:00.000Z"'==o(new Date((-621987552e5)))&&'"1969-12-31T23:59:59.999Z"'==o(new Date((-1)))}catch(c){u=!1}}t=u}if("json-parse"==e){var d=l.parse;if("function"==typeof d)try{if(0===d("0")&&!d(!1)){r=d(i);var h=5==r.a.length&&1===r.a[0];if(h){try{h=!d('"\t"')}catch(c){}if(h)try{h=1!==d("01")}catch(c){}if(h)try{h=1!==d("1.")}catch(c){}}}}catch(c){h=!1}t=h}}return n[e]=!!t}var i,o,a,s={}.toString,u="function"==typeof e&&e.amd,c="object"==typeof JSON&&JSON,l="object"==typeof r&&r&&!r.nodeType&&r;l&&c?(l.stringify=c.stringify,l.parse=c.parse):l=t.JSON=c||{};var f=new Date((-0xc782b5b800cec));try{f=-109252==f.getUTCFullYear()&&0===f.getUTCMonth()&&1===f.getUTCDate()&&10==f.getUTCHours()&&37==f.getUTCMinutes()&&6==f.getUTCSeconds()&&708==f.getUTCMilliseconds()}catch(d){}if(!n("json")){var h="[object Function]",p="[object Date]",_="[object Number]",m="[object String]",v="[object Array]",g="[object Boolean]",y=n("bug-string-char-index");if(!f)var b=Math.floor,w=[0,31,59,90,120,151,181,212,243,273,304,334],C=function(e,t){return w[t]+365*(e-1970)+b((e-1969+(t=+(t>1)))/4)-b((e-1901+t)/100)+b((e-1601+t)/400)};(i={}.hasOwnProperty)||(i=function(e){var t,n={};return(n.__proto__=null,n.__proto__={toString:1},n).toString!=s?i=function(e){var t=this.__proto__,n=e in(this.__proto__=null,this);return this.__proto__=t,n}:(t=n.constructor,i=function(e){var n=(this.constructor||t).prototype;return e in this&&!(e in n&&this[e]===n[e])}),n=null,i.call(this,e)});var k={"boolean":1,number:1,string:1,undefined:1},E=function(e,t){var n=typeof e[t];return"object"==n?!!e[t]:!k[n]};if(o=function(e,t){var n,r,a,u=0;(n=function(){this.valueOf=0}).prototype.valueOf=0,r=new n;for(a in r)i.call(r,a)&&u++;return n=r=null,u?o=2==u?function(e,t){var n,r={},o=s.call(e)==h;for(n in e)o&&"prototype"==n||i.call(r,n)||!(r[n]=1)||!i.call(e,n)||t(n)}:function(e,t){var n,r,o=s.call(e)==h;for(n in e)o&&"prototype"==n||!i.call(e,n)||(r="constructor"===n)||t(n);(r||i.call(e,n="constructor"))&&t(n)}:(r=["valueOf","toString","toLocaleString","propertyIsEnumerable","isPrototypeOf","hasOwnProperty","constructor"],o=function(e,t){var n,o,a=s.call(e)==h,u=!a&&"function"!=typeof e.constructor&&E(e,"hasOwnProperty")?e.hasOwnProperty:i;for(n in e)a&&"prototype"==n||!u.call(e,n)||t(n);for(o=r.length;n=r[--o];u.call(e,n)&&t(n));}),o(e,t)},!n("json-stringify")){var S={92:"\\\\",34:'\\"',8:"\\b",12:"\\f",10:"\\n",13:"\\r",9:"\\t"},T="000000",j=function(e,t){return(T+(t||0)).slice(-e)},A="\\u00",I=function(e){var t,n='"',r=0,i=e.length,o=i>10&&y;for(o&&(t=e.split(""));i>r;r++){var a=e.charCodeAt(r);switch(a){case 8:case 9:case 10:case 12:case 13:case 34:case 92:n+=S[a];break;default:if(32>a){n+=A+j(2,a.toString(16));break}n+=o?t[r]:y?e.charAt(r):e[r]}}return n+'"'},D=function(e,t,n,r,u,c,l){var f,d,h,y,w,k,E,S,T,A,P,R,M,x,O,N;try{f=t[e]}catch(L){}if("object"==typeof f&&f)if(d=s.call(f),d!=p||i.call(f,"toJSON"))"function"==typeof f.toJSON&&(d!=_&&d!=m&&d!=v||i.call(f,"toJSON"))&&(f=f.toJSON(e));else if(f>-1/0&&1/0>f){if(C){for(w=b(f/864e5),h=b(w/365.2425)+1970-1;C(h+1,0)<=w;h++);for(y=b((w-C(h,0))/30.42);C(h,y+1)<=w;y++);w=1+w-C(h,y),k=(f%864e5+864e5)%864e5,E=b(k/36e5)%24,S=b(k/6e4)%60,T=b(k/1e3)%60,A=k%1e3}else h=f.getUTCFullYear(),y=f.getUTCMonth(),w=f.getUTCDate(),E=f.getUTCHours(),S=f.getUTCMinutes(),T=f.getUTCSeconds(),A=f.getUTCMilliseconds();f=(0>=h||h>=1e4?(0>h?"-":"+")+j(6,0>h?-h:h):j(4,h))+"-"+j(2,y+1)+"-"+j(2,w)+"T"+j(2,E)+":"+j(2,S)+":"+j(2,T)+"."+j(3,A)+"Z"}else f=null;if(n&&(f=n.call(t,e,f)),null===f)return"null";if(d=s.call(f),d==g)return""+f;if(d==_)return f>-1/0&&1/0>f?""+f:"null";if(d==m)return I(""+f);if("object"==typeof f){for(x=l.length;x--;)if(l[x]===f)throw TypeError();if(l.push(f),P=[],O=c,c+=u,d==v){for(M=0,x=f.length;x>M;M++)R=D(M,f,n,r,u,c,l),P.push(R===a?"null":R);N=P.length?u?"[\n"+c+P.join(",\n"+c)+"\n"+O+"]":"["+P.join(",")+"]":"[]"}else o(r||f,function(e){var t=D(e,f,n,r,u,c,l);t!==a&&P.push(I(e)+":"+(u?" ":"")+t)}),N=P.length?u?"{\n"+c+P.join(",\n"+c)+"\n"+O+"}":"{"+P.join(",")+"}":"{}";return l.pop(),N}};l.stringify=function(e,t,n){var r,i,o,a;if("function"==typeof t||"object"==typeof t&&t)if((a=s.call(t))==h)i=t;else if(a==v){o={};for(var u,c=0,l=t.length;l>c;u=t[c++],a=s.call(u),(a==m||a==_)&&(o[u]=1));}if(n)if((a=s.call(n))==_){if((n-=n%1)>0)for(r="",n>10&&(n=10);r.length<n;r+=" ");}else a==m&&(r=n.length<=10?n:n.slice(0,10));return D("",(u={},u[""]=e,u),i,o,r,"",[])}}if(!n("json-parse")){var P,R,M=String.fromCharCode,x={92:"\\",34:'"',47:"/",98:"\b",116:"\t",110:"\n",102:"\f",114:"\r"},O=function(){throw P=R=null,SyntaxError()},N=function(){for(var e,t,n,r,i,o=R,a=o.length;a>P;)switch(i=o.charCodeAt(P)){case 9:case 10:case 13:case 32:P++;break;case 123:case 125:case 91:case 93:case 58:case 44:return e=y?o.charAt(P):o[P],P++,e;case 34:for(e="@",P++;a>P;)if(i=o.charCodeAt(P),32>i)O();else if(92==i)switch(i=o.charCodeAt(++P)){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:e+=x[i],P++;break;case 117:for(t=++P,n=P+4;n>P;P++)i=o.charCodeAt(P),i>=48&&57>=i||i>=97&&102>=i||i>=65&&70>=i||O();e+=M("0x"+o.slice(t,P));break;default:O()}else{if(34==i)break;for(i=o.charCodeAt(P),t=P;i>=32&&92!=i&&34!=i;)i=o.charCodeAt(++P);e+=o.slice(t,P)}if(34==o.charCodeAt(P))return P++,e;O();default:if(t=P,45==i&&(r=!0,i=o.charCodeAt(++P)),i>=48&&57>=i){for(48==i&&(i=o.charCodeAt(P+1),i>=48&&57>=i)&&O(),r=!1;a>P&&(i=o.charCodeAt(P),i>=48&&57>=i);P++);if(46==o.charCodeAt(P)){for(n=++P;a>n&&(i=o.charCodeAt(n),i>=48&&57>=i);n++);n==P&&O(),P=n}if(i=o.charCodeAt(P),101==i||69==i){for(i=o.charCodeAt(++P),43!=i&&45!=i||P++,n=P;a>n&&(i=o.charCodeAt(n),i>=48&&57>=i);n++);n==P&&O(),P=n}return+o.slice(t,P)}if(r&&O(),"true"==o.slice(P,P+4))return P+=4,!0;if("false"==o.slice(P,P+5))return P+=5,!1;if("null"==o.slice(P,P+4))return P+=4,null;O()}return"$"},L=function(e){var t,n;if("$"==e&&O(),"string"==typeof e){if("@"==(y?e.charAt(0):e[0]))return e.slice(1);if("["==e){for(t=[];e=N(),"]"!=e;n||(n=!0))n&&(","==e?(e=N(),"]"==e&&O()):O()),","==e&&O(),t.push(L(e));return t}if("{"==e){for(t={};e=N(),"}"!=e;n||(n=!0))n&&(","==e?(e=N(),"}"==e&&O()):O()),","!=e&&"string"==typeof e&&"@"==(y?e.charAt(0):e[0])&&":"==N()||O(),t[e.slice(1)]=L(N());return t}O()}return e},U=function(e,t,n){var r=B(e,t,n);r===a?delete e[t]:e[t]=r},B=function(e,t,n){var r,i=e[t];if("object"==typeof i&&i)if(s.call(i)==v)for(r=i.length;r--;)U(i,r,n);else o(i,function(e){U(i,e,n)});return n.call(e,t,i)};l.parse=function(e,t){var n,r;return P=0,R=""+e,n=L(N()),"$"!=N()&&O(),P=R=null,t&&s.call(t)==h?B((r={},r[""]=n,r),"",t):n}}}u&&e(function(){return l})}(this)},{}],262:[function(e,t,n){var r=Object.prototype.hasOwnProperty;n.keys=Object.keys||function(e){var t=[];for(var n in e)r.call(e,n)&&t.push(n);return t},n.values=function(e){var t=[];for(var n in e)r.call(e,n)&&t.push(e[n]);return t},n.merge=function(e,t){for(var n in t)r.call(t,n)&&(e[n]=t[n]);return e},n.length=function(e){return n.keys(e).length},n.isEmpty=function(e){return 0==n.length(e)}},{}],263:[function(e,t,n){(function(e){var n=/^[\],:{}\s]*$/,r=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,i=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,o=/(?:^|:|,)(?:\s*\[)+/g,a=/^\s+/,s=/\s+$/;t.exports=function(t){return"string"==typeof t&&t?(t=t.replace(a,"").replace(s,""),e.JSON&&JSON.parse?JSON.parse(t):n.test(t.replace(r,"@").replace(i,"]").replace(o,""))?new Function("return "+t)():void 0):null}}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],264:[function(e,t,n){n.encode=function(e){var t="";for(var n in e)e.hasOwnProperty(n)&&(t.length&&(t+="&"),t+=encodeURIComponent(n)+"="+encodeURIComponent(e[n]));return t},n.decode=function(e){for(var t={},n=e.split("&"),r=0,i=n.length;i>r;r++){var o=n[r].split("=");t[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return t}},{}],265:[function(t,n,r){(function(t){!function(i){function o(e){throw RangeError(x[e])}function a(e,t){for(var n=e.length,r=[];n--;)r[n]=t(e[n]);return r}function s(e,t){var n=e.split("@"),r="";n.length>1&&(r=n[0]+"@",e=n[1]),e=e.replace(M,".");var i=e.split("."),o=a(i,t).join(".");return r+o}function u(e){for(var t,n,r=[],i=0,o=e.length;o>i;)t=e.charCodeAt(i++),t>=55296&&56319>=t&&o>i?(n=e.charCodeAt(i++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),i--)):r.push(t);return r}function c(e){return a(e,function(e){var t="";return e>65535&&(e-=65536,t+=L(e>>>10&1023|55296),e=56320|1023&e),t+=L(e)}).join("")}function l(e){return 10>e-48?e-22:26>e-65?e-65:26>e-97?e-97:k}function f(e,t){return e+22+75*(26>e)-((0!=t)<<5)}function d(e,t,n){var r=0;for(e=n?N(e/j):e>>1,e+=N(e/t);e>O*S>>1;r+=k)e=N(e/O);return N(r+(O+1)*e/(e+T))}function h(e){var t,n,r,i,a,s,u,f,h,p,_=[],m=e.length,v=0,g=I,y=A;for(n=e.lastIndexOf(D),0>n&&(n=0),r=0;n>r;++r)e.charCodeAt(r)>=128&&o("not-basic"),_.push(e.charCodeAt(r));for(i=n>0?n+1:0;m>i;){for(a=v,s=1,u=k;i>=m&&o("invalid-input"),f=l(e.charCodeAt(i++)),(f>=k||f>N((C-v)/s))&&o("overflow"),v+=f*s,h=y>=u?E:u>=y+S?S:u-y,!(h>f);u+=k)p=k-h,s>N(C/p)&&o("overflow"),s*=p;t=_.length+1,y=d(v-a,t,0==a),N(v/t)>C-g&&o("overflow"),g+=N(v/t),v%=t,_.splice(v++,0,g)}return c(_)}function p(e){var t,n,r,i,a,s,c,l,h,p,_,m,v,g,y,b=[];for(e=u(e),m=e.length,t=I,n=0,a=A,s=0;m>s;++s)_=e[s],128>_&&b.push(L(_));for(r=i=b.length,i&&b.push(D);m>r;){for(c=C,s=0;m>s;++s)_=e[s],_>=t&&c>_&&(c=_);for(v=r+1,c-t>N((C-n)/v)&&o("overflow"),n+=(c-t)*v,t=c,s=0;m>s;++s)if(_=e[s],t>_&&++n>C&&o("overflow"),_==t){for(l=n,h=k;p=a>=h?E:h>=a+S?S:h-a,!(p>l);h+=k)y=l-p,g=k-p,b.push(L(f(p+y%g,0))),l=N(y/g);b.push(L(f(l,0))),a=d(n,v,r==i),n=0,++r}++n,++t}return b.join("")}function _(e){return s(e,function(e){return P.test(e)?h(e.slice(4).toLowerCase()):e})}function m(e){return s(e,function(e){return R.test(e)?"xn--"+p(e):e})}var v="object"==typeof r&&r&&!r.nodeType&&r,g="object"==typeof n&&n&&!n.nodeType&&n,y="object"==typeof t&&t;y.global!==y&&y.window!==y&&y.self!==y||(i=y);var b,w,C=2147483647,k=36,E=1,S=26,T=38,j=700,A=72,I=128,D="-",P=/^xn--/,R=/[^\x20-\x7E]/,M=/[\x2E\u3002\uFF0E\uFF61]/g,x={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},O=k-E,N=Math.floor,L=String.fromCharCode;if(b={version:"1.3.2",ucs2:{decode:u,encode:c},decode:h,encode:p,toASCII:m,toUnicode:_},"function"==typeof e&&"object"==typeof e.amd&&e.amd)e("punycode",function(){return b});else if(v&&g)if(n.exports==v)g.exports=b;else for(w in b)b.hasOwnProperty(w)&&(v[w]=b[w]);else i.punycode=b}(this)}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],266:[function(e,t,n){"use strict";function r(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.exports=function(e,t,n,o){t=t||"&",n=n||"=";var a={};if("string"!=typeof e||0===e.length)return a;var s=/\+/g;e=e.split(t);var u=1e3;o&&"number"==typeof o.maxKeys&&(u=o.maxKeys);var c=e.length;u>0&&c>u&&(c=u);for(var l=0;c>l;++l){var f,d,h,p,_=e[l].replace(s,"%20"),m=_.indexOf(n);m>=0?(f=_.substr(0,m),d=_.substr(m+1)):(f=_,d=""),h=decodeURIComponent(f),p=decodeURIComponent(d),r(a,h)?i(a[h])?a[h].push(p):a[h]=[a[h],p]:a[h]=p}return a};var i=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)}},{}],267:[function(e,t,n){"use strict";function r(e,t){if(e.map)return e.map(t);for(var n=[],r=0;r<e.length;r++)n.push(t(e[r],r));return n}var i=function(e){switch(typeof e){case"string":return e;case"boolean":return e?"true":"false";case"number":return isFinite(e)?e:"";default:return""}};t.exports=function(e,t,n,s){return t=t||"&",n=n||"=",null===e&&(e=void 0),"object"==typeof e?r(a(e),function(a){var s=encodeURIComponent(i(a))+n;return o(e[a])?r(e[a],function(e){return s+encodeURIComponent(i(e))}).join(t):s+encodeURIComponent(i(e[a]))}).join(t):s?encodeURIComponent(i(s))+n+encodeURIComponent(i(e)):""};var o=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},a=Object.keys||function(e){var t=[];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.push(n);return t}},{}],268:[function(e,t,n){"use strict";n.decode=n.parse=e("./decode"),n.encode=n.stringify=e("./encode")},{"./decode":266,"./encode":267}],269:[function(e,t,n){t.exports=e("./lib/")},{"./lib/":270}],270:[function(e,t,n){function r(e,t){"object"==typeof e&&(t=e,e=void 0),t=t||{};var n,r=i(e),o=r.source,c=r.id;return t.forceNew||t["force new connection"]||!1===t.multiplex?(s("ignoring socket cache for %s",o),n=a(o,t)):(u[c]||(s("new io instance for %s",o),u[c]=a(o,t)),n=u[c]),n.socket(r.path)}var i=e("./url"),o=e("socket.io-parser"),a=e("./manager"),s=e("debug")("socket.io-client");t.exports=n=r;var u=n.managers={};n.protocol=o.protocol,n.connect=r,n.Manager=e("./manager"),n.Socket=e("./socket")},{"./manager":271,"./socket":273,"./url":274,debug:276,"socket.io-parser":299}],271:[function(e,t,n){function r(e,t){return this instanceof r?(e&&"object"==typeof e&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.nsps={},this.subs=[],this.opts=t,this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor(t.randomizationFactor||.5),this.backoff=new d({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(null==t.timeout?2e4:t.timeout),this.readyState="closed",this.uri=e,this.connected=[],this.encoding=!1,this.packetBuffer=[],this.encoder=new s.Encoder,this.decoder=new s.Decoder,this.autoConnect=t.autoConnect!==!1,void(this.autoConnect&&this.open())):new r(e,t)}var i=(e("./url"),e("engine.io-client")),o=e("./socket"),a=e("component-emitter"),s=e("socket.io-parser"),u=e("./on"),c=e("component-bind"),l=(e("object-component"),e("debug")("socket.io-client:manager")),f=e("indexof"),d=e("backo2");t.exports=r,r.prototype.emitAll=function(){this.emit.apply(this,arguments);for(var e in this.nsps)this.nsps[e].emit.apply(this.nsps[e],arguments)},r.prototype.updateSocketIds=function(){for(var e in this.nsps)this.nsps[e].id=this.engine.id},a(r.prototype),r.prototype.reconnection=function(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection},r.prototype.reconnectionAttempts=function(e){return arguments.length?(this._reconnectionAttempts=e,this):this._reconnectionAttempts},r.prototype.reconnectionDelay=function(e){return arguments.length?(this._reconnectionDelay=e,this.backoff&&this.backoff.setMin(e),this):this._reconnectionDelay},r.prototype.randomizationFactor=function(e){return arguments.length?(this._randomizationFactor=e,this.backoff&&this.backoff.setJitter(e),this):this._randomizationFactor},r.prototype.reconnectionDelayMax=function(e){return arguments.length?(this._reconnectionDelayMax=e,this.backoff&&this.backoff.setMax(e),this):this._reconnectionDelayMax},r.prototype.timeout=function(e){return arguments.length?(this._timeout=e,this):this._timeout},r.prototype.maybeReconnectOnOpen=function(){!this.reconnecting&&this._reconnection&&0===this.backoff.attempts&&this.reconnect()},r.prototype.open=r.prototype.connect=function(e){if(l("readyState %s",this.readyState),~this.readyState.indexOf("open"))return this;l("opening %s",this.uri),this.engine=i(this.uri,this.opts);var t=this.engine,n=this;this.readyState="opening",this.skipReconnect=!1;var r=u(t,"open",function(){n.onopen(),e&&e()}),o=u(t,"error",function(t){if(l("connect_error"),n.cleanup(),n.readyState="closed",n.emitAll("connect_error",t),e){var r=new Error("Connection error");r.data=t,e(r)}else n.maybeReconnectOnOpen()});if(!1!==this._timeout){var a=this._timeout;l("connect attempt will timeout after %d",a);var s=setTimeout(function(){l("connect attempt timed out after %d",a),r.destroy(),t.close(),t.emit("error","timeout"),n.emitAll("connect_timeout",a)},a);this.subs.push({destroy:function(){clearTimeout(s)}})}return this.subs.push(r),this.subs.push(o),this},r.prototype.onopen=function(){l("open"),this.cleanup(),this.readyState="open",this.emit("open");var e=this.engine;this.subs.push(u(e,"data",c(this,"ondata"))),this.subs.push(u(this.decoder,"decoded",c(this,"ondecoded"))),this.subs.push(u(e,"error",c(this,"onerror"))),this.subs.push(u(e,"close",c(this,"onclose")))},r.prototype.ondata=function(e){this.decoder.add(e)},r.prototype.ondecoded=function(e){this.emit("packet",e)},r.prototype.onerror=function(e){l("error",e),this.emitAll("error",e)},r.prototype.socket=function(e){var t=this.nsps[e];if(!t){t=new o(this,e),this.nsps[e]=t;var n=this;t.on("connect",function(){t.id=n.engine.id,~f(n.connected,t)||n.connected.push(t)})}return t},r.prototype.destroy=function(e){var t=f(this.connected,e);~t&&this.connected.splice(t,1),this.connected.length||this.close()},r.prototype.packet=function(e){l("writing packet %j",e);var t=this;t.encoding?t.packetBuffer.push(e):(t.encoding=!0,this.encoder.encode(e,function(e){for(var n=0;n<e.length;n++)t.engine.write(e[n]);t.encoding=!1,t.processPacketQueue()}))},r.prototype.processPacketQueue=function(){if(this.packetBuffer.length>0&&!this.encoding){var e=this.packetBuffer.shift();this.packet(e)}},r.prototype.cleanup=function(){for(var e;e=this.subs.shift();)e.destroy();this.packetBuffer=[],this.encoding=!1,this.decoder.destroy()},r.prototype.close=r.prototype.disconnect=function(){this.skipReconnect=!0,this.backoff.reset(),this.readyState="closed",this.engine&&this.engine.close()},r.prototype.onclose=function(e){l("close"),this.cleanup(),this.backoff.reset(),this.readyState="closed",this.emit("close",e),this._reconnection&&!this.skipReconnect&&this.reconnect()},r.prototype.reconnect=function(){if(this.reconnecting||this.skipReconnect)return this;var e=this;if(this.backoff.attempts>=this._reconnectionAttempts)l("reconnect failed"),this.backoff.reset(),this.emitAll("reconnect_failed"),this.reconnecting=!1;else{var t=this.backoff.duration();l("will wait %dms before reconnect attempt",t),this.reconnecting=!0;var n=setTimeout(function(){e.skipReconnect||(l("attempting reconnect"),e.emitAll("reconnect_attempt",e.backoff.attempts),e.emitAll("reconnecting",e.backoff.attempts),e.skipReconnect||e.open(function(t){t?(l("reconnect attempt error"),e.reconnecting=!1,e.reconnect(),e.emitAll("reconnect_error",t.data)):(l("reconnect success"),e.onreconnect())}))},t);this.subs.push({destroy:function(){clearTimeout(n)}})}},r.prototype.onreconnect=function(){var e=this.backoff.attempts;this.reconnecting=!1,this.backoff.reset(),this.updateSocketIds(),this.emitAll("reconnect",e)}},{"./on":272,"./socket":273,"./url":274,backo2:130,"component-bind":134,"component-emitter":135,debug:276,"engine.io-client":277,indexof:259,"object-component":262,"socket.io-parser":299}],272:[function(e,t,n){function r(e,t,n){return e.on(t,n),{destroy:function(){e.removeListener(t,n)}}}t.exports=r},{}],273:[function(e,t,n){function r(e,t){this.io=e,this.nsp=t,this.json=this,this.ids=0,this.acks={},this.io.autoConnect&&this.open(),this.receiveBuffer=[],this.sendBuffer=[],this.connected=!1,this.disconnected=!0}var i=e("socket.io-parser"),o=e("component-emitter"),a=e("to-array"),s=e("./on"),u=e("component-bind"),c=e("debug")("socket.io-client:socket"),l=e("has-binary");t.exports=n=r;var f={connect:1,connect_error:1,connect_timeout:1,disconnect:1,error:1,reconnect:1,reconnect_attempt:1,reconnect_failed:1,reconnect_error:1,reconnecting:1},d=o.prototype.emit;o(r.prototype),r.prototype.subEvents=function(){if(!this.subs){var e=this.io;this.subs=[s(e,"open",u(this,"onopen")),s(e,"packet",u(this,"onpacket")),s(e,"close",u(this,"onclose"))]}},r.prototype.open=r.prototype.connect=function(){return this.connected?this:(this.subEvents(),this.io.open(),"open"==this.io.readyState&&this.onopen(),this)},r.prototype.send=function(){var e=a(arguments);return e.unshift("message"),this.emit.apply(this,e),this},r.prototype.emit=function(e){if(f.hasOwnProperty(e))return d.apply(this,arguments),this;var t=a(arguments),n=i.EVENT;l(t)&&(n=i.BINARY_EVENT);var r={type:n,data:t};return"function"==typeof t[t.length-1]&&(c("emitting packet with ack id %d",this.ids),this.acks[this.ids]=t.pop(),r.id=this.ids++),this.connected?this.packet(r):this.sendBuffer.push(r),this},r.prototype.packet=function(e){e.nsp=this.nsp,this.io.packet(e)},r.prototype.onopen=function(){c("transport is open - connecting"),"/"!=this.nsp&&this.packet({type:i.CONNECT})},r.prototype.onclose=function(e){c("close (%s)",e),this.connected=!1,this.disconnected=!0,delete this.id,this.emit("disconnect",e)},r.prototype.onpacket=function(e){if(e.nsp==this.nsp)switch(e.type){case i.CONNECT:this.onconnect();break;case i.EVENT:this.onevent(e);break;case i.BINARY_EVENT:this.onevent(e);break;case i.ACK:this.onack(e);break;case i.BINARY_ACK:this.onack(e);break;case i.DISCONNECT:this.ondisconnect();break;case i.ERROR:this.emit("error",e.data)}},r.prototype.onevent=function(e){var t=e.data||[];c("emitting event %j",t),null!=e.id&&(c("attaching ack callback to event"),t.push(this.ack(e.id))),this.connected?d.apply(this,t):this.receiveBuffer.push(t)},r.prototype.ack=function(e){var t=this,n=!1;return function(){if(!n){n=!0;var r=a(arguments);c("sending ack %j",r);var o=l(r)?i.BINARY_ACK:i.ACK;t.packet({type:o,id:e,data:r})}}},r.prototype.onack=function(e){c("calling ack %s with %j",e.id,e.data);var t=this.acks[e.id];t.apply(this,e.data),delete this.acks[e.id]},r.prototype.onconnect=function(){this.connected=!0,this.disconnected=!1,this.emit("connect"),this.emitBuffered()},r.prototype.emitBuffered=function(){var e;for(e=0;e<this.receiveBuffer.length;e++)d.apply(this,this.receiveBuffer[e]);for(this.receiveBuffer=[],e=0;e<this.sendBuffer.length;e++)this.packet(this.sendBuffer[e]);this.sendBuffer=[]},r.prototype.ondisconnect=function(){c("server disconnect (%s)",this.nsp),this.destroy(),this.onclose("io server disconnect")},r.prototype.destroy=function(){if(this.subs){for(var e=0;e<this.subs.length;e++)this.subs[e].destroy();this.subs=null}this.io.destroy(this)},r.prototype.close=r.prototype.disconnect=function(){return this.connected&&(c("performing disconnect (%s)",this.nsp),this.packet({type:i.DISCONNECT})),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}},{"./on":272,"component-bind":134,"component-emitter":135,debug:276,"has-binary":292,"socket.io-parser":299,"to-array":302}],274:[function(e,t,n){(function(n){function r(e,t){var r=e,t=t||n.location;return null==e&&(e=t.protocol+"//"+t.host),"string"==typeof e&&("/"==e.charAt(0)&&(e="/"==e.charAt(1)?t.protocol+e:t.hostname+e),/^(https?|wss?):\/\//.test(e)||(o("protocol-less url %s",e),e="undefined"!=typeof t?t.protocol+"//"+e:"https://"+e),o("parse %s",e),r=i(e)),r.port||(/^(http|ws)$/.test(r.protocol)?r.port="80":/^(http|ws)s$/.test(r.protocol)&&(r.port="443")),r.path=r.path||"/",r.id=r.protocol+"://"+r.host+":"+r.port,r.href=r.protocol+"://"+r.host+(t&&t.port==r.port?"":":"+r.port),r}var i=e("parseuri"),o=e("debug")("socket.io-client:url");t.exports=r}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{debug:276,parseuri:295}],275:[function(e,t,n){(function(e){function n(e,t){t=t||{};for(var n=new r,i=0;i<e.length;i++)n.append(e[i]);return t.type?n.getBlob(t.type):n.getBlob()}var r=e.BlobBuilder||e.WebKitBlobBuilder||e.MSBlobBuilder||e.MozBlobBuilder,i=function(){try{var e=new Blob(["hi"]);return 2==e.size}catch(t){return!1}}(),o=r&&r.prototype.append&&r.prototype.getBlob;t.exports=function(){return i?e.Blob:o?n:void 0}()}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],276:[function(e,t,n){function r(e){return r.enabled(e)?function(t){t=i(t);var n=new Date,o=n-(r[e]||n);r[e]=n,t=e+" "+t+" +"+r.humanize(o),window.console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}:function(){}}function i(e){return e instanceof Error?e.stack||e.message:e}t.exports=r,r.names=[],r.skips=[],r.enable=function(e){try{localStorage.debug=e}catch(t){}for(var n=(e||"").split(/[\s,]+/),i=n.length,o=0;i>o;o++)e=n[o].replace("*",".*?"),"-"===e[0]?r.skips.push(new RegExp("^"+e.substr(1)+"$")):r.names.push(new RegExp("^"+e+"$"))},r.disable=function(){r.enable("")},r.humanize=function(e){var t=1e3,n=6e4,r=60*n;return e>=r?(e/r).toFixed(1)+"h":e>=n?(e/n).toFixed(1)+"m":e>=t?(e/t|0)+"s":e+"ms"},r.enabled=function(e){for(var t=0,n=r.skips.length;n>t;t++)if(r.skips[t].test(e))return!1;for(var t=0,n=r.names.length;n>t;t++)if(r.names[t].test(e))return!0;return!1};try{window.localStorage&&r.enable(localStorage.debug)}catch(o){}},{}],277:[function(e,t,n){arguments[4][269][0].apply(n,arguments)},{"./lib/":278,dup:269}],278:[function(e,t,n){t.exports=e("./socket"),t.exports.parser=e("engine.io-parser")},{"./socket":279,"engine.io-parser":290}],279:[function(e,t,n){(function(n){function r(e,t){if(!(this instanceof r))return new r(e,t);if(t=t||{},e&&"object"==typeof e&&(t=e,e=null),e&&(e=l(e),t.host=e.host,t.secure="https"==e.protocol||"wss"==e.protocol,t.port=e.port,e.query&&(t.query=e.query)),this.secure=null!=t.secure?t.secure:n.location&&"https:"==location.protocol,t.host){var i=t.host.split(":");t.hostname=i.shift(),i.length?t.port=i.pop():t.port||(t.port=this.secure?"443":"80")}this.agent=t.agent||!1,this.hostname=t.hostname||(n.location?location.hostname:"localhost"),this.port=t.port||(n.location&&location.port?location.port:this.secure?443:80),this.query=t.query||{},"string"==typeof this.query&&(this.query=d.decode(this.query)),this.upgrade=!1!==t.upgrade,this.path=(t.path||"/engine.io").replace(/\/$/,"")+"/",this.forceJSONP=!!t.forceJSONP,this.jsonp=!1!==t.jsonp,this.forceBase64=!!t.forceBase64,this.enablesXDR=!!t.enablesXDR,this.timestampParam=t.timestampParam||"t",this.timestampRequests=t.timestampRequests,this.transports=t.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.callbackBuffer=[],this.policyPort=t.policyPort||843,this.rememberUpgrade=t.rememberUpgrade||!1,this.binaryType=null,this.onlyBinaryUpgrades=t.onlyBinaryUpgrades,this.pfx=t.pfx||null,this.key=t.key||null,this.passphrase=t.passphrase||null,this.cert=t.cert||null,this.ca=t.ca||null,this.ciphers=t.ciphers||null,this.rejectUnauthorized=t.rejectUnauthorized||null,this.open()}function i(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}var o=e("./transports"),a=e("component-emitter"),s=e("debug")("engine.io-client:socket"),u=e("indexof"),c=e("engine.io-parser"),l=e("parseuri"),f=e("parsejson"),d=e("parseqs");t.exports=r,r.priorWebsocketSuccess=!1,a(r.prototype),r.protocol=c.protocol,r.Socket=r,r.Transport=e("./transport"),r.transports=e("./transports"),r.parser=e("engine.io-parser"),r.prototype.createTransport=function(e){s('creating transport "%s"',e);var t=i(this.query);t.EIO=c.protocol,t.transport=e,this.id&&(t.sid=this.id);var n=new o[e]({agent:this.agent,hostname:this.hostname,port:this.port,secure:this.secure,path:this.path,query:t,forceJSONP:this.forceJSONP,jsonp:this.jsonp,forceBase64:this.forceBase64,enablesXDR:this.enablesXDR,timestampRequests:this.timestampRequests,timestampParam:this.timestampParam,policyPort:this.policyPort,socket:this,pfx:this.pfx,key:this.key,passphrase:this.passphrase,cert:this.cert,ca:this.ca,ciphers:this.ciphers,rejectUnauthorized:this.rejectUnauthorized
});return n},r.prototype.open=function(){var e;if(this.rememberUpgrade&&r.priorWebsocketSuccess&&-1!=this.transports.indexOf("websocket"))e="websocket";else{if(0==this.transports.length){var t=this;return void setTimeout(function(){t.emit("error","No transports available")},0)}e=this.transports[0]}this.readyState="opening";var e;try{e=this.createTransport(e)}catch(n){return this.transports.shift(),void this.open()}e.open(),this.setTransport(e)},r.prototype.setTransport=function(e){s("setting transport %s",e.name);var t=this;this.transport&&(s("clearing existing transport %s",this.transport.name),this.transport.removeAllListeners()),this.transport=e,e.on("drain",function(){t.onDrain()}).on("packet",function(e){t.onPacket(e)}).on("error",function(e){t.onError(e)}).on("close",function(){t.onClose("transport close")})},r.prototype.probe=function(e){function t(){if(d.onlyBinaryUpgrades){var t=!this.supportsBinary&&d.transport.supportsBinary;f=f||t}f||(s('probe transport "%s" opened',e),l.send([{type:"ping",data:"probe"}]),l.once("packet",function(t){if(!f)if("pong"==t.type&&"probe"==t.data){if(s('probe transport "%s" pong',e),d.upgrading=!0,d.emit("upgrading",l),!l)return;r.priorWebsocketSuccess="websocket"==l.name,s('pausing current transport "%s"',d.transport.name),d.transport.pause(function(){f||"closed"!=d.readyState&&(s("changing transport and sending upgrade packet"),c(),d.setTransport(l),l.send([{type:"upgrade"}]),d.emit("upgrade",l),l=null,d.upgrading=!1,d.flush())})}else{s('probe transport "%s" failed',e);var n=new Error("probe error");n.transport=l.name,d.emit("upgradeError",n)}}))}function n(){f||(f=!0,c(),l.close(),l=null)}function i(t){var r=new Error("probe error: "+t);r.transport=l.name,n(),s('probe transport "%s" failed because of error: %s',e,t),d.emit("upgradeError",r)}function o(){i("transport closed")}function a(){i("socket closed")}function u(e){l&&e.name!=l.name&&(s('"%s" works - aborting "%s"',e.name,l.name),n())}function c(){l.removeListener("open",t),l.removeListener("error",i),l.removeListener("close",o),d.removeListener("close",a),d.removeListener("upgrading",u)}s('probing transport "%s"',e);var l=this.createTransport(e,{probe:1}),f=!1,d=this;r.priorWebsocketSuccess=!1,l.once("open",t),l.once("error",i),l.once("close",o),this.once("close",a),this.once("upgrading",u),l.open()},r.prototype.onOpen=function(){if(s("socket open"),this.readyState="open",r.priorWebsocketSuccess="websocket"==this.transport.name,this.emit("open"),this.flush(),"open"==this.readyState&&this.upgrade&&this.transport.pause){s("starting upgrade probes");for(var e=0,t=this.upgrades.length;t>e;e++)this.probe(this.upgrades[e])}},r.prototype.onPacket=function(e){if("opening"==this.readyState||"open"==this.readyState)switch(s('socket receive: type "%s", data "%s"',e.type,e.data),this.emit("packet",e),this.emit("heartbeat"),e.type){case"open":this.onHandshake(f(e.data));break;case"pong":this.setPing();break;case"error":var t=new Error("server error");t.code=e.data,this.emit("error",t);break;case"message":this.emit("data",e.data),this.emit("message",e.data)}else s('packet received with socket readyState "%s"',this.readyState)},r.prototype.onHandshake=function(e){this.emit("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.onOpen(),"closed"!=this.readyState&&(this.setPing(),this.removeListener("heartbeat",this.onHeartbeat),this.on("heartbeat",this.onHeartbeat))},r.prototype.onHeartbeat=function(e){clearTimeout(this.pingTimeoutTimer);var t=this;t.pingTimeoutTimer=setTimeout(function(){"closed"!=t.readyState&&t.onClose("ping timeout")},e||t.pingInterval+t.pingTimeout)},r.prototype.setPing=function(){var e=this;clearTimeout(e.pingIntervalTimer),e.pingIntervalTimer=setTimeout(function(){s("writing ping packet - expecting pong within %sms",e.pingTimeout),e.ping(),e.onHeartbeat(e.pingTimeout)},e.pingInterval)},r.prototype.ping=function(){this.sendPacket("ping")},r.prototype.onDrain=function(){for(var e=0;e<this.prevBufferLen;e++)this.callbackBuffer[e]&&this.callbackBuffer[e]();this.writeBuffer.splice(0,this.prevBufferLen),this.callbackBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,0==this.writeBuffer.length?this.emit("drain"):this.flush()},r.prototype.flush=function(){"closed"!=this.readyState&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length&&(s("flushing %d packets in socket",this.writeBuffer.length),this.transport.send(this.writeBuffer),this.prevBufferLen=this.writeBuffer.length,this.emit("flush"))},r.prototype.write=r.prototype.send=function(e,t){return this.sendPacket("message",e,t),this},r.prototype.sendPacket=function(e,t,n){if("closing"!=this.readyState&&"closed"!=this.readyState){var r={type:e,data:t};this.emit("packetCreate",r),this.writeBuffer.push(r),this.callbackBuffer.push(n),this.flush()}},r.prototype.close=function(){function e(){r.onClose("forced close"),s("socket closing - telling transport to close"),r.transport.close()}function t(){r.removeListener("upgrade",t),r.removeListener("upgradeError",t),e()}function n(){r.once("upgrade",t),r.once("upgradeError",t)}if("opening"==this.readyState||"open"==this.readyState){this.readyState="closing";var r=this;this.writeBuffer.length?this.once("drain",function(){this.upgrading?n():e()}):this.upgrading?n():e()}return this},r.prototype.onError=function(e){s("socket error %j",e),r.priorWebsocketSuccess=!1,this.emit("error",e),this.onClose("transport error",e)},r.prototype.onClose=function(e,t){if("opening"==this.readyState||"open"==this.readyState||"closing"==this.readyState){s('socket close with reason: "%s"',e);var n=this;clearTimeout(this.pingIntervalTimer),clearTimeout(this.pingTimeoutTimer),setTimeout(function(){n.writeBuffer=[],n.callbackBuffer=[],n.prevBufferLen=0},0),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),this.readyState="closed",this.id=null,this.emit("close",e,t)}},r.prototype.filterUpgrades=function(e){for(var t=[],n=0,r=e.length;r>n;n++)~u(this.transports,e[n])&&t.push(e[n]);return t}}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./transport":280,"./transports":281,"component-emitter":135,debug:287,"engine.io-parser":290,indexof:259,parsejson:263,parseqs:264,parseuri:289}],280:[function(e,t,n){function r(e){this.path=e.path,this.hostname=e.hostname,this.port=e.port,this.secure=e.secure,this.query=e.query,this.timestampParam=e.timestampParam,this.timestampRequests=e.timestampRequests,this.readyState="",this.agent=e.agent||!1,this.socket=e.socket,this.enablesXDR=e.enablesXDR,this.pfx=e.pfx,this.key=e.key,this.passphrase=e.passphrase,this.cert=e.cert,this.ca=e.ca,this.ciphers=e.ciphers,this.rejectUnauthorized=e.rejectUnauthorized}var i=e("engine.io-parser"),o=e("component-emitter");t.exports=r,o(r.prototype),r.timestamps=0,r.prototype.onError=function(e,t){var n=new Error(e);return n.type="TransportError",n.description=t,this.emit("error",n),this},r.prototype.open=function(){return"closed"!=this.readyState&&""!=this.readyState||(this.readyState="opening",this.doOpen()),this},r.prototype.close=function(){return"opening"!=this.readyState&&"open"!=this.readyState||(this.doClose(),this.onClose()),this},r.prototype.send=function(e){if("open"!=this.readyState)throw new Error("Transport not open");this.write(e)},r.prototype.onOpen=function(){this.readyState="open",this.writable=!0,this.emit("open")},r.prototype.onData=function(e){var t=i.decodePacket(e,this.socket.binaryType);this.onPacket(t)},r.prototype.onPacket=function(e){this.emit("packet",e)},r.prototype.onClose=function(){this.readyState="closed",this.emit("close")}},{"component-emitter":135,"engine.io-parser":290}],281:[function(e,t,n){(function(t){function r(e){var n,r=!1,s=!1,u=!1!==e.jsonp;if(t.location){var c="https:"==location.protocol,l=location.port;l||(l=c?443:80),r=e.hostname!=location.hostname||l!=e.port,s=e.secure!=c}if(e.xdomain=r,e.xscheme=s,n=new i(e),"open"in n&&!e.forceJSONP)return new o(e);if(!u)throw new Error("JSONP disabled");return new a(e)}var i=e("xmlhttprequest"),o=e("./polling-xhr"),a=e("./polling-jsonp"),s=e("./websocket");n.polling=r,n.websocket=s}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./polling-jsonp":282,"./polling-xhr":283,"./websocket":285,xmlhttprequest:286}],282:[function(e,t,n){(function(n){function r(){}function i(e){o.call(this,e),this.query=this.query||{},s||(n.___eio||(n.___eio=[]),s=n.___eio),this.index=s.length;var t=this;s.push(function(e){t.onData(e)}),this.query.j=this.index,n.document&&n.addEventListener&&n.addEventListener("beforeunload",function(){t.script&&(t.script.onerror=r)},!1)}var o=e("./polling"),a=e("component-inherit");t.exports=i;var s,u=/\n/g,c=/\\n/g;a(i,o),i.prototype.supportsBinary=!1,i.prototype.doClose=function(){this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),this.form&&(this.form.parentNode.removeChild(this.form),this.form=null,this.iframe=null),o.prototype.doClose.call(this)},i.prototype.doPoll=function(){var e=this,t=document.createElement("script");this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),t.async=!0,t.src=this.uri(),t.onerror=function(t){e.onError("jsonp poll error",t)};var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n),this.script=t;var r="undefined"!=typeof navigator&&/gecko/i.test(navigator.userAgent);r&&setTimeout(function(){var e=document.createElement("iframe");document.body.appendChild(e),document.body.removeChild(e)},100)},i.prototype.doWrite=function(e,t){function n(){r(),t()}function r(){if(i.iframe)try{i.form.removeChild(i.iframe)}catch(e){i.onError("jsonp polling iframe removal error",e)}try{var t='<iframe src="javascript:0" name="'+i.iframeId+'">';o=document.createElement(t)}catch(e){o=document.createElement("iframe"),o.name=i.iframeId,o.src="javascript:0"}o.id=i.iframeId,i.form.appendChild(o),i.iframe=o}var i=this;if(!this.form){var o,a=document.createElement("form"),s=document.createElement("textarea"),l=this.iframeId="eio_iframe_"+this.index;a.className="socketio",a.style.position="absolute",a.style.top="-1000px",a.style.left="-1000px",a.target=l,a.method="POST",a.setAttribute("accept-charset","utf-8"),s.name="d",a.appendChild(s),document.body.appendChild(a),this.form=a,this.area=s}this.form.action=this.uri(),r(),e=e.replace(c,"\\\n"),this.area.value=e.replace(u,"\\n");try{this.form.submit()}catch(f){}this.iframe.attachEvent?this.iframe.onreadystatechange=function(){"complete"==i.iframe.readyState&&n()}:this.iframe.onload=n}}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./polling":284,"component-inherit":136}],283:[function(e,t,n){(function(n){function r(){}function i(e){if(u.call(this,e),n.location){var t="https:"==location.protocol,r=location.port;r||(r=t?443:80),this.xd=e.hostname!=n.location.hostname||r!=e.port,this.xs=e.secure!=t}}function o(e){this.method=e.method||"GET",this.uri=e.uri,this.xd=!!e.xd,this.xs=!!e.xs,this.async=!1!==e.async,this.data=void 0!=e.data?e.data:null,this.agent=e.agent,this.isBinary=e.isBinary,this.supportsBinary=e.supportsBinary,this.enablesXDR=e.enablesXDR,this.pfx=e.pfx,this.key=e.key,this.passphrase=e.passphrase,this.cert=e.cert,this.ca=e.ca,this.ciphers=e.ciphers,this.rejectUnauthorized=e.rejectUnauthorized,this.create()}function a(){for(var e in o.requests)o.requests.hasOwnProperty(e)&&o.requests[e].abort()}var s=e("xmlhttprequest"),u=e("./polling"),c=e("component-emitter"),l=e("component-inherit"),f=e("debug")("engine.io-client:polling-xhr");t.exports=i,t.exports.Request=o,l(i,u),i.prototype.supportsBinary=!0,i.prototype.request=function(e){return e=e||{},e.uri=this.uri(),e.xd=this.xd,e.xs=this.xs,e.agent=this.agent||!1,e.supportsBinary=this.supportsBinary,e.enablesXDR=this.enablesXDR,e.pfx=this.pfx,e.key=this.key,e.passphrase=this.passphrase,e.cert=this.cert,e.ca=this.ca,e.ciphers=this.ciphers,e.rejectUnauthorized=this.rejectUnauthorized,new o(e)},i.prototype.doWrite=function(e,t){var n="string"!=typeof e&&void 0!==e,r=this.request({method:"POST",data:e,isBinary:n}),i=this;r.on("success",t),r.on("error",function(e){i.onError("xhr post error",e)}),this.sendXhr=r},i.prototype.doPoll=function(){f("xhr poll");var e=this.request(),t=this;e.on("data",function(e){t.onData(e)}),e.on("error",function(e){t.onError("xhr poll error",e)}),this.pollXhr=e},c(o.prototype),o.prototype.create=function(){var e={agent:this.agent,xdomain:this.xd,xscheme:this.xs,enablesXDR:this.enablesXDR};e.pfx=this.pfx,e.key=this.key,e.passphrase=this.passphrase,e.cert=this.cert,e.ca=this.ca,e.ciphers=this.ciphers,e.rejectUnauthorized=this.rejectUnauthorized;var t=this.xhr=new s(e),r=this;try{if(f("xhr open %s: %s",this.method,this.uri),t.open(this.method,this.uri,this.async),this.supportsBinary&&(t.responseType="arraybuffer"),"POST"==this.method)try{this.isBinary?t.setRequestHeader("Content-type","application/octet-stream"):t.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch(i){}"withCredentials"in t&&(t.withCredentials=!0),this.hasXDR()?(t.onload=function(){r.onLoad()},t.onerror=function(){r.onError(t.responseText)}):t.onreadystatechange=function(){4==t.readyState&&(200==t.status||1223==t.status?r.onLoad():setTimeout(function(){r.onError(t.status)},0))},f("xhr data %s",this.data),t.send(this.data)}catch(i){return void setTimeout(function(){r.onError(i)},0)}n.document&&(this.index=o.requestsCount++,o.requests[this.index]=this)},o.prototype.onSuccess=function(){this.emit("success"),this.cleanup()},o.prototype.onData=function(e){this.emit("data",e),this.onSuccess()},o.prototype.onError=function(e){this.emit("error",e),this.cleanup(!0)},o.prototype.cleanup=function(e){if("undefined"!=typeof this.xhr&&null!==this.xhr){if(this.hasXDR()?this.xhr.onload=this.xhr.onerror=r:this.xhr.onreadystatechange=r,e)try{this.xhr.abort()}catch(t){}n.document&&delete o.requests[this.index],this.xhr=null}},o.prototype.onLoad=function(){var e;try{var t;try{t=this.xhr.getResponseHeader("Content-Type").split(";")[0]}catch(n){}e="application/octet-stream"===t?this.xhr.response:this.supportsBinary?"ok":this.xhr.responseText}catch(n){this.onError(n)}null!=e&&this.onData(e)},o.prototype.hasXDR=function(){return"undefined"!=typeof n.XDomainRequest&&!this.xs&&this.enablesXDR},o.prototype.abort=function(){this.cleanup()},n.document&&(o.requestsCount=0,o.requests={},n.attachEvent?n.attachEvent("onunload",a):n.addEventListener&&n.addEventListener("beforeunload",a,!1))}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./polling":284,"component-emitter":135,"component-inherit":136,debug:287,xmlhttprequest:286}],284:[function(e,t,n){function r(e){var t=e&&e.forceBase64;c&&!t||(this.supportsBinary=!1),i.call(this,e)}var i=e("../transport"),o=e("parseqs"),a=e("engine.io-parser"),s=e("component-inherit"),u=e("debug")("engine.io-client:polling");t.exports=r;var c=function(){var t=e("xmlhttprequest"),n=new t({xdomain:!1});return null!=n.responseType}();s(r,i),r.prototype.name="polling",r.prototype.doOpen=function(){this.poll()},r.prototype.pause=function(e){function t(){u("paused"),n.readyState="paused",e()}var n=this;if(this.readyState="pausing",this.polling||!this.writable){var r=0;this.polling&&(u("we are currently polling - waiting to pause"),r++,this.once("pollComplete",function(){u("pre-pause polling complete"),--r||t()})),this.writable||(u("we are currently writing - waiting to pause"),r++,this.once("drain",function(){u("pre-pause writing complete"),--r||t()}))}else t()},r.prototype.poll=function(){u("polling"),this.polling=!0,this.doPoll(),this.emit("poll")},r.prototype.onData=function(e){var t=this;u("polling got data %s",e);var n=function(e,n,r){return"opening"==t.readyState&&t.onOpen(),"close"==e.type?(t.onClose(),!1):void t.onPacket(e)};a.decodePayload(e,this.socket.binaryType,n),"closed"!=this.readyState&&(this.polling=!1,this.emit("pollComplete"),"open"==this.readyState?this.poll():u('ignoring poll - transport state "%s"',this.readyState))},r.prototype.doClose=function(){function e(){u("writing close packet"),t.write([{type:"close"}])}var t=this;"open"==this.readyState?(u("transport open - closing"),e()):(u("transport not open - deferring close"),this.once("open",e))},r.prototype.write=function(e){var t=this;this.writable=!1;var n=function(){t.writable=!0,t.emit("drain")},t=this;a.encodePayload(e,this.supportsBinary,function(e){t.doWrite(e,n)})},r.prototype.uri=function(){var e=this.query||{},t=this.secure?"https":"http",n="";return!1!==this.timestampRequests&&(e[this.timestampParam]=+new Date+"-"+i.timestamps++),this.supportsBinary||e.sid||(e.b64=1),e=o.encode(e),this.port&&("https"==t&&443!=this.port||"http"==t&&80!=this.port)&&(n=":"+this.port),e.length&&(e="?"+e),t+"://"+this.hostname+n+this.path+e}},{"../transport":280,"component-inherit":136,debug:287,"engine.io-parser":290,parseqs:264,xmlhttprequest:286}],285:[function(e,t,n){function r(e){var t=e&&e.forceBase64;t&&(this.supportsBinary=!1),i.call(this,e)}var i=e("../transport"),o=e("engine.io-parser"),a=e("parseqs"),s=e("component-inherit"),u=e("debug")("engine.io-client:websocket"),c=e("ws");t.exports=r,s(r,i),r.prototype.name="websocket",r.prototype.supportsBinary=!0,r.prototype.doOpen=function(){if(this.check()){var e=this.uri(),t=void 0,n={agent:this.agent};n.pfx=this.pfx,n.key=this.key,n.passphrase=this.passphrase,n.cert=this.cert,n.ca=this.ca,n.ciphers=this.ciphers,n.rejectUnauthorized=this.rejectUnauthorized,this.ws=new c(e,t,n),void 0===this.ws.binaryType&&(this.supportsBinary=!1),this.ws.binaryType="arraybuffer",this.addEventListeners()}},r.prototype.addEventListeners=function(){var e=this;this.ws.onopen=function(){e.onOpen()},this.ws.onclose=function(){e.onClose()},this.ws.onmessage=function(t){e.onData(t.data)},this.ws.onerror=function(t){e.onError("websocket error",t)}},"undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)&&(r.prototype.onData=function(e){var t=this;setTimeout(function(){i.prototype.onData.call(t,e)},0)}),r.prototype.write=function(e){function t(){n.writable=!0,n.emit("drain")}var n=this;this.writable=!1;for(var r=0,i=e.length;i>r;r++)o.encodePacket(e[r],this.supportsBinary,function(e){try{n.ws.send(e)}catch(t){u("websocket closed before onclose event")}});setTimeout(t,0)},r.prototype.onClose=function(){i.prototype.onClose.call(this)},r.prototype.doClose=function(){"undefined"!=typeof this.ws&&this.ws.close()},r.prototype.uri=function(){var e=this.query||{},t=this.secure?"wss":"ws",n="";return this.port&&("wss"==t&&443!=this.port||"ws"==t&&80!=this.port)&&(n=":"+this.port),this.timestampRequests&&(e[this.timestampParam]=+new Date),this.supportsBinary||(e.b64=1),e=a.encode(e),e.length&&(e="?"+e),t+"://"+this.hostname+n+this.path+e},r.prototype.check=function(){return!(!c||"__initialize"in c&&this.name===r.prototype.name)}},{"../transport":280,"component-inherit":136,debug:287,"engine.io-parser":290,parseqs:264,ws:297}],286:[function(e,t,n){var r=e("has-cors");t.exports=function(e){var t=e.xdomain,n=e.xscheme,i=e.enablesXDR;try{if("undefined"!=typeof XMLHttpRequest&&(!t||r))return new XMLHttpRequest}catch(o){}try{if("undefined"!=typeof XDomainRequest&&!n&&i)return new XDomainRequest}catch(o){}if(!t)try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(o){}}},{"has-cors":293}],287:[function(e,t,n){function r(){return"WebkitAppearance"in document.documentElement.style||window.console&&(console.firebug||console.exception&&console.table)||navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31}function i(){var e=arguments,t=this.useColors;if(e[0]=(t?"%c":"")+this.namespace+(t?" %c":" ")+e[0]+(t?"%c ":" ")+"+"+n.humanize(this.diff),!t)return e;var r="color: "+this.color;e=[e[0],r,"color: inherit"].concat(Array.prototype.slice.call(e,1));var i=0,o=0;return e[0].replace(/%[a-z%]/g,function(e){"%%"!==e&&(i++,"%c"===e&&(o=i))}),e.splice(o,0,r),e}function o(){return"object"==typeof console&&"function"==typeof console.log&&Function.prototype.apply.call(console.log,console,arguments)}function a(e){try{null==e?localStorage.removeItem("debug"):localStorage.debug=e}catch(t){}}function s(){var e;try{e=localStorage.debug}catch(t){}return e}n=t.exports=e("./debug"),n.log=o,n.formatArgs=i,n.save=a,n.load=s,n.useColors=r,n.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],n.formatters.j=function(e){return JSON.stringify(e)},n.enable(s())},{"./debug":288}],288:[function(e,t,n){function r(){return n.colors[l++%n.colors.length]}function i(e){function t(){}function i(){var e=i,t=+new Date,o=t-(c||t);e.diff=o,e.prev=c,e.curr=t,c=t,null==e.useColors&&(e.useColors=n.useColors()),null==e.color&&e.useColors&&(e.color=r());var a=Array.prototype.slice.call(arguments);a[0]=n.coerce(a[0]),"string"!=typeof a[0]&&(a=["%o"].concat(a));var s=0;a[0]=a[0].replace(/%([a-z%])/g,function(t,r){if("%%"===t)return t;s++;var i=n.formatters[r];if("function"==typeof i){var o=a[s];t=i.call(e,o),a.splice(s,1),s--}return t}),"function"==typeof n.formatArgs&&(a=n.formatArgs.apply(e,a));var u=i.log||n.log||void 0;u.apply(e,a)}t.enabled=!1,i.enabled=!0;var o=n.enabled(e)?i:t;return o.namespace=e,o}function o(e){n.save(e);for(var t=(e||"").split(/[\s,]+/),r=t.length,i=0;r>i;i++)t[i]&&(e=t[i].replace(/\*/g,".*?"),"-"===e[0]?n.skips.push(new RegExp("^"+e.substr(1)+"$")):n.names.push(new RegExp("^"+e+"$")))}function a(){n.enable("")}function s(e){var t,r;for(t=0,r=n.skips.length;r>t;t++)if(n.skips[t].test(e))return!1;for(t=0,r=n.names.length;r>t;t++)if(n.names[t].test(e))return!0;return!1}function u(e){return e instanceof Error?e.stack||e.message:e}n=t.exports=i,n.coerce=u,n.disable=a,n.enable=o,n.enabled=s,n.humanize=e("ms"),n.names=[],n.skips=[],n.formatters={};var c,l=0},{ms:294}],289:[function(e,t,n){var r=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,i=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(e){var t=e,n=e.indexOf("["),o=e.indexOf("]");-1!=n&&-1!=o&&(e=e.substring(0,n)+e.substring(n,o).replace(/:/g,";")+e.substring(o,e.length));for(var a=r.exec(e||""),s={},u=14;u--;)s[i[u]]=a[u]||"";return-1!=n&&-1!=o&&(s.source=t,s.host=s.host.substring(1,s.host.length-1).replace(/;/g,":"),s.authority=s.authority.replace("[","").replace("]","").replace(/;/g,":"),s.ipv6uri=!0),s}},{}],290:[function(e,t,n){(function(t){function r(e,t){var r="b"+n.packets[e.type]+e.data.data;return t(r)}function i(e,t,r){if(!t)return n.encodeBase64Packet(e,r);var i=e.data,o=new Uint8Array(i),a=new Uint8Array(1+i.byteLength);a[0]=v[e.type];for(var s=0;s<o.length;s++)a[s+1]=o[s];return r(a.buffer)}function o(e,t,r){if(!t)return n.encodeBase64Packet(e,r);var i=new FileReader;return i.onload=function(){e.data=i.result,n.encodePacket(e,t,!0,r)},i.readAsArrayBuffer(e.data)}function a(e,t,r){if(!t)return n.encodeBase64Packet(e,r);if(m)return o(e,t,r);var i=new Uint8Array(1);i[0]=v[e.type];var a=new b([i.buffer,e.data]);return r(a)}function s(e,t,n){for(var r=new Array(e.length),i=d(e.length,n),o=function(e,n,i){t(n,function(t,n){r[e]=n,i(t,r)})},a=0;a<e.length;a++)o(a,e[a],i)}var u=e("./keys"),c=e("has-binary"),l=e("arraybuffer.slice"),f=e("base64-arraybuffer"),d=e("after"),h=e("utf8"),p=navigator.userAgent.match(/Android/i),_=/PhantomJS/i.test(navigator.userAgent),m=p||_;n.protocol=3;var v=n.packets={open:0,close:1,ping:2,pong:3,message:4,upgrade:5,noop:6},g=u(v),y={type:"error",data:"parser error"},b=e("blob");n.encodePacket=function(e,n,o,s){"function"==typeof n&&(s=n,n=!1),"function"==typeof o&&(s=o,o=null);var u=void 0===e.data?void 0:e.data.buffer||e.data;if(t.ArrayBuffer&&u instanceof ArrayBuffer)return i(e,n,s);if(b&&u instanceof t.Blob)return a(e,n,s);if(u&&u.base64)return r(e,s);var c=v[e.type];return void 0!==e.data&&(c+=o?h.encode(String(e.data)):String(e.data)),s(""+c)},n.encodeBase64Packet=function(e,r){var i="b"+n.packets[e.type];if(b&&e.data instanceof b){var o=new FileReader;return o.onload=function(){var e=o.result.split(",")[1];r(i+e)},o.readAsDataURL(e.data)}var a;try{a=String.fromCharCode.apply(null,new Uint8Array(e.data))}catch(s){for(var u=new Uint8Array(e.data),c=new Array(u.length),l=0;l<u.length;l++)c[l]=u[l];a=String.fromCharCode.apply(null,c)}return i+=t.btoa(a),r(i)},n.decodePacket=function(e,t,r){if("string"==typeof e||void 0===e){if("b"==e.charAt(0))return n.decodeBase64Packet(e.substr(1),t);if(r)try{e=h.decode(e)}catch(i){return y}var o=e.charAt(0);return Number(o)==o&&g[o]?e.length>1?{type:g[o],data:e.substring(1)}:{type:g[o]}:y}var a=new Uint8Array(e),o=a[0],s=l(e,1);return b&&"blob"===t&&(s=new b([s])),{type:g[o],data:s}},n.decodeBase64Packet=function(e,n){var r=g[e.charAt(0)];if(!t.ArrayBuffer)return{type:r,data:{base64:!0,data:e.substr(1)}};var i=f.decode(e.substr(1));return"blob"===n&&b&&(i=new b([i])),{type:r,data:i}},n.encodePayload=function(e,t,r){function i(e){return e.length+":"+e}function o(e,r){n.encodePacket(e,!!a&&t,!0,function(e){r(null,i(e))})}"function"==typeof t&&(r=t,t=null);var a=c(e);return t&&a?b&&!m?n.encodePayloadAsBlob(e,r):n.encodePayloadAsArrayBuffer(e,r):e.length?void s(e,o,function(e,t){return r(t.join(""))}):r("0:")},n.decodePayload=function(e,t,r){if("string"!=typeof e)return n.decodePayloadAsBinary(e,t,r);"function"==typeof t&&(r=t,t=null);var i;if(""==e)return r(y,0,1);for(var o,a,s="",u=0,c=e.length;c>u;u++){var l=e.charAt(u);if(":"!=l)s+=l;else{if(""==s||s!=(o=Number(s)))return r(y,0,1);if(a=e.substr(u+1,o),s!=a.length)return r(y,0,1);if(a.length){if(i=n.decodePacket(a,t,!0),y.type==i.type&&y.data==i.data)return r(y,0,1);var f=r(i,u+o,c);if(!1===f)return}u+=o,s=""}}return""!=s?r(y,0,1):void 0},n.encodePayloadAsArrayBuffer=function(e,t){function r(e,t){n.encodePacket(e,!0,!0,function(e){return t(null,e)})}return e.length?void s(e,r,function(e,n){var r=n.reduce(function(e,t){var n;return n="string"==typeof t?t.length:t.byteLength,e+n.toString().length+n+2},0),i=new Uint8Array(r),o=0;return n.forEach(function(e){var t="string"==typeof e,n=e;if(t){for(var r=new Uint8Array(e.length),a=0;a<e.length;a++)r[a]=e.charCodeAt(a);n=r.buffer}t?i[o++]=0:i[o++]=1;for(var s=n.byteLength.toString(),a=0;a<s.length;a++)i[o++]=parseInt(s[a]);i[o++]=255;for(var r=new Uint8Array(n),a=0;a<r.length;a++)i[o++]=r[a]}),t(i.buffer)}):t(new ArrayBuffer(0))},n.encodePayloadAsBlob=function(e,t){function r(e,t){n.encodePacket(e,!0,!0,function(e){var n=new Uint8Array(1);if(n[0]=1,"string"==typeof e){for(var r=new Uint8Array(e.length),i=0;i<e.length;i++)r[i]=e.charCodeAt(i);e=r.buffer,n[0]=0}for(var o=e instanceof ArrayBuffer?e.byteLength:e.size,a=o.toString(),s=new Uint8Array(a.length+1),i=0;i<a.length;i++)s[i]=parseInt(a[i]);if(s[a.length]=255,b){var u=new b([n.buffer,s.buffer,e]);t(null,u)}})}s(e,r,function(e,n){return t(new b(n))})},n.decodePayloadAsBinary=function(e,t,r){"function"==typeof t&&(r=t,t=null);for(var i=e,o=[],a=!1;i.byteLength>0;){for(var s=new Uint8Array(i),u=0===s[0],c="",f=1;255!=s[f];f++){if(c.length>310){a=!0;break}c+=s[f]}if(a)return r(y,0,1);i=l(i,2+c.length),c=parseInt(c);var d=l(i,0,c);if(u)try{d=String.fromCharCode.apply(null,new Uint8Array(d))}catch(h){var p=new Uint8Array(d);d="";for(var f=0;f<p.length;f++)d+=String.fromCharCode(p[f])}o.push(d),i=l(i,c)}var _=o.length;o.forEach(function(e,i){r(n.decodePacket(e,t,!0),i,_)})}}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./keys":291,after:102,"arraybuffer.slice":103,"base64-arraybuffer":131,blob:275,"has-binary":292,utf8:296}],291:[function(e,t,n){t.exports=Object.keys||function(e){var t=[],n=Object.prototype.hasOwnProperty;for(var r in e)n.call(e,r)&&t.push(r);return t}},{}],292:[function(e,t,n){(function(n){function r(e){function t(e){if(!e)return!1;if(n.Buffer&&n.Buffer.isBuffer(e)||n.ArrayBuffer&&e instanceof ArrayBuffer||n.Blob&&e instanceof Blob||n.File&&e instanceof File)return!0;if(i(e)){for(var r=0;r<e.length;r++)if(t(e[r]))return!0}else if(e&&"object"==typeof e){e.toJSON&&(e=e.toJSON());for(var o in e)if(e.hasOwnProperty(o)&&t(e[o]))return!0}return!1}return t(e)}var i=e("isarray");t.exports=r}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{isarray:260}],293:[function(e,t,n){var r=e("global");try{t.exports="XMLHttpRequest"in r&&"withCredentials"in new r.XMLHttpRequest}catch(i){t.exports=!1}},{global:258}],294:[function(e,t,n){function r(e){var t=/^((?:\d+)?\.?\d+) *(ms|seconds?|s|minutes?|m|hours?|h|days?|d|years?|y)?$/i.exec(e);if(t){var n=parseFloat(t[1]),r=(t[2]||"ms").toLowerCase();switch(r){case"years":case"year":case"y":return n*f;case"days":case"day":case"d":return n*l;case"hours":case"hour":case"h":return n*c;case"minutes":case"minute":case"m":return n*u;case"seconds":case"second":case"s":return n*s;case"ms":return n}}}function i(e){return e>=l?Math.round(e/l)+"d":e>=c?Math.round(e/c)+"h":e>=u?Math.round(e/u)+"m":e>=s?Math.round(e/s)+"s":e+"ms"}function o(e){return a(e,l,"day")||a(e,c,"hour")||a(e,u,"minute")||a(e,s,"second")||e+" ms"}function a(e,t,n){return t>e?void 0:1.5*t>e?Math.floor(e/t)+" "+n:Math.ceil(e/t)+" "+n+"s"}var s=1e3,u=60*s,c=60*u,l=24*c,f=365.25*l;t.exports=function(e,t){return t=t||{},"string"==typeof e?r(e):t["long"]?o(e):i(e)}},{}],295:[function(e,t,n){var r=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,i=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];t.exports=function(e){for(var t=r.exec(e||""),n={},o=14;o--;)n[i[o]]=t[o]||"";return n}},{}],296:[function(t,n,r){(function(t){!function(i){function o(e){for(var t,n,r=[],i=0,o=e.length;o>i;)t=e.charCodeAt(i++),t>=55296&&56319>=t&&o>i?(n=e.charCodeAt(i++),56320==(64512&n)?r.push(((1023&t)<<10)+(1023&n)+65536):(r.push(t),i--)):r.push(t);return r}function a(e){for(var t,n=e.length,r=-1,i="";++r<n;)t=e[r],t>65535&&(t-=65536,i+=y(t>>>10&1023|55296),t=56320|1023&t),i+=y(t);return i}function s(e,t){return y(e>>t&63|128)}function u(e){if(0==(4294967168&e))return y(e);var t="";return 0==(4294965248&e)?t=y(e>>6&31|192):0==(4294901760&e)?(t=y(e>>12&15|224),t+=s(e,6)):0==(4292870144&e)&&(t=y(e>>18&7|240),t+=s(e,12),t+=s(e,6)),t+=y(63&e|128)}function c(e){for(var t,n=o(e),r=n.length,i=-1,a="";++i<r;)t=n[i],a+=u(t);return a}function l(){if(g>=v)throw Error("Invalid byte index");var e=255&m[g];if(g++,128==(192&e))return 63&e;throw Error("Invalid continuation byte")}function f(){var e,t,n,r,i;if(g>v)throw Error("Invalid byte index");if(g==v)return!1;if(e=255&m[g],g++,0==(128&e))return e;if(192==(224&e)){var t=l();if(i=(31&e)<<6|t,i>=128)return i;throw Error("Invalid continuation byte")}if(224==(240&e)){if(t=l(),n=l(),i=(15&e)<<12|t<<6|n,i>=2048)return i;throw Error("Invalid continuation byte")}if(240==(248&e)&&(t=l(),n=l(),r=l(),i=(15&e)<<18|t<<12|n<<6|r,i>=65536&&1114111>=i))return i;throw Error("Invalid UTF-8 detected")}function d(e){m=o(e),v=m.length,g=0;for(var t,n=[];(t=f())!==!1;)n.push(t);return a(n)}var h="object"==typeof r&&r,p="object"==typeof n&&n&&n.exports==h&&n,_="object"==typeof t&&t;_.global!==_&&_.window!==_||(i=_);var m,v,g,y=String.fromCharCode,b={version:"2.0.0",encode:c,decode:d};if("function"==typeof e&&"object"==typeof e.amd&&e.amd)e(function(){return b});else if(h&&!h.nodeType)if(p)p.exports=b;else{var w={},C=w.hasOwnProperty;
for(var k in b)C.call(b,k)&&(h[k]=b[k])}else i.utf8=b}(this)}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],297:[function(e,t,n){function r(e,t,n){var r;return r=t?new o(e,t):new o(e)}var i=function(){return this}(),o=i.WebSocket||i.MozWebSocket;t.exports=o?r:null,o&&(r.prototype=o.prototype)},{}],298:[function(e,t,n){(function(t){var r=e("isarray"),i=e("./is-buffer");n.deconstructPacket=function(e){function t(e){if(!e)return e;if(i(e)){var o={_placeholder:!0,num:n.length};return n.push(e),o}if(r(e)){for(var a=new Array(e.length),s=0;s<e.length;s++)a[s]=t(e[s]);return a}if("object"==typeof e&&!(e instanceof Date)){var a={};for(var u in e)a[u]=t(e[u]);return a}return e}var n=[],o=e.data,a=e;return a.data=t(o),a.attachments=n.length,{packet:a,buffers:n}},n.reconstructPacket=function(e,t){function n(e){if(e&&e._placeholder){var i=t[e.num];return i}if(r(e)){for(var o=0;o<e.length;o++)e[o]=n(e[o]);return e}if(e&&"object"==typeof e){for(var a in e)e[a]=n(e[a]);return e}return e}return e.data=n(e.data),e.attachments=void 0,e},n.removeBlobs=function(e,n){function o(e,u,c){if(!e)return e;if(t.Blob&&e instanceof Blob||t.File&&e instanceof File){a++;var l=new FileReader;l.onload=function(){c?c[u]=this.result:s=this.result,--a||n(s)},l.readAsArrayBuffer(e)}else if(r(e))for(var f=0;f<e.length;f++)o(e[f],f,e);else if(e&&"object"==typeof e&&!i(e))for(var d in e)o(e[d],d,e)}var a=0,s=e;o(s),a||n(s)}}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./is-buffer":300,isarray:260}],299:[function(e,t,n){function r(){}function i(e){var t="",r=!1;return t+=e.type,n.BINARY_EVENT!=e.type&&n.BINARY_ACK!=e.type||(t+=e.attachments,t+="-"),e.nsp&&"/"!=e.nsp&&(r=!0,t+=e.nsp),null!=e.id&&(r&&(t+=",",r=!1),t+=e.id),null!=e.data&&(r&&(t+=","),t+=f.stringify(e.data)),l("encoded %j as %s",e,t),t}function o(e,t){function n(e){var n=h.deconstructPacket(e),r=i(n.packet),o=n.buffers;o.unshift(r),t(o)}h.removeBlobs(e,n)}function a(){this.reconstructor=null}function s(e){var t={},r=0;if(t.type=Number(e.charAt(0)),null==n.types[t.type])return c();if(n.BINARY_EVENT==t.type||n.BINARY_ACK==t.type){for(t.attachments="";"-"!=e.charAt(++r);)t.attachments+=e.charAt(r);t.attachments=Number(t.attachments)}if("/"==e.charAt(r+1))for(t.nsp="";++r;){var i=e.charAt(r);if(","==i)break;if(t.nsp+=i,r+1==e.length)break}else t.nsp="/";var o=e.charAt(r+1);if(""!=o&&Number(o)==o){for(t.id="";++r;){var i=e.charAt(r);if(null==i||Number(i)!=i){--r;break}if(t.id+=e.charAt(r),r+1==e.length)break}t.id=Number(t.id)}if(e.charAt(++r))try{t.data=f.parse(e.substr(r))}catch(a){return c()}return l("decoded %s as %j",e,t),t}function u(e){this.reconPack=e,this.buffers=[]}function c(e){return{type:n.ERROR,data:"parser error"}}var l=e("debug")("socket.io-parser"),f=e("json3"),d=(e("isarray"),e("component-emitter")),h=e("./binary"),p=e("./is-buffer");n.protocol=4,n.types=["CONNECT","DISCONNECT","EVENT","BINARY_EVENT","ACK","BINARY_ACK","ERROR"],n.CONNECT=0,n.DISCONNECT=1,n.EVENT=2,n.ACK=3,n.ERROR=4,n.BINARY_EVENT=5,n.BINARY_ACK=6,n.Encoder=r,n.Decoder=a,r.prototype.encode=function(e,t){if(l("encoding packet %j",e),n.BINARY_EVENT==e.type||n.BINARY_ACK==e.type)o(e,t);else{var r=i(e);t([r])}},d(a.prototype),a.prototype.add=function(e){var t;if("string"==typeof e)t=s(e),n.BINARY_EVENT==t.type||n.BINARY_ACK==t.type?(this.reconstructor=new u(t),0==this.reconstructor.reconPack.attachments&&this.emit("decoded",t)):this.emit("decoded",t);else{if(!p(e)&&!e.base64)throw new Error("Unknown type: "+e);if(!this.reconstructor)throw new Error("got binary data when not reconstructing a packet");t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,this.emit("decoded",t))}},a.prototype.destroy=function(){this.reconstructor&&this.reconstructor.finishedReconstruction()},u.prototype.takeBinaryData=function(e){if(this.buffers.push(e),this.buffers.length==this.reconPack.attachments){var t=h.reconstructPacket(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null},u.prototype.finishedReconstruction=function(){this.reconPack=null,this.buffers=[]}},{"./binary":298,"./is-buffer":300,"component-emitter":135,debug:301,isarray:260,json3:261}],300:[function(e,t,n){(function(e){function n(t){return e.Buffer&&e.Buffer.isBuffer(t)||e.ArrayBuffer&&t instanceof ArrayBuffer}t.exports=n}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],301:[function(e,t,n){arguments[4][276][0].apply(n,arguments)},{dup:276}],302:[function(e,t,n){function r(e,t){var n=[];t=t||0;for(var r=t||0;r<e.length;r++)n[r-t]=e[r];return n}t.exports=r},{}],303:[function(t,n,r){!function(t,i){"use strict";var o="0.7.9",a="",s="?",u="function",c="undefined",l="object",f="string",d="major",h="model",p="name",_="type",m="vendor",v="version",g="architecture",y="console",b="mobile",w="tablet",C="smarttv",k="wearable",E="embedded",S={extend:function(e,t){for(var n in t)-1!=="browser cpu device engine os".indexOf(n)&&t[n].length%2===0&&(e[n]=t[n].concat(e[n]));return e},has:function(e,t){return"string"==typeof e&&-1!==t.toLowerCase().indexOf(e.toLowerCase())},lowerize:function(e){return e.toLowerCase()},major:function(e){return typeof e===f?e.split(".")[0]:i}},T={rgx:function(){for(var e,t,n,r,o,a,s,f=0,d=arguments;f<d.length&&!a;){var h=d[f],p=d[f+1];if(typeof e===c){e={};for(r in p)o=p[r],typeof o===l?e[o[0]]=i:e[o]=i}for(t=n=0;t<h.length&&!a;)if(a=h[t++].exec(this.getUA()))for(r=0;r<p.length;r++)s=a[++n],o=p[r],typeof o===l&&o.length>0?2==o.length?typeof o[1]==u?e[o[0]]=o[1].call(this,s):e[o[0]]=o[1]:3==o.length?typeof o[1]!==u||o[1].exec&&o[1].test?e[o[0]]=s?s.replace(o[1],o[2]):i:e[o[0]]=s?o[1].call(this,s,o[2]):i:4==o.length&&(e[o[0]]=s?o[3].call(this,s.replace(o[1],o[2])):i):e[o]=s?s:i;f+=2}return e},str:function(e,t){for(var n in t)if(typeof t[n]===l&&t[n].length>0){for(var r=0;r<t[n].length;r++)if(S.has(t[n][r],e))return n===s?i:n}else if(S.has(t[n],e))return n===s?i:n;return e}},j={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},A={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[p,v],[/\s(opr)\/([\w\.]+)/i],[[p,"Opera"],v],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]+)*/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium)\/([\w\.-]+)/i],[p,v],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[p,"IE"],v],[/(edge)\/((\d+)?[\w\.]+)/i],[p,v],[/(yabrowser)\/([\w\.]+)/i],[[p,"Yandex"],v],[/(comodo_dragon)\/([\w\.]+)/i],[[p,/_/g," "],v],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,/(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i],[p,v],[/(dolfin)\/([\w\.]+)/i],[[p,"Dolphin"],v],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[p,"Chrome"],v],[/XiaoMi\/MiuiBrowser\/([\w\.]+)/i],[v,[p,"MIUI Browser"]],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i],[v,[p,"Android Browser"]],[/FBAV\/([\w\.]+);/i],[v,[p,"Facebook"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[v,[p,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[v,p],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[p,[v,T.str,j.browser.oldsafari.version]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],[p,v],[/(navigator|netscape)\/([\w\.-]+)/i],[[p,"Netscape"],v],[/fxios\/([\w\.-]+)/i],[v,[p,"Firefox"]],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]+)*/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[p,v]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[g,"amd64"]],[/(ia32(?=;))/i],[[g,S.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[g,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[g,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[g,/ower/,"",S.lowerize]],[/(sun4\w)[;\)]/i],[[g,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[g,S.lowerize]]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[h,m,[_,w]],[/applecoremedia\/[\w\.]+ \((ipad)/],[h,[m,"Apple"],[_,w]],[/(apple\s{0,1}tv)/i],[[h,"Apple TV"],[m,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[m,h,[_,w]],[/(kf[A-z]+)\sbuild\/[\w\.]+.*silk\//i],[h,[m,"Amazon"],[_,w]],[/(sd|kf)[0349hijorstuw]+\sbuild\/[\w\.]+.*silk\//i],[[h,T.str,j.device.amazon.model],[m,"Amazon"],[_,b]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[h,m,[_,b]],[/\((ip[honed|\s\w*]+);/i],[h,[m,"Apple"],[_,b]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|huawei|meizu|motorola|polytron)[\s_-]?([\w-]+)*/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[m,h,[_,b]],[/\(bb10;\s(\w+)/i],[h,[m,"BlackBerry"],[_,b]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7)/i],[h,[m,"Asus"],[_,w]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[m,"Sony"],[h,"Xperia Tablet"],[_,w]],[/(?:sony)?(?:(?:(?:c|d)\d{4})|(?:so[-l].+))\sbuild\//i],[[m,"Sony"],[h,"Xperia Phone"],[_,b]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[m,h,[_,y]],[/android.+;\s(shield)\sbuild/i],[h,[m,"Nvidia"],[_,y]],[/(playstation\s[3portablevi]+)/i],[h,[m,"Sony"],[_,y]],[/(sprint\s(\w+))/i],[[m,T.str,j.device.sprint.vendor],[h,T.str,j.device.sprint.model],[_,b]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[m,h,[_,w]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w+)*/i,/(alcatel|geeksphone|huawei|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]+)*/i],[m,[h,/_/g," "],[_,b]],[/(nexus\s9)/i],[h,[m,"HTC"],[_,w]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[h,[m,"Microsoft"],[_,y]],[/(kin\.[onetw]{3})/i],[[h,/\./g," "],[m,"Microsoft"],[_,b]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?(:?\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w+)*/i,/(XT\d{3,4}) build\//i],[h,[m,"Motorola"],[_,b]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[h,[m,"Motorola"],[_,w]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n8000|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[m,"Samsung"],h,[_,w]],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-n900))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)*/i,/sec-((sgh\w+))/i],[[m,"Samsung"],h,[_,b]],[/(samsung);smarttv/i],[m,h,[_,C]],[/\(dtv[\);].+(aquos)/i],[h,[m,"Sharp"],[_,C]],[/sie-(\w+)*/i],[h,[m,"Siemens"],[_,b]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]+)*/i],[[m,"Nokia"],h,[_,b]],[/android\s3\.[\s\w;-]{10}(a\d{3})/i],[h,[m,"Acer"],[_,w]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[m,"LG"],h,[_,w]],[/(lg) netcast\.tv/i],[m,h,[_,C]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w+)*/i],[h,[m,"LG"],[_,b]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[h,[m,"Lenovo"],[_,w]],[/linux;.+((jolla));/i],[m,h,[_,b]],[/((pebble))app\/[\d\.]+\s/i],[m,h,[_,k]],[/android.+;\s(glass)\s\d/i],[h,[m,"Google"],[_,k]],[/android.+(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus)?[\s_]*(?:\d\w)?)\s+build/i],[[h,/_/g," "],[m,"Xiaomi"],[_,b]],[/(mobile|tablet);.+rv\:.+gecko\//i],[[_,S.lowerize],m,h]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[v,[p,"EdgeHTML"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[p,v],[/rv\:([\w\.]+).*(gecko)/i],[v,p]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[p,v],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[p,[v,T.str,j.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[p,"Windows"],[v,T.str,j.os.windows.version]],[/\((bb)(10);/i],[[p,"BlackBerry"],v],[/(blackberry)\w*\/?([\w\.]+)*/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,/linux;.+(sailfish);/i],[p,v],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i],[[p,"Symbian"],v],[/\((series40);/i],[p],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[p,"Firefox OS"],v],[/(nintendo|playstation)\s([wids3portablevu]+)/i,/(mint)[\/\s\(]?(\w+)*/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,/(hurd|linux)\s?([\w\.]+)*/i,/(gnu)\s?([\w\.]+)*/i],[p,v],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[p,"Chromium OS"],v],[/(sunos)\s?([\w\.]+\d)*/i],[[p,"Solaris"],v],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i],[p,v],[/(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i],[[p,"iOS"],[v,/_/g,"."]],[/(mac\sos\sx)\s?([\w\s\.]+\w)*/i,/(macintosh|mac(?=_powerpc)\s)/i],[[p,"Mac OS"],[v,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,/(haiku)\s(\w+)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,/(unix)\s?([\w\.]+)*/i],[p,v]]},I=function(e,n){if(!(this instanceof I))return new I(e,n).getResult();var r=e||(t&&t.navigator&&t.navigator.userAgent?t.navigator.userAgent:a),i=n?S.extend(A,n):A;return this.getBrowser=function(){var e=T.rgx.apply(this,i.browser);return e.major=S.major(e.version),e},this.getCPU=function(){return T.rgx.apply(this,i.cpu)},this.getDevice=function(){return T.rgx.apply(this,i.device)},this.getEngine=function(){return T.rgx.apply(this,i.engine)},this.getOS=function(){return T.rgx.apply(this,i.os)},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return r},this.setUA=function(e){return r=e,this},this.setUA(r),this};I.VERSION=o,I.BROWSER={NAME:p,MAJOR:d,VERSION:v},I.CPU={ARCHITECTURE:g},I.DEVICE={MODEL:h,VENDOR:m,TYPE:_,CONSOLE:y,MOBILE:b,SMARTTV:C,TABLET:w,WEARABLE:k,EMBEDDED:E},I.ENGINE={NAME:p,VERSION:v},I.OS={NAME:p,VERSION:v},typeof r!==c?(typeof n!==c&&n.exports&&(r=n.exports=I),r.UAParser=I):typeof e===u&&e.amd?e(function(){return I}):t.UAParser=I;var D=t.jQuery||t.Zepto;if(typeof D!==c){var P=new I;D.ua=P.getResult(),D.ua.get=function(){return P.getUA()},D.ua.set=function(e){P.setUA(e);var t=P.getResult();for(var n in t)D.ua[n]=t[n]}}}("object"==typeof window?window:this)},{}],304:[function(t,n,r){(function(){var t=this,i=t._,o={},a=Array.prototype,s=Object.prototype,u=Function.prototype,c=a.push,l=a.slice,f=a.concat,d=s.toString,h=s.hasOwnProperty,p=a.forEach,_=a.map,m=a.reduce,v=a.reduceRight,g=a.filter,y=a.every,b=a.some,w=a.indexOf,C=a.lastIndexOf,k=Array.isArray,E=Object.keys,S=u.bind,T=function(e){return e instanceof T?e:this instanceof T?void(this._wrapped=e):new T(e)};"undefined"!=typeof r?("undefined"!=typeof n&&n.exports&&(r=n.exports=T),r._=T):t._=T,T.VERSION="1.6.0";var j=T.each=T.forEach=function(e,t,n){if(null==e)return e;if(p&&e.forEach===p)e.forEach(t,n);else if(e.length===+e.length){for(var r=0,i=e.length;i>r;r++)if(t.call(n,e[r],r,e)===o)return}else for(var a=T.keys(e),r=0,i=a.length;i>r;r++)if(t.call(n,e[a[r]],a[r],e)===o)return;return e};T.map=T.collect=function(e,t,n){var r=[];return null==e?r:_&&e.map===_?e.map(t,n):(j(e,function(e,i,o){r.push(t.call(n,e,i,o))}),r)};var A="Reduce of empty array with no initial value";T.reduce=T.foldl=T.inject=function(e,t,n,r){var i=arguments.length>2;if(null==e&&(e=[]),m&&e.reduce===m)return r&&(t=T.bind(t,r)),i?e.reduce(t,n):e.reduce(t);if(j(e,function(e,o,a){i?n=t.call(r,n,e,o,a):(n=e,i=!0)}),!i)throw new TypeError(A);return n},T.reduceRight=T.foldr=function(e,t,n,r){var i=arguments.length>2;if(null==e&&(e=[]),v&&e.reduceRight===v)return r&&(t=T.bind(t,r)),i?e.reduceRight(t,n):e.reduceRight(t);var o=e.length;if(o!==+o){var a=T.keys(e);o=a.length}if(j(e,function(s,u,c){u=a?a[--o]:--o,i?n=t.call(r,n,e[u],u,c):(n=e[u],i=!0)}),!i)throw new TypeError(A);return n},T.find=T.detect=function(e,t,n){var r;return I(e,function(e,i,o){return t.call(n,e,i,o)?(r=e,!0):void 0}),r},T.filter=T.select=function(e,t,n){var r=[];return null==e?r:g&&e.filter===g?e.filter(t,n):(j(e,function(e,i,o){t.call(n,e,i,o)&&r.push(e)}),r)},T.reject=function(e,t,n){return T.filter(e,function(e,r,i){return!t.call(n,e,r,i)},n)},T.every=T.all=function(e,t,n){t||(t=T.identity);var r=!0;return null==e?r:y&&e.every===y?e.every(t,n):(j(e,function(e,i,a){return(r=r&&t.call(n,e,i,a))?void 0:o}),!!r)};var I=T.some=T.any=function(e,t,n){t||(t=T.identity);var r=!1;return null==e?r:b&&e.some===b?e.some(t,n):(j(e,function(e,i,a){return r||(r=t.call(n,e,i,a))?o:void 0}),!!r)};T.contains=T.include=function(e,t){return null!=e&&(w&&e.indexOf===w?-1!=e.indexOf(t):I(e,function(e){return e===t}))},T.invoke=function(e,t){var n=l.call(arguments,2),r=T.isFunction(t);return T.map(e,function(e){return(r?t:e[t]).apply(e,n)})},T.pluck=function(e,t){return T.map(e,T.property(t))},T.where=function(e,t){return T.filter(e,T.matches(t))},T.findWhere=function(e,t){return T.find(e,T.matches(t))},T.max=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);var r=-(1/0),i=-(1/0);return j(e,function(e,o,a){var s=t?t.call(n,e,o,a):e;s>i&&(r=e,i=s)}),r},T.min=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);var r=1/0,i=1/0;return j(e,function(e,o,a){var s=t?t.call(n,e,o,a):e;i>s&&(r=e,i=s)}),r},T.shuffle=function(e){var t,n=0,r=[];return j(e,function(e){t=T.random(n++),r[n-1]=r[t],r[t]=e}),r},T.sample=function(e,t,n){return null==t||n?(e.length!==+e.length&&(e=T.values(e)),e[T.random(e.length-1)]):T.shuffle(e).slice(0,Math.max(0,t))};var D=function(e){return null==e?T.identity:T.isFunction(e)?e:T.property(e)};T.sortBy=function(e,t,n){return t=D(t),T.pluck(T.map(e,function(e,r,i){return{value:e,index:r,criteria:t.call(n,e,r,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||void 0===n)return 1;if(r>n||void 0===r)return-1}return e.index-t.index}),"value")};var P=function(e){return function(t,n,r){var i={};return n=D(n),j(t,function(o,a){var s=n.call(r,o,a,t);e(i,s,o)}),i}};T.groupBy=P(function(e,t,n){T.has(e,t)?e[t].push(n):e[t]=[n]}),T.indexBy=P(function(e,t,n){e[t]=n}),T.countBy=P(function(e,t){T.has(e,t)?e[t]++:e[t]=1}),T.sortedIndex=function(e,t,n,r){n=D(n);for(var i=n.call(r,t),o=0,a=e.length;a>o;){var s=o+a>>>1;n.call(r,e[s])<i?o=s+1:a=s}return o},T.toArray=function(e){return e?T.isArray(e)?l.call(e):e.length===+e.length?T.map(e,T.identity):T.values(e):[]},T.size=function(e){return null==e?0:e.length===+e.length?e.length:T.keys(e).length},T.first=T.head=T.take=function(e,t,n){return null!=e?null==t||n?e[0]:0>t?[]:l.call(e,0,t):void 0},T.initial=function(e,t,n){return l.call(e,0,e.length-(null==t||n?1:t))},T.last=function(e,t,n){return null!=e?null==t||n?e[e.length-1]:l.call(e,Math.max(e.length-t,0)):void 0},T.rest=T.tail=T.drop=function(e,t,n){return l.call(e,null==t||n?1:t)},T.compact=function(e){return T.filter(e,T.identity)};var R=function(e,t,n){return t&&T.every(e,T.isArray)?f.apply(n,e):(j(e,function(e){T.isArray(e)||T.isArguments(e)?t?c.apply(n,e):R(e,t,n):n.push(e)}),n)};T.flatten=function(e,t){return R(e,t,[])},T.without=function(e){return T.difference(e,l.call(arguments,1))},T.partition=function(e,t){var n=[],r=[];return j(e,function(e){(t(e)?n:r).push(e)}),[n,r]},T.uniq=T.unique=function(e,t,n,r){T.isFunction(t)&&(r=n,n=t,t=!1);var i=n?T.map(e,n,r):e,o=[],a=[];return j(i,function(n,r){(t?r&&a[a.length-1]===n:T.contains(a,n))||(a.push(n),o.push(e[r]))}),o},T.union=function(){return T.uniq(T.flatten(arguments,!0))},T.intersection=function(e){var t=l.call(arguments,1);return T.filter(T.uniq(e),function(e){return T.every(t,function(t){return T.contains(t,e)})})},T.difference=function(e){var t=f.apply(a,l.call(arguments,1));return T.filter(e,function(e){return!T.contains(t,e)})},T.zip=function(){for(var e=T.max(T.pluck(arguments,"length").concat(0)),t=new Array(e),n=0;e>n;n++)t[n]=T.pluck(arguments,""+n);return t},T.object=function(e,t){if(null==e)return{};for(var n={},r=0,i=e.length;i>r;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},T.indexOf=function(e,t,n){if(null==e)return-1;var r=0,i=e.length;if(n){if("number"!=typeof n)return r=T.sortedIndex(e,t),e[r]===t?r:-1;r=0>n?Math.max(0,i+n):n}if(w&&e.indexOf===w)return e.indexOf(t,n);for(;i>r;r++)if(e[r]===t)return r;return-1},T.lastIndexOf=function(e,t,n){if(null==e)return-1;var r=null!=n;if(C&&e.lastIndexOf===C)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);for(var i=r?n:e.length;i--;)if(e[i]===t)return i;return-1},T.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;for(var r=Math.max(Math.ceil((t-e)/n),0),i=0,o=new Array(r);r>i;)o[i++]=e,e+=n;return o};var M=function(){};T.bind=function(e,t){var n,r;if(S&&e.bind===S)return S.apply(e,l.call(arguments,1));if(!T.isFunction(e))throw new TypeError;return n=l.call(arguments,2),r=function(){if(!(this instanceof r))return e.apply(t,n.concat(l.call(arguments)));M.prototype=e.prototype;var i=new M;M.prototype=null;var o=e.apply(i,n.concat(l.call(arguments)));return Object(o)===o?o:i}},T.partial=function(e){var t=l.call(arguments,1);return function(){for(var n=0,r=t.slice(),i=0,o=r.length;o>i;i++)r[i]===T&&(r[i]=arguments[n++]);for(;n<arguments.length;)r.push(arguments[n++]);return e.apply(this,r)}},T.bindAll=function(e){var t=l.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return j(t,function(t){e[t]=T.bind(e[t],e)}),e},T.memoize=function(e,t){var n={};return t||(t=T.identity),function(){var r=t.apply(this,arguments);return T.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},T.delay=function(e,t){var n=l.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},T.defer=function(e){return T.delay.apply(T,[e,1].concat(l.call(arguments,1)))},T.throttle=function(e,t,n){var r,i,o,a=null,s=0;n||(n={});var u=function(){s=n.leading===!1?0:T.now(),a=null,o=e.apply(r,i),r=i=null};return function(){var c=T.now();s||n.leading!==!1||(s=c);var l=t-(c-s);return r=this,i=arguments,0>=l?(clearTimeout(a),a=null,s=c,o=e.apply(r,i),r=i=null):a||n.trailing===!1||(a=setTimeout(u,l)),o}},T.debounce=function(e,t,n){var r,i,o,a,s,u=function(){var c=T.now()-a;t>c?r=setTimeout(u,t-c):(r=null,n||(s=e.apply(o,i),o=i=null))};return function(){o=this,i=arguments,a=T.now();var c=n&&!r;return r||(r=setTimeout(u,t)),c&&(s=e.apply(o,i),o=i=null),s}},T.once=function(e){var t,n=!1;return function(){return n?t:(n=!0,t=e.apply(this,arguments),e=null,t)}},T.wrap=function(e,t){return T.partial(t,e)},T.compose=function(){var e=arguments;return function(){for(var t=arguments,n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},T.after=function(e,t){return function(){return--e<1?t.apply(this,arguments):void 0}},T.keys=function(e){if(!T.isObject(e))return[];if(E)return E(e);var t=[];for(var n in e)T.has(e,n)&&t.push(n);return t},T.values=function(e){for(var t=T.keys(e),n=t.length,r=new Array(n),i=0;n>i;i++)r[i]=e[t[i]];return r},T.pairs=function(e){for(var t=T.keys(e),n=t.length,r=new Array(n),i=0;n>i;i++)r[i]=[t[i],e[t[i]]];return r},T.invert=function(e){for(var t={},n=T.keys(e),r=0,i=n.length;i>r;r++)t[e[n[r]]]=n[r];return t},T.functions=T.methods=function(e){var t=[];for(var n in e)T.isFunction(e[n])&&t.push(n);return t.sort()},T.extend=function(e){return j(l.call(arguments,1),function(t){if(t)for(var n in t)e[n]=t[n]}),e},T.pick=function(e){var t={},n=f.apply(a,l.call(arguments,1));return j(n,function(n){n in e&&(t[n]=e[n])}),t},T.omit=function(e){var t={},n=f.apply(a,l.call(arguments,1));for(var r in e)T.contains(n,r)||(t[r]=e[r]);return t},T.defaults=function(e){return j(l.call(arguments,1),function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])}),e},T.clone=function(e){return T.isObject(e)?T.isArray(e)?e.slice():T.extend({},e):e},T.tap=function(e,t){return t(e),e};var x=function(e,t,n,r){if(e===t)return 0!==e||1/e==1/t;if(null==e||null==t)return e===t;e instanceof T&&(e=e._wrapped),t instanceof T&&(t=t._wrapped);var i=d.call(e);if(i!=d.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:0==e?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if("object"!=typeof e||"object"!=typeof t)return!1;for(var o=n.length;o--;)if(n[o]==e)return r[o]==t;var a=e.constructor,s=t.constructor;if(a!==s&&!(T.isFunction(a)&&a instanceof a&&T.isFunction(s)&&s instanceof s)&&"constructor"in e&&"constructor"in t)return!1;n.push(e),r.push(t);var u=0,c=!0;if("[object Array]"==i){if(u=e.length,c=u==t.length)for(;u--&&(c=x(e[u],t[u],n,r)););}else{for(var l in e)if(T.has(e,l)&&(u++,!(c=T.has(t,l)&&x(e[l],t[l],n,r))))break;if(c){for(l in t)if(T.has(t,l)&&!u--)break;c=!u}}return n.pop(),r.pop(),c};T.isEqual=function(e,t){return x(e,t,[],[])},T.isEmpty=function(e){if(null==e)return!0;if(T.isArray(e)||T.isString(e))return 0===e.length;for(var t in e)if(T.has(e,t))return!1;return!0},T.isElement=function(e){return!(!e||1!==e.nodeType)},T.isArray=k||function(e){return"[object Array]"==d.call(e)},T.isObject=function(e){return e===Object(e)},j(["Arguments","Function","String","Number","Date","RegExp"],function(e){T["is"+e]=function(t){return d.call(t)=="[object "+e+"]"}}),T.isArguments(arguments)||(T.isArguments=function(e){return!(!e||!T.has(e,"callee"))}),"function"!=typeof/./&&(T.isFunction=function(e){return"function"==typeof e}),T.isFinite=function(e){return isFinite(e)&&!isNaN(parseFloat(e))},T.isNaN=function(e){return T.isNumber(e)&&e!=+e},T.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"==d.call(e)},T.isNull=function(e){return null===e},T.isUndefined=function(e){return void 0===e},T.has=function(e,t){return h.call(e,t)},T.noConflict=function(){return t._=i,this},T.identity=function(e){return e},T.constant=function(e){return function(){return e}},T.property=function(e){return function(t){return t[e]}},T.matches=function(e){return function(t){if(t===e)return!0;for(var n in e)if(e[n]!==t[n])return!1;return!0}},T.times=function(e,t,n){for(var r=Array(Math.max(0,e)),i=0;e>i;i++)r[i]=t.call(n,i);return r},T.random=function(e,t){return null==t&&(t=e,e=0),e+Math.floor(Math.random()*(t-e+1))},T.now=Date.now||function(){return(new Date).getTime()};var O={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};O.unescape=T.invert(O.escape);var N={escape:new RegExp("["+T.keys(O.escape).join("")+"]","g"),unescape:new RegExp("("+T.keys(O.unescape).join("|")+")","g")};T.each(["escape","unescape"],function(e){T[e]=function(t){return null==t?"":(""+t).replace(N[e],function(t){return O[e][t]})}}),T.result=function(e,t){if(null!=e){var n=e[t];return T.isFunction(n)?n.call(e):n}},T.mixin=function(e){j(T.functions(e),function(t){var n=T[t]=e[t];T.prototype[t]=function(){var e=[this._wrapped];return c.apply(e,arguments),H.call(this,n.apply(T,e))}})};var L=0;T.uniqueId=function(e){var t=++L+"";return e?e+t:t},T.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var U=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},F=/\\|'|\r|\n|\t|\u2028|\u2029/g;T.template=function(e,t,n){var r;n=T.defaults({},n,T.templateSettings);var i=new RegExp([(n.escape||U).source,(n.interpolate||U).source,(n.evaluate||U).source].join("|")+"|$","g"),o=0,a="__p+='";e.replace(i,function(t,n,r,i,s){return a+=e.slice(o,s).replace(F,function(e){return"\\"+B[e]}),n&&(a+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),r&&(a+="'+\n((__t=("+r+"))==null?'':__t)+\n'"),i&&(a+="';\n"+i+"\n__p+='"),o=s+t.length,t}),a+="';\n",n.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{r=new Function(n.variable||"obj","_",a)}catch(s){throw s.source=a,s}if(t)return r(t,T);var u=function(e){return r.call(this,e,T)};return u.source="function("+(n.variable||"obj")+"){\n"+a+"}",u},T.chain=function(e){return T(e).chain()};var H=function(e){return this._chain?T(e).chain():e};T.mixin(T),j(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=a[e];T.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),"shift"!=e&&"splice"!=e||0!==n.length||delete n[0],H.call(this,n)}}),j(["concat","join","slice"],function(e){var t=a[e];T.prototype[e]=function(){return H.call(this,t.apply(this._wrapped,arguments))}}),T.extend(T.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof e&&e.amd&&e("underscore",[],function(){return T})}).call(this)},{}],305:[function(e,t,n){(function(e){var n;if(e.crypto&&crypto.getRandomValues){var r=new Uint8Array(16);n=function(){return crypto.getRandomValues(r),r}}if(!n){var i=new Array(16);n=function(){for(var e,t=0;16>t;t++)0===(3&t)&&(e=4294967296*Math.random()),i[t]=e>>>((3&t)<<3)&255;return i}}t.exports=n}).call(this,"undefined"!=typeof i?i:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],306:[function(e,t,n){function r(e,t,n){var r=t&&n||0,i=0;for(t=t||[],e.toLowerCase().replace(/[0-9a-f]{2}/g,function(e){16>i&&(t[r+i++]=c[e])});16>i;)t[r+i++]=0;return t}function i(e,t){var n=t||0,r=u;return r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+"-"+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]+r[e[n++]]}function o(e,t,n){var r=t&&n||0,o=t||[];e=e||{};var a=void 0!==e.clockseq?e.clockseq:h,s=void 0!==e.msecs?e.msecs:(new Date).getTime(),u=void 0!==e.nsecs?e.nsecs:_+1,c=s-p+(u-_)/1e4;if(0>c&&void 0===e.clockseq&&(a=a+1&16383),(0>c||s>p)&&void 0===e.nsecs&&(u=0),u>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");p=s,_=u,h=a,s+=122192928e5;var l=(1e4*(268435455&s)+u)%4294967296;o[r++]=l>>>24&255,o[r++]=l>>>16&255,o[r++]=l>>>8&255,o[r++]=255&l;var f=s/4294967296*1e4&268435455;o[r++]=f>>>8&255,o[r++]=255&f,o[r++]=f>>>24&15|16,o[r++]=f>>>16&255,o[r++]=a>>>8|128,o[r++]=255&a;for(var m=e.node||d,v=0;6>v;v++)o[r+v]=m[v];return t?t:i(o)}function a(e,t,n){var r=t&&n||0;"string"==typeof e&&(t="binary"==e?new Array(16):null,e=null),e=e||{};var o=e.random||(e.rng||s)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t)for(var a=0;16>a;a++)t[r+a]=o[a];return t||i(o)}for(var s=e("./rng"),u=[],c={},l=0;256>l;l++)u[l]=(l+256).toString(16).substr(1),c[u[l]]=l;var f=s(),d=[1|f[0],f[1],f[2],f[3],f[4],f[5]],h=16383&(f[6]<<8|f[7]),p=0,_=0,m=a;m.v1=o,m.v4=a,m.parse=r,m.unparse=i,t.exports=m},{"./rng":305}]},{},[31])(31)})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[17])(17)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],24:[function(require,module,exports){
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
            _videoJs2['default'].log('Cast video: ' + this.player_.cache_.src);
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

            this.apiSession = session;
            var source = this.player_.cache_.src;
            var type = this.player_.currentType();

            _videoJs2['default'].log('Session initialized: ' + session.sessionId + ' source : ' + source + ' type : ' + type);

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
            var tracks = [];
            var i = 0;
            var remotePlTrack = undefined;
            var plTrack = undefined;
            var trackId = 0;
            var track = undefined;
            if (plTracks) {
                for (i = 0; i < plTracks.length; i++) {
                    plTrack = plTracks.tracks_[i];
                    remotePlTrack = remotePlTracks && remotePlTracks.trackElements_ && remotePlTracks.trackElements_[i];
                    trackId++;
                    track = new chrome.cast.media.Track(trackId, chrome.cast.media.TrackType.TEXT);
                    track.trackContentId = remotePlTrack ? remotePlTrack.src : 'caption_' + plTrack.language;
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
            }
            // Load/Add audio tracks

            try {
                plTracks = this.player().audioTracks();
                if (plTracks) {
                    for (i = 0; i < plTracks.length; i++) {
                        plTrack = plTracks.tracks_[i];
                        trackId++;
                        track = new chrome.cast.media.Track(trackId, chrome.cast.media.TrackType.AUDIO);
                        track.subtype = null;
                        track.name = plTrack.label;
                        track.language = plTrack.language;
                        track.customData = null;
                        tracks.push(track);
                    }
                }
            } catch (e) {
                _videoJs2['default'].log('get player audioTracks fail' + e);
            }

            if (tracks.length) {
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
},{}],25:[function(require,module,exports){
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
},{"./videojs-chromecast":27}],26:[function(require,module,exports){
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
                var changeHandler = _this.handleTextTracksChange.bind(_this);

                tracks.addEventListener('change', changeHandler);
                _this.on('dispose', function () {
                    tracks.removeEventListener('change', changeHandler);
                });

                _this.handleTextTracksChange();
            })();
        }

        try {
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
        } catch (e) {
            _videoJs2['default'].log('get player audioTracks fail' + e);
        }

        try {
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
        } catch (e) {
            _videoJs2['default'].log('get player videoTracks fail' + e);
        }

        this.update();
        this.triggerReady();
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
        key: 'currentSrc',
        value: function currentSrc() {
            if (!this.apiMedia) {
                return;
            }
            return this.apiMedia.media.contentId;
        }
    }, {
        key: 'handleAudioTracksChange',
        value: function handleAudioTracksChange() {
            var trackInfo = [];
            var tTracks = this.textTracks();
            var tracks = this.audioTracks();

            if (!tracks) {
                return;
            }

            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                if (track['enabled']) {
                    //set id of cuurentTrack audio
                    trackInfo.push(i + 1 + tTracks.length);
                }
            }

            if (this.apiMedia && trackInfo.length) {
                this.tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(trackInfo);
                return this.apiMedia.editTracksInfo(this.tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
            }
        }
    }, {
        key: 'handleVideoTracksChange',
        value: function handleVideoTracksChange() {}
    }, {
        key: 'handleTextTracksChange',
        value: function handleTextTracksChange() {
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

            if (this.apiMedia && trackInfo.length) {
                this.tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(trackInfo);
                return this.apiMedia.editTracksInfo(this.tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
            }
        }
    }, {
        key: 'onTrackSuccess',
        value: function onTrackSuccess() {
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
            return this.apiMedia.getEstimatedTime();
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
            return this.apiMedia.media.duration || Infinity;
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
},{}],27:[function(require,module,exports){
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
},{"./component/control-bar/chromecast-button":24,"./tech/chromecast":26}],28:[function(require,module,exports){
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
				evt['video_bitrate'] = this.metrics_.video.bandwidth > 0 ? Math.max(-1, Math.round(this.metrics_.video.bandwidth)) : -1;
				evt['audio_bitrate'] = this.metrics_.audio.bandwidth > 0 ? Math.max(-1, Math.round(this.metrics_.audio.bandwidth)) : -1;
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
},{"./utils.js":30,"global/document":21,"global/window":22,"xhr":32}],29:[function(require,module,exports){
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
},{"./metrics":28}],30:[function(require,module,exports){
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
},{"global/document":21,"global/window":22}],31:[function(require,module,exports){
(function (global){
/**
 * @file Youtube.js
 * Youtube Media Controller - Wrapper for HTML5 Media API
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
var Tech = _videoJs2['default'].getComponent('Tech');

/**
 * Youtube Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Tech
 * @class Youtube
 */

var Youtube = (function (_Tech) {
  _inherits(Youtube, _Tech);

  function Youtube(options, ready) {
    _classCallCheck(this, Youtube);

    _get(Object.getPrototypeOf(Youtube.prototype), 'constructor', this).call(this, options, ready);

    this.setPoster(options.poster);
    this.setSrc(this.options_.source, true);
    // Set the vjs-youtube class to the player
    // Parent is not set yet so we have to wait a tick
    setTimeout((function () {
      this.el_.parentNode.className += ' vjs-youtube';

      if (_isOnMobile) {
        this.el_.parentNode.className += ' vjs-youtube-mobile';
      }

      if (Youtube.isApiReady) {
        this.initYTPlayer();
      } else {
        Youtube.apiReadyQueue.push(this);
      }
    }).bind(this));
  }

  _createClass(Youtube, [{
    key: 'dispose',
    value: function dispose() {
      this.el_.parentNode.className = this.el_.parentNode.className.replace(' vjs-youtube', '').replace(' vjs-youtube-mobile', '');
      _get(Object.getPrototypeOf(Youtube.prototype), 'dispose', this).call(this, this);
    }
  }, {
    key: 'createEl',
    value: function createEl() {

      var div = _videoJs2['default'].createEl('div', {
        id: this.options_.techId,
        style: 'width:100%;height:100%;top:0;left:0;position:absolute'
      });

      var divWrapper = _videoJs2['default'].createEl('div');
      divWrapper.appendChild(div);

      if (!_isOnMobile && !this.options_.ytControls) {
        var divBlocker = _videoJs2['default'].createEl('div', {
          className: 'vjs-iframe-blocker',
          style: 'position:absolute;top:0;left:0;width:100%;height:100%'
        });

        // In case the blocker is still there and we want to pause
        divBlocker.onclick = this.pause.bind(this);

        divWrapper.appendChild(divBlocker);
      }

      return divWrapper;
    }
  }, {
    key: 'initYTPlayer',
    value: function initYTPlayer() {
      var playerVars = {
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        loop: this.options_.loop ? 1 : 0
      };

      // Let the user set any YouTube parameter
      // https://developers.google.com/youtube/player_parameters?playerVersion=HTML5#Parameters
      // To use YouTube controls, you must use ytControls instead
      // To use the loop or autoplay, use the video.js settings

      if (typeof this.options_.autohide !== 'undefined') {
        playerVars.autohide = this.options_.autohide;
      }

      if (typeof this.options_['cc_load_policy'] !== 'undefined') {
        playerVars['cc_load_policy'] = this.options_['cc_load_policy'];
      }

      if (typeof this.options_.ytControls !== 'undefined') {
        playerVars.controls = this.options_.ytControls;
      }

      if (typeof this.options_.disablekb !== 'undefined') {
        playerVars.disablekb = this.options_.disablekb;
      }

      if (typeof this.options_.end !== 'undefined') {
        playerVars.end = this.options_.end;
      }

      if (typeof this.options_.color !== 'undefined') {
        playerVars.color = this.options_.color;
      }

      if (!playerVars.controls) {
        // Let video.js handle the fullscreen unless it is the YouTube native controls
        playerVars.fs = 0;
      } else if (typeof this.options_.fs !== 'undefined') {
        playerVars.fs = this.options_.fs;
      }

      if (typeof this.options_.end !== 'undefined') {
        playerVars.end = this.options_.end;
      }

      if (typeof this.options_.hl !== 'undefined') {
        playerVars.hl = this.options_.hl;
      } else if (typeof this.options_.language !== 'undefined') {
        // Set the YouTube player on the same language than video.js
        playerVars.hl = this.options_.language.substr(0, 2);
      }

      if (typeof this.options_['iv_load_policy'] !== 'undefined') {
        playerVars['iv_load_policy'] = this.options_['iv_load_policy'];
      }

      if (typeof this.options_.list !== 'undefined') {
        playerVars.list = this.options_.list;
      } else if (this.url && typeof this.url.listId !== 'undefined') {
        playerVars.list = this.url.listId;
      }

      if (typeof this.options_.listType !== 'undefined') {
        playerVars.listType = this.options_.listType;
      }

      if (typeof this.options_.modestbranding !== 'undefined') {
        playerVars.modestbranding = this.options_.modestbranding;
      }

      if (typeof this.options_.playlist !== 'undefined') {
        playerVars.playlist = this.options_.playlist;
      }

      if (typeof this.options_.playsinline !== 'undefined') {
        playerVars.playsinline = this.options_.playsinline;
      }

      if (typeof this.options_.rel !== 'undefined') {
        playerVars.rel = this.options_.rel;
      }

      if (typeof this.options_.showinfo !== 'undefined') {
        playerVars.showinfo = this.options_.showinfo;
      }

      if (typeof this.options_.start !== 'undefined') {
        playerVars.start = this.options_.start;
      }

      if (typeof this.options_.theme !== 'undefined') {
        playerVars.theme = this.options_.theme;
      }

      this.activeVideoId = this.url ? this.url.videoId : null;
      this.activeList = playerVars.list;

      this.ytPlayer = new YT.Player(this.options_.techId, {
        videoId: this.activeVideoId,
        playerVars: playerVars,
        events: {
          onReady: this.onPlayerReady.bind(this),
          onPlaybackQualityChange: this.onPlayerPlaybackQualityChange.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this),
          onError: this.onPlayerError.bind(this)
        }
      });
    }
  }, {
    key: 'onPlayerReady',
    value: function onPlayerReady() {
      this.playerReady_ = true;
      this.triggerReady();

      if (this.playOnReady) {
        this.play();
      }
    }
  }, {
    key: 'onPlayerPlaybackQualityChange',
    value: function onPlayerPlaybackQualityChange() {}
  }, {
    key: 'onPlayerStateChange',
    value: function onPlayerStateChange(e) {
      var state = e.data;

      if (state === this.lastState || this.errorNumber) {
        return;
      }

      switch (state) {
        case -1:
          this.trigger('loadedmetadata');
          this.trigger('durationchange');
          break;

        case YT.PlayerState.ENDED:
          this.trigger('ended');
          break;

        case YT.PlayerState.PLAYING:
          this.trigger('timeupdate');
          this.trigger('durationchange');
          this.trigger('playing');
          this.trigger('play');

          if (this.isSeeking) {
            this.onSeeked();
          }
          break;

        case YT.PlayerState.PAUSED:
          this.trigger('canplay');
          if (this.isSeeking) {
            this.onSeeked();
          } else {
            this.trigger('pause');
          }
          break;

        case YT.PlayerState.BUFFERING:
          this.player_.trigger('timeupdate');
          this.player_.trigger('waiting');
          break;
      }

      this.lastState = state;
    }
  }, {
    key: 'onPlayerError',
    value: function onPlayerError(e) {
      this.errorNumber = e.data;
      this.trigger('error');

      this.ytPlayer.stopVideo();
      this.ytPlayer.destroy();
      this.ytPlayer = null;
    }
  }, {
    key: 'error',
    value: function error() {
      switch (this.errorNumber) {
        case 5:
          return { code: 'Error while trying to play the video' };

        case 2:
        case 100:
        case 150:
          return { code: 'Unable to find the video' };
        case 101:
          return { code: 'Playback on other Websites has been disabled by the video owner.' };
      }

      return { code: 'YouTube unknown error (' + this.errorNumber + ')' };
    }
  }, {
    key: 'src',
    value: function src(_src) {
      if (_src) {
        this.setSrc({ src: _src });

        if (this.options_.autoplay && !_isOnMobile) {
          this.play();
        }
      }

      return this.source;
    }
  }, {
    key: 'poster',
    value: function poster() {
      // You can't start programmaticlly a video with a mobile
      // through the iframe so we hide the poster and the play button (with CSS)
      if (_isOnMobile) {
        return null;
      }

      return this.poster_;
    }
  }, {
    key: 'setPoster',
    value: function setPoster(poster) {
      this.poster_ = poster;
    }
  }, {
    key: 'setSrc',
    value: function setSrc(source) {
      if (!source || !source.src) {
        return;
      }

      delete this.errorNumber;
      this.source = source;
      this.url = Youtube.parseUrl(source.src);

      if (!this.options_.poster) {
        if (this.url.videoId) {
          // Set the low resolution first
          this.poster_ = 'https://img.youtube.com/vi/' + this.url.videoId + '/0.jpg';

          // Check if their is a high res
          this.checkHighResPoster();
        }
      }

      if (this.options_.autoplay && !_isOnMobile) {
        if (this.isReady_) {
          this.play();
        } else {
          this.playOnReady = true;
        }
      }
    }
  }, {
    key: 'play',
    value: function play() {
      if (!this.url || !this.url.videoId) {
        return;
      }

      this.wasPausedBeforeSeek = false;

      if (this.isReady_) {
        if (this.url.listId) {
          if (this.activeList === this.url.listId) {
            this.ytPlayer.playVideo();
          } else {
            this.ytPlayer.loadPlaylist(this.url.listId);
            this.activeList = this.url.listId;
          }
        }

        if (this.activeVideoId === this.url.videoId) {
          this.ytPlayer.playVideo();
        } else {
          this.ytPlayer.loadVideoById(this.url.videoId);
          this.activeVideoId = this.url.videoId;
        }
      } else {
        this.trigger('waiting');
        this.playOnReady = true;
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (this.ytPlayer) {
        this.ytPlayer.pauseVideo();
      }
    }
  }, {
    key: 'paused',
    value: function paused() {
      return this.ytPlayer ? this.lastState !== YT.PlayerState.PLAYING && this.lastState !== YT.PlayerState.BUFFERING : true;
    }
  }, {
    key: 'currentTime',
    value: function currentTime() {
      return this.ytPlayer ? this.ytPlayer.getCurrentTime() : 0;
    }
  }, {
    key: 'setCurrentTime',
    value: function setCurrentTime(seconds) {
      if (this.lastState === YT.PlayerState.PAUSED) {
        this.timeBeforeSeek = this.currentTime();
      }

      if (!this.isSeeking) {
        this.wasPausedBeforeSeek = this.paused();
      }

      this.ytPlayer.seekTo(seconds, true);
      this.trigger('timeupdate');
      this.trigger('seeking');
      this.isSeeking = true;

      // A seek event during pause does not return an event to trigger a seeked event,
      // so run an interval timer to look for the currentTime to change
      if (this.lastState === YT.PlayerState.PAUSED && this.timeBeforeSeek !== seconds) {
        this.clearInterval(this.checkSeekedInPauseInterval);
        this.checkSeekedInPauseInterval = this.setInterval((function () {
          if (this.lastState !== YT.PlayerState.PAUSED || !this.isSeeking) {
            // If something changed while we were waiting for the currentTime to change,
            //  clear the interval timer
            this.clearInterval(this.checkSeekedInPauseInterval);
          } else if (this.currentTime() !== this.timeBeforeSeek) {
            this.trigger('timeupdate');
            this.onSeeked();
          }
        }).bind(this), 250);
      }
    }
  }, {
    key: 'onSeeked',
    value: function onSeeked() {
      this.clearInterval(this.checkSeekedInPauseInterval);
      this.isSeeking = false;

      if (this.wasPausedBeforeSeek) {
        this.pause();
      }

      this.trigger('seeked');
    }
  }, {
    key: 'playbackRate',
    value: function playbackRate() {
      return this.ytPlayer ? this.ytPlayer.getPlaybackRate() : 1;
    }
  }, {
    key: 'setPlaybackRate',
    value: function setPlaybackRate(suggestedRate) {
      if (!this.ytPlayer) {
        return;
      }

      this.ytPlayer.setPlaybackRate(suggestedRate);
      this.trigger('ratechange');
    }
  }, {
    key: 'duration',
    value: function duration() {
      return this.ytPlayer ? this.ytPlayer.getDuration() : 0;
    }
  }, {
    key: 'currentSrc',
    value: function currentSrc() {
      return this.source;
    }
  }, {
    key: 'ended',
    value: function ended() {
      return this.ytPlayer ? this.lastState === YT.PlayerState.ENDED : false;
    }
  }, {
    key: 'volume',
    value: function volume() {
      return this.ytPlayer ? this.ytPlayer.getVolume() / 100.0 : 1;
    }
  }, {
    key: 'setVolume',
    value: function setVolume(percentAsDecimal) {
      if (!this.ytPlayer) {
        return;
      }

      this.ytPlayer.setVolume(percentAsDecimal * 100.0);
      this.setTimeout(function () {
        this.trigger('volumechange');
      }, 50);
    }
  }, {
    key: 'muted',
    value: function muted() {
      return this.ytPlayer ? this.ytPlayer.isMuted() : false;
    }
  }, {
    key: 'setMuted',
    value: function setMuted(mute) {
      if (!this.ytPlayer) {
        return;
      } else {
        this.muted(true);
      }

      if (mute) {
        this.ytPlayer.mute();
      } else {
        this.ytPlayer.unMute();
      }
      this.setTimeout(function () {
        this.trigger('volumechange');
      }, 50);
    }
  }, {
    key: 'buffered',
    value: function buffered() {
      if (!this.ytPlayer || !this.ytPlayer.getVideoLoadedFraction) {
        return {
          length: 0,
          start: function start() {
            throw new Error('This TimeRanges object is empty');
          },
          end: function end() {
            throw new Error('This TimeRanges object is empty');
          }
        };
      }

      var _end = this.ytPlayer.getVideoLoadedFraction() * this.ytPlayer.getDuration();

      return {
        length: this.ytPlayer.getDuration(),
        start: function start() {
          return 0;
        },
        end: function end() {
          return _end;
        }
      };
    }

    // TODO: Can we really do something with this on YouTUbe?
  }, {
    key: 'load',
    value: function load() {}
  }, {
    key: 'resetction',
    value: function resetction() {}
  }, {
    key: 'supportsFullScreen',
    value: function supportsFullScreen() {
      return true;
    }

    // Tries to get the highest resolution thumbnail available for the video
  }, {
    key: 'checkHighResPoster',
    value: function checkHighResPoster() {
      var _this = this;

      var uri = 'https://img.youtube.com/vi/' + this.url.videoId + '/maxresdefault.jpg';

      try {
        (function () {
          var image = new Image();
          image.onload = (function () {
            // Onload may still be called if YouTube returns the 120x90 error thumbnail
            if ('naturalHeight' in image) {
              if (image.naturalHeight <= 90 || image.naturalWidth <= 120) {
                return;
              }
            } else if (image.height <= 90 || image.width <= 120) {
              return;
            }

            this.poster_ = uri;
            this.trigger('posterchange');
          }).bind(_this);
          image.onerror = function () {};
          image.src = uri;
        })();
      } catch (e) {}
    }
  }]);

  return Youtube;
})(Tech);

Youtube.prototype.options_ = {};

Youtube.apiReadyQueue = [];

/* Youtube Support Testing -------------------------------------------------------- */

Youtube.isSupported = function () {
  return true;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Youtube);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Youtube.nativeSourceHandler = {};

var _isOnMobile = /(iPad|iPhone|iPod|Android)/g.test(navigator.userAgent);

Youtube.parseUrl = function (url) {
  var result = {
    videoId: null
  };

  var regex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regex);

  if (match && match[2].length === 11) {
    result.videoId = match[2];
  }

  var regPlaylist = /[?&]list=([^#\&\?]+)/;
  match = url.match(regPlaylist);

  if (match && match[1]) {
    result.listId = match[1];
  }

  return result;
};

var loadApi = function loadApi() {
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

var injectCss = function injectCss() {
  var css = // iframe blocker to catch mouse events
  '.vjs-youtube .vjs-iframe-blocker { display: none; }' + '.vjs-youtube.vjs-user-inactive .vjs-iframe-blocker { display: block; }' + '.vjs-youtube .vjs-poster { background-size: cover; }' + '.vjs-youtube-mobile .vjs-big-play-button { display: none; }';

  var head = document.head || document.getElementsByTagName('head')[0];

  var style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  head.appendChild(style);
};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Youtube.nativeSourceHandler.canPlayType = function (source) {
  return source === 'video/youtube';
};

/*
 * Check Youtube can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Youtube.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Youtube.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Youtube.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

Youtube.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Youtube.nativeSourceHandler.dispose = function () {};

// Register the native source handler
Youtube.registerSourceHandler(Youtube.nativeSourceHandler);

window.onYouTubeIframeAPIReady = function () {
  Youtube.isApiReady = true;

  for (var i = 0; i < Youtube.apiReadyQueue.length; ++i) {
    Youtube.apiReadyQueue[i].initYTPlayer();
  }
};

loadApi();
injectCss();

Component.registerComponent('Youtube', Youtube);

Tech.registerTech('Youtube', Youtube);

exports['default'] = Youtube;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],32:[function(require,module,exports){
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

},{"global/window":22,"is-function":33,"once":34,"parse-headers":37,"xtend":38}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{"is-function":33}],36:[function(require,module,exports){

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

},{}],37:[function(require,module,exports){
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
},{"for-each":35,"trim":36}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _dashjs = (typeof window !== "undefined" ? window['dashjs'] : typeof global !== "undefined" ? global['dashjs'] : null);

require('./tech/media');

require('./tech/dash');

require('./tech/dashas');

require('./tech/easy-broadcast');

require('./tech/streamroot');

require('./component/control-bar/');

require('videojs-metrics');

require('videojs-chromecast');

require('videojs-youtube');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ! afrostrream-player - v2.0.0 - 2016-02-15
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (c) 2015 benjipott
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Licensed under the Apache-2.0 license.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file afrostream.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                **/

var Component = _video2.default.getComponent('Component');
var ControlBar = _video2.default.getComponent('ControlBar');

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */

var Afrostream = function (_Component) {
  _inherits(Afrostream, _Component);

  function Afrostream(player, options, ready) {
    _classCallCheck(this, Afrostream);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Afrostream).call(this, player, options, ready));

    player.one('loadstart', _this.onLoadStart.bind(_this));
    player.one('firstplay', _this.onFirstPlay.bind(_this));
    player.getPlaybackStatistics = _this.getPlaybackStatistics.bind(_this);
    player.one('fullscreenchange', _this.onFullScreenChange.bind(_this));
    return _this;
  }

  _createClass(Afrostream, [{
    key: 'getPrefix',
    value: function getPrefix() {
      return (screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation) && 'orientation' in screen;
    }
  }, {
    key: 'onFullScreenChange',
    value: function onFullScreenChange() {
      var prefix = this.getPrefix();

      if (!prefix) {
        return;
      }
      try {

        if (this.player_.isFullscreen()) {
          screen.orientation.lock('landscape');
        } else {
          screen.orientation.unlock();
        }
      } catch (e) {
        _video2.default.log(e);
      }
    }
  }, {
    key: 'onLoadStart',
    value: function onLoadStart() {
      this.addMediaPlayerHandlers();
    }
  }, {
    key: 'onFirstPlay',
    value: function onFirstPlay() {
      if (this.player_.options_.starttime) {
        this.player_.currentTime(this.player_.options_.starttime);
      }
    }
  }, {
    key: 'addMediaPlayerHandlers',
    value: function addMediaPlayerHandlers() {
      this.player_.tech_.on(_dashjs.MediaPlayer.events.STREAM_INITIALIZED, this.onInitialized.bind(this));
      this.player_.tech_.on(_dashjs.MediaPlayer.events.METRIC_CHANGED, this.onMetricChanged.bind(this));
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
        switch (e.mediaType) {
          case 'video':
            /*jshint sub:true*/
            if (metrics.bandwidth !== this.oldBandwidth) {
              this.player_.trigger(metrics.bandwidth > this.oldBandwidth ? 'bandwidthIncrease' : 'bandwidthDecrease');
              this.oldBandwidth = metrics.bandwidth;
            }
            break;
          case 'p2pweb':
            /*jshint sub:true*/
            if (metrics.chunksFromP2P !== this.oldChunksFromP2P) {
              this.player_.trigger('chunksfromp2p');
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
        this.player_.error(err);
      }
    }
  }, {
    key: 'audioTracks',
    value: function audioTracks() {
      return this.player_.tech_ && this.player_.techGet_('audioTracks');
    }
  }, {
    key: 'setAudioTrack',
    value: function setAudioTrack(track) {
      return this.player_.tech_ && this.player_.techCall_('setAudioTrack', track);
    }
  }, {
    key: 'videoTracks',
    value: function videoTracks() {
      return this.player_.tech_ && this.player_.techGet_('videoTracks');
    }
  }, {
    key: 'setVideoTrack',
    value: function setVideoTrack(track) {
      return this.player_.tech_ && this.player_.tech_.setVideoTrack(track);
    }
  }, {
    key: 'getPlaybackStatistics',
    value: function getPlaybackStatistics() {
      return this.player_.tech_ && this.player_.tech_.getPlaybackStatistics();
    }
  }, {
    key: 'getCribbedMetricsFor',
    value: function getCribbedMetricsFor(type) {
      return this.player_.tech_ && this.player_.tech_.getCribbedMetricsFor(type);
    }
  }]);

  return Afrostream;
}(Component);

Afrostream.prototype.options_ = {};

Afrostream.prototype.oldBandwidth = 0;

Afrostream.prototype.oldChunksFromP2P = 0;

Afrostream.prototype.streamInfo = null;

Afrostream.prototype.tech_ = null;

/**
 * add afrostream to videojs childs
 * @type {{}}
 */
_video2.default.options.children.push('afrostream');

ControlBar.prototype.options_.children.splice(11, 0, ControlBar.prototype.options_.children.splice(1, 1)[0]);

Component.registerComponent('Afrostream', Afrostream);
exports.default = Afrostream;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./component/control-bar/":1,"./tech/dash":15,"./tech/dashas":16,"./tech/easy-broadcast":17,"./tech/media":18,"./tech/streamroot":19,"videojs-chromecast":25,"videojs-metrics":29,"videojs-youtube":31}]},{},[39])(39)
});