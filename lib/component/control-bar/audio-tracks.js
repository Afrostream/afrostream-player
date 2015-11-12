/**
 * The component for controlling the playback rate
 *
 * @param {videojs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
videojs.AudioMenuButton = videojs.MenuButton.extend({
  /** @constructor */
  init: function (player, options) {
    videojs.MenuButton.call(this, player, options);
    this.updateVisibility();
    this.on(player, 'loadstart', this.updateVisibility);
    this.on(player, 'audiochange', this.updateVisibility);
    this.on(player, 'initialized', this.updateItems);
    this.on(player, 'canplay', this.updateItems);

  }
});


videojs.ControlBar.prototype.options_.children.AudioMenuButton = {};

videojs.AudioMenuButton.prototype.buttonText = 'Audio Selection';
videojs.AudioMenuButton.prototype.className = 'vjs-audio-button';
videojs.AudioMenuButton.prototype.options_ = {
  title: 'Audio'
};

videojs.AudioMenuButton.prototype.createEl = function () {
  return videojs.MenuButton.prototype.createEl.call(this);
};
/**
 * Update all items in menu
 */
videojs.AudioMenuButton.prototype.updateItems = function () {
  /*jshint sub:true*/
  this.items = this['createItems']();

  if (this.items) {
    while (this.menu.children().length) {
      this.menu.removeChild(this.menu.children()[0]);
    }
    // Add menu items to the menu
    for (var i = 0; i < this.items.length; i++) {
      this.menu.addItem(this.items[i]);
    }
  }

  this.updateVisibility();
};
/**
 * Create the list of menu items. Specific to each subclass.
 */
videojs.AudioMenuButton.prototype.createItems = function () {
  var items = [], audio = null;
  if (!this.audiosSupported()) {
    return items;
  }
  /*jshint sub:true*/
  var audios = this.player().audioTracks();
  for (var i = 0; i < audios.length; i++) {
    audio = audios[i];
    items.push(new videojs.AudioMenuItem(this.player(), audio));
  }

  return items;
};

videojs.AudioMenuButton.prototype.updateARIAAttributes = function () {
  // Current playback rate
  this.el().setAttribute('aria-valuenow', this.player().tech.getBitrate());
};

videojs.AudioMenuButton.prototype.onClick = function () {
  // select next rate option
  var currentRate = this.player().playbackRate();
  /*jshint sub:true*/
  var rates = this.player().tech['featuresAudioIndex'];
  // this will select first one if the last one currently selected
  var newRate = rates[0];
  for (var i = 0; i < rates.length; i++) {
    if (rates[i] > currentRate) {
      newRate = rates[i];
      break;
    }
  }
  this.player().playbackRate(newRate);
};

videojs.AudioMenuButton.prototype.audiosSupported = function () {
  /*jshint sub:true*/
  return this.player().audioTracks() &&
    this.player().audioTracks().length > 0;
};

/**
 * Hide playback rate controls when they're no playback rate options to select
 */
videojs.AudioMenuButton.prototype.updateVisibility = function () {
  //VJS 4.12.5
  if (this.audiosSupported()) {
    this.show();
    this.removeClass('vjs-hidden');
  } else {
    this.hide();
    this.addClass('vjs-hidden');
  }
  //VJS 4.11.4
  //if (this.items && this.items.length === 0) {
  //  this.hide();
  //}
  //else {
  //  this.show();
  //}

};

/**
 * The specific menu item type for selecting a playback rate
 *
 * @constructor
 */
videojs.AudioMenuItem = videojs.MenuItem.extend({
  contentElType: 'button',
  /** @constructor */
  init: function (player, options) {
    /*jshint sub:true*/
    var label = this.label = options.lang || options.language || options.label;
    var audioIndex = parseInt(this.audioIndex = options.id || options.index, 10);
    var selected = options.enabled = (audioIndex === player.tech['featuresAudioIndex']) || label === 'fr';
    //// Modify options for parent MenuItem class's init.
    var data = {
      label: label,
      selected: selected,
      reference: options
    };

    videojs.MenuItem.call(this, player, data);

    //this.on(player, 'audiochange', this.update);
  }
});

videojs.AudioMenuItem.prototype.onClick = function () {
  videojs.MenuItem.prototype.onClick.call(this);
  this.player().setAudioTrack(this.options().reference);

};

//videojs.AudioMenuItem.prototype.update = function () {
//  /*jshint sub:true*/
//  this.selected(this.player().tech['featuresAudioIndex'] === this.audioIndex);
//};

