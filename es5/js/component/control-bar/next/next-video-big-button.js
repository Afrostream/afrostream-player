/**
 * @file next-video-big-button.js
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
var ClickableComponent = _videoJs2['default'].getComponent('ClickableComponent');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends NextVideoItem
 * @class NextVideoBigButton
 */

var NextVideoBigButton = (function (_ClickableComponent) {
  _inherits(NextVideoBigButton, _ClickableComponent);

  function NextVideoBigButton(player, options) {
    _classCallCheck(this, NextVideoBigButton);

    options = _videoJs2['default'].mergeOptions(options, player.options_.controlBar.nextVideoButton || {});
    _get(Object.getPrototypeOf(NextVideoBigButton.prototype), 'constructor', this).call(this, player, options);
    if (!options.poster) {
      this.hide();
    }
  }

  /**
   * Create the component's DOM element
   *
   * @param {String=} type Desc
   * @param {Object=} props Desc
   * @return {Element}
   * @method createEl
   */

  _createClass(NextVideoBigButton, [{
    key: 'createEl',
    value: function createEl(type, props, attrs) {
      var el = _get(Object.getPrototypeOf(NextVideoBigButton.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-next-video-big-button',
        tabIndex: -1
      }, attrs);

      return el;
    }

    /**
     * Handle click on mute
     * @method handleClick
     */
  }, {
    key: 'handleClick',
    value: function handleClick() {
      _get(Object.getPrototypeOf(NextVideoBigButton.prototype), 'handleClick', this).call(this);
      this.player_.trigger('next');
    }
  }]);

  return NextVideoBigButton;
})(ClickableComponent);

NextVideoBigButton.prototype.options_ = {
  selectable: false
};

NextVideoBigButton.prototype.controlText_ = 'Next';

Component.registerComponent('NextVideoBigButton', NextVideoBigButton);

/**
 * Inject Next button in core player
 * @type {{}}
 */
_videoJs2['default'].options.children.push('nextVideoBigButton');

exports['default'] = NextVideoBigButton;
module.exports = exports['default'];