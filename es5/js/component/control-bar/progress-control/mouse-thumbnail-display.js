/**
 * @file mouse-thumbnail-display.js
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

  //Push videojs SeekBar child with this one

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */

  _createClass(MouseThumbnailDisplay, [{
    key: 'createEl',
    value: function createEl() {
      return _get(Object.getPrototypeOf(MouseThumbnailDisplay.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-mouse-display'
      });
    }
  }, {
    key: 'update',
    value: function update(newTime, position) {
      var time = formatTime(newTime, this.player_.duration());

      this.el().style.left = position + 'px';
      this.el().setAttribute('data-current-time', time);

      if (this.keepTooltipsInside) {
        var clampedPosition = this.clampPosition_(position);
        var difference = position - clampedPosition + 1;
        var tooltipWidth = parseFloat(window.getComputedStyle(this.tooltip).width);
        var tooltipWidthHalf = tooltipWidth / 2;

        this.tooltip.innerHTML = time;
        this.tooltip.style.right = '-' + (tooltipWidthHalf - difference) + 'px';
      }
    }
  }]);

  return MouseThumbnailDisplay;
})(MouseTimeDisplay);

SeekBar.prototype.options_.children.push('audioTrackButton');

Component.registerComponent('MouseThumbnailDisplay', MouseThumbnailDisplay);
exports['default'] = MouseThumbnailDisplay;
module.exports = exports['default'];