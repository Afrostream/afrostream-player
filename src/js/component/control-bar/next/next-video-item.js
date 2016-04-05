/**
 * @file next-video-item.js
 */
import videojs from 'video.js';

const Component = videojs.getComponent('Component');
const MenuItem = videojs.getComponent('MenuItem');

/**
 * The base class for buttons that toggle next video
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuItem
 * @class NextVideoItem
 */
class NextVideoItem extends MenuItem {

  constructor (player, options) {
    super(player, options);
    this.setSrc(options.poster)
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
    const el = super.createEl(type, props, attrs);

    this.fallbackImg_ = videojs.createEl(videojs.browser.BACKGROUND_SIZE_SUPPORTED ? 'div' : 'img', {
      className: 'thumb-tile_thumb'
    });

    el.appendChild(this.fallbackImg_);

    return el;
  }

  setSrc (url) {
    let backgroundImage;

    if (!videojs.browser.BACKGROUND_SIZE_SUPPORTED) {
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
  handleClick () {
    super.handleClick();
    this.player_.trigger('next');
  }
}


Component.registerComponent('NextVideoItem', NextVideoItem);
export default NextVideoItem;
