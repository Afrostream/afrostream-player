/**
 * @file next-video-button.js
 */
import videojs from 'video.js';
import NextVideoItem from './next-video-item';

const Component = videojs.getComponent('Component');
const ControlBar = videojs.getComponent('ControlBar');
const MenuButton = videojs.getComponent('MenuButton');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class NextVideoButton
 */
class NextVideoButton extends MenuButton {

  constructor(player, options = {}) {
    super(player, options);
  }

  /**
   * Create the list of menu items. Specific to each subclass.
   *
   * @method createItems
   */
  createItems(items = []) {
    if (!this.options_.poster) {
      this.hide();
      return items;
    }
    items.push(new NextVideoItem(this.player_, {
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
  buildCSSClass() {
    return `vjs-next-video-button ${super.buildCSSClass()}`;
  }

  /**
   * Handle click on mute
   * @method handleClick
   */
  handleClick() {
    super.handleClick();
    this.player_.trigger('next');
  }
}

NextVideoButton.prototype.controlText_ = 'Next video';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(ControlBar.prototype.options_.children.length - 2, 0, 'nextVideoButton');

Component.registerComponent('NextVideoButton', NextVideoButton);
export default NextVideoButton;
