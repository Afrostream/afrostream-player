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

  createLoader(src) {
    this.destroyLoader();

    this.img = new Image();
    this.img.onload = ::this.handleComplete;
    this.img.onerror = ::this.handleError;
    this.img.src = src;
  }

  handleComplete() {
    const url = this.destroyLoader();
    videojs.log('thumbnails : next complete ' + url)
  }

  handleError() {
    const url = this.destroyLoader();
    videojs.log('thumbnails : next error ' + url);
  }

  destroyLoader() {
    let imgSrouce = '';
    if (this.img) {
      imgSrouce = this.img.src;
      this.img.onload = null;
      this.img.onerror = null;
      this.img = null;
    }
    return imgSrouce;
  }

  extractAssetUri(max = 1) {
    let currentSrc = this.player_.currentSrc();
    let urlInfo = videojs.parseUrl(currentSrc);
    let pathname = urlInfo.pathname.replace(/\/([a-z0-9\/\._-]{16}\.[is]sml?)+\/([a-z0-9\/\._-]*\.(mpd|m3u8)?)$/gi, '');
    let fullPah = `${urlInfo.protocol}//${urlInfo.host}${pathname}/frames/map-{index}.jpg`;
    let current = fullPah.replace('{index}', this.itemIndex);
    let next = fullPah.replace('{index}', this.itemIndex + 1);
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
    const timeInterval = 30;
    const spriteSize = {
      w: 450,
      h: 250
    };
    const spritesPerRow = 5;
    const spritesPerCol = 5;

    const sheetWidth = spriteSize.w / spritesPerRow;
    const sheetHeight = spriteSize.h / spritesPerCol;

    const spritesPerSheet = spritesPerRow * spritesPerCol;
    const secondsPerSheet = timeInterval * spritesPerSheet;

    let index = Math.max(1, Math.ceil(newTime / secondsPerSheet));
    let duration = this.player_.duration();
    let maxItem = 1;
    if (duration) {
      maxItem = Math.ceil(this.player_.duration() / secondsPerSheet);
    }
    console.log('thumbnails :', maxItem)
    let stripedTime = newTime - ((index - 1) * secondsPerSheet);
    let sheetIndex = Math.floor(stripedTime / timeInterval);
    let x = Math.floor((sheetIndex % 5) * sheetWidth);
    let y = Math.floor(sheetIndex / spritesPerCol) * sheetHeight;
    if (this.itemIndex !== index) {
      this.itemIndex = index;
      let url = this.extractAssetUri(maxItem);
      console.log('thumbnails :', url)
      let backgroundImage = `url("${url}")`;
      this.fallbackImg_.style.backgroundImage = backgroundImage;
    }

    this.fallbackImg_.style.backgroundPositionX = -x + 'px';
    this.fallbackImg_.style.backgroundPositionY = -y + 'px';
  }
}

MouseThumbnailDisplay.prototype.itemIndex = 1;
//Push videojs SeekBar child with this one
SeekBar.prototype.options_.children.splice(1, 1, 'mouseThumbnailDisplay');
Component.registerComponent('MouseThumbnailDisplay', MouseThumbnailDisplay);
export default MouseThumbnailDisplay;
