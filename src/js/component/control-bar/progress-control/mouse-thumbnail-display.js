/**
 * @file mouse-thumbnail-display.js
 */
import videojs from 'video.js';

const Component = videojs.getComponent('Component');
const MouseTimeDisplay = videojs.getComponent('MouseTimeDisplay');
const SeekBar = videojs.getComponent('SeekBar');

/**
 * The Mouse Time Display component shows the time you will seek to
 * when hovering over the progress bar
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class MouseThumbnailDisplay
 */
class MouseThumbnailDisplay extends MouseTimeDisplay {

  constructor(player, options) {
    super(player, options);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    let el = videojs.createEl('div', {
      className: 'vjs-thumbnail-display'
    });

    this.fallbackImg_ = videojs.createEl('div', {
      className: 'vjs-thumbnail-display_thumb'
    });

    el.appendChild(this.fallbackImg_);

    return el;
  }

  update(newTime, position) {
    super.update(newTime, position);
    const timeInterval = 10;
    const spritesPerSheet = 25;
    const spriteSize = {
      w: 600,
      h: 330
    };
    const spritesPerRow = 5;
    const spritesPerCol = 5;

    const sheetWidth = spriteSize.w / spritesPerRow;
    const sheetHeight = spriteSize.h / spritesPerCol;

    const secondsPerSheet = timeInterval * spritesPerRow;

    let index = Math.max(1, Math.ceil(newTime / secondsPerSheet));
    let stripedTime = newTime - ((index - 1) * secondsPerSheet);
    let sheetIndex = Math.ceil(stripedTime / 2);
    let x = Math.floor((sheetIndex % 5) * sheetWidth);
    let y = Math.floor(sheetIndex / spritesPerCol) * sheetHeight;

    // console.log('timeline : ', newTime, index, secondsPerSheet, this.player_.duration(), stripedTime, percentPos, sheetIndex, x, y);
    if (this.itemIndex !== index) {
      this.itemIndex = index;
      let url = `http://origin.afrostream.tv/vod/24hourlovebis/frames/map-${this.itemIndex}.jpg`;
      let backgroundImage = `url("${url}")`;
      this.fallbackImg_.style.backgroundImage = backgroundImage;
    }
    this.fallbackImg_.style.backgroundPositionX = -x + 'px';
    this.fallbackImg_.style.backgroundPositionY = -y + 'px';
  }
}

//Push videojs SeekBar child with this one
SeekBar.prototype.options_.children.push('mouseThumbnailDisplay');

Component.registerComponent('MouseThumbnailDisplay', MouseThumbnailDisplay);
export default MouseThumbnailDisplay;
