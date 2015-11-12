/**
 * The component for controlling the playback rate
 *
 * @param {videojs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
videojs.BitrateMenuButton = videojs.MenuButton.extend({
  /** @constructor */
  init: function (player, options) {
    videojs.MenuButton.call(this, player, options);

    this.updateVisibility();
    this.updateLabel();

    this.on(player, 'bitratechange', this.updateLabel);
    this.on(player, 'canplay', this.updateItems);
  }
});


videojs.ControlBar.prototype.options_.children.bitrateMenuButton = {};

videojs.BitrateMenuButton.Labels = ['bas', 'moyen', 'normal', 'HD', 'auto'];
videojs.BitrateMenuButton.prototype.buttonText = 'Quality Selection';
videojs.BitrateMenuButton.prototype.className = 'vjs-bitrate';
videojs.BitrateMenuButton.prototype.options_ = {
  title: 'Qualité'
};

videojs.BitrateMenuButton.prototype.createEl = function () {
  var el = videojs.MenuButton.prototype.createEl.call(this);

  this.labelEl_ = videojs.createEl('div', {
    className: 'vjs-bitrate-value',
    innerHTML: 1.0
  });

  el.appendChild(this.labelEl_);

  return el;
};
/**
 * Update all items in menu
 */
videojs.BitrateMenuButton.prototype.updateItems = function () {
  this.updateLabel();
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
videojs.BitrateMenuButton.prototype.createItems = function () {
  var items = [], bitRate = null;
  if (!this.bitratesSupported()) {
    return items;
  }

  /*jshint sub:true*/
  var bitRates = this.player().videoTracks();
  // Add an OFF menu item to turn all tracks off
  items.push(new videojs.BitrateMenuItem(this.player(), {
    qualityIndex: bitRates.length,
    bitrate: 'Auto'
  }));

  for (var i = 0; i < bitRates.length; i++) {
    bitRate = bitRates[i];
    items.push(new videojs.BitrateMenuItem(this.player(), bitRate));
  }

  return items;
};

videojs.BitrateMenuButton.prototype.updateARIAAttributes = function () {
  // Current playback rate
  this.el().setAttribute('aria-valuenow', 'bitrate-control');
};

videojs.BitrateMenuButton.prototype.onClick = function () {
  // select next rate option
  var currentRate = this.player().playbackRate();
  /*jshint sub:true*/
  var rates = this.player().tech['featuresBitrateIndex'];
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

videojs.BitrateMenuButton.prototype.bitratesSupported = function () {
  /*jshint sub:true*/
  return this.player().tech && this.player().videoTracks() &&
    this.player().videoTracks().length > 0;
};

/**
 * Hide playback rate controls when they're no playback rate options to select
 */
videojs.BitrateMenuButton.prototype.updateVisibility = function () {
  //VJS 4.12.5
  if (this.bitratesSupported()) {
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
 * Update button label when rate changed
 */
videojs.BitrateMenuButton.prototype.updateLabel = function () {
  if (this.bitratesSupported()) {
    /*jshint sub:true*/
    var selected = this.player().tech['featuresBitrateIndex'];
    this.labelEl_.innerHTML = videojs.BitrateMenuButton.Labels[Math.min(selected, videojs.BitrateMenuButton.Labels.length - 1)];
  }
};

/**
 * The specific menu item type for selecting a playback rate
 *
 * @constructor
 */
videojs.BitrateMenuItem = videojs.MenuItem.extend({
  contentElType: 'button',
  /** @constructor */
  init: function (player, options) {
    /*jshint sub:true*/
    var label = this.label =
      parseInt(options['bitrate'], 10) ? options['bitrate'] / 1000 : options['bitrate'];
    var qualityIndex = this.qualityIndex = options['qualityIndex'];

    var data = {
      label: videojs.BitrateMenuButton.Labels[qualityIndex] || label,
      selected: (qualityIndex === player.tech['featuresBitrateIndex']),
      reference: options
    };

    videojs.MenuItem.call(this, player, data);

    this.on(player, 'bitratechange', this.update);
  }
});

videojs.BitrateMenuItem.prototype.onClick = function () {
  //videojs.MenuItem.prototype.onClick.call(this);
  this.player().setVideoTrack(this.options().reference);
};

videojs.BitrateMenuItem.prototype.update = function () {
  //var tracks = this.player().videoTracks();
  //var selected = false;
  //for (var i = 0; i < tracks.length; i++) {
  //  var videoTrack = tracks[i];
  //  if (videoTrack.qualityIndex === this.qualityIndex && videoTrack.enabled) {
  //    selected = true;
  //  }
  //}
  //this.selected(selected);
  /*jshint sub:true*/
  this.selected(this.player().tech['featuresBitrateIndex'] === this.qualityIndex);

};

