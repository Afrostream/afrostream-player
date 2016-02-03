/**
 * The component for controlling the playback rate
 *
 * @param {videojs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
/**
 * Button to toggle between play and pause
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */
videojs.NextButton = videojs.Button.extend({
  /** @constructor */
  init: function (player, options) {
    videojs.Button.call(this, player, options);
    this.update();
  }
});

videojs.ControlBar.prototype.options_.children.NextButton = {};

videojs.NextButton.prototype.buttonText = 'Next';

videojs.NextButton.prototype.buildCSSClass = function () {
  return 'vjs-next-control ' + videojs.Button.prototype.buildCSSClass.call(this);
};
videojs.NextButton.prototype.createEl = function (type, props) {

  var el = videojs.Button.prototype.createEl.call(this, type, props);
  this.content_ = videojs.createEl('div', {
    className: 'thumb-tile-content'
  });

  this.fallbackImg_ = videojs.createEl(videojs.BACKGROUND_SIZE_SUPPORTED ? 'div' : 'img', {
    className: 'thumb-tile_thumb'
  });
  this.content_.appendChild(this.fallbackImg_);

  var subUnfo = videojs.createEl('div', {
    className: 'thumb-caption'
  });

  this.title = videojs.createEl('div', {
    className: 'thumb-title'
  });

  subUnfo.appendChild(this.title);
  this.content_.appendChild(subUnfo);
  this.controlText_.appendChild(this.content_);
  return el;
};

// OnClick - Toggle between play and pause
videojs.NextButton.prototype.onClick = function () {
  this.player_.trigger('next');
};

videojs.NextButton.prototype.update = function () {
  var options = this.player_.options().next;
  this.title.innerHTML = options.title;
  this.setSrc(options.poster);
};

/**
 * Set the thumb source depending on the display method
 */
videojs.NextButton.prototype.setSrc = function (url) {
  var backgroundImage;

  if (!videojs.BACKGROUND_SIZE_SUPPORTED) {
    this.fallbackImg_.src = url;
  } else {
    backgroundImage = '';
    if (url) {
      backgroundImage = 'url("' + url + '")';
    }

    this.fallbackImg_.style.backgroundImage = backgroundImage;
  }
};
