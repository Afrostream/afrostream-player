'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _video = require('video.js');

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