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

    this.on(player, 'loadstart', this.updateVisibility);
    this.on(player, 'bitratechange', this.updateVisibility);
    this.on(player, 'bitratechange', this.updateLabel);
    this.on(player, 'initialized', this.update || this.updateLabel);
    this.on(player, 'initialized', this.createMenu);
  }
});


videojs.ControlBar.prototype.options_.children.bitrateMenuButton = {};

videojs.BitrateMenuButton.Labels = ['bas', 'moyen', 'normal', 'HD', 'auto'];
videojs.BitrateMenuButton.prototype.buttonText = 'Quality Selection';
videojs.BitrateMenuButton.prototype.className = 'vjs-bitrate';
videojs.BitrateMenuButton.prototype.options_ = {
  title: 'Bitrates'
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
videojs.BitrateMenuButton.prototype.createMenu = function () {
  var menu = new videojs.Menu(this.player());
  if (this.bitratesSupported()) {
    menu = videojs.MenuButton.prototype.createMenu.call(this);
  }
  return menu;
};
/**
 * Create the list of menu items. Specific to each subclass.
 */
videojs.BitrateMenuButton.prototype.createItems = function () {
  var items = [], bitRate = null;


  /*jshint sub:true*/
  var bitRates = this.player().tech['featuresBitrates'] || [];
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
  this.el().setAttribute('aria-valuenow', this.player().tech.getBitrate());
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
  return this.player().tech && this.player().tech['featuresBitrates'] &&
    this.player().tech['featuresBitrates'].length > 0;
};

/**
 * Hide playback rate controls when they're no playback rate options to select
 */
videojs.BitrateMenuButton.prototype.updateVisibility = function () {
  if (this.bitratesSupported()) {
    this.removeClass('vjs-hidden');
  } else {
    this.addClass('vjs-hidden');
  }
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
    // Modify options for parent MenuItem class's init.
    options['label'] = videojs.BitrateMenuButton.Labels[qualityIndex] || label;
    options['selected'] =
      (qualityIndex === player.tech['featuresBitrates'].length) ||
        /* (qualityIndex === player.tech['featuresBitrateIndex']) ||*/ 1;
    videojs.MenuItem.call(this, player, options);

    this.on(player, 'bitratechange', this.update);
  }
});

videojs.BitrateMenuItem.prototype.onClick = function () {
  videojs.MenuItem.prototype.onClick.call(this);
  //this.player().playbackRate(this.rate);
  this.player().tech.setQuality(this.qualityIndex);
};

videojs.BitrateMenuItem.prototype.update = function () {
  /*jshint sub:true*/
  this.selected(this.player().tech['featuresBitrateIndex'] === this.bitrateIndex);
};

