/**
 * @file next-video-big-button.js
 */
import videojs from 'video.js';

const Component = videojs.getComponent('Component');
const ClickableComponent = videojs.getComponent('ClickableComponent');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends NextVideoItem
 * @class NextVideoBigButton
 */
class NextVideoBigButton extends ClickableComponent {

  constructor (player, options) {
    options = videojs.mergeOptions(options, player.options_.controlBar.nextVideoButton || {});
    super(player, options);
    if (!this.options_.poster) {
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
  createEl (type, props, attrs) {
    let el = super.createEl('div', {
      className: 'vjs-next-video-big-button',
      tabIndex: -1,
    }, attrs);

    let backgroundImage = '';
    if (this.options_.poster) {
      backgroundImage = 'url("' + this.options_.poster + '")';
    }

    el.style.backgroundImage = backgroundImage;

    return el;
  }

  /**
   * Handle click on mute
   * @method handleClick
   */
  handleClick () {
    super.handleClick();
    this.player_.trigger('next');
  }

}

NextVideoBigButton.prototype.options_ = {
  selectable: false
};

NextVideoBigButton.prototype.controlText_ = 'Next';

Component.registerComponent('NextVideoBigButton', NextVideoBigButton);

/**
 * Inject Next button in core player
 * @type {{}}
 */
videojs.options.children.push('nextVideoBigButton');

export default NextVideoBigButton;