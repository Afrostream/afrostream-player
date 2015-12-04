/*! afrostream-player - v0.0.0 - 2015-10-21
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license. */
(function (window, videojs) {
  'use strict';

  /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  videojs.Afrostream = videojs.Component.extend({
    init: function (player, options) {
      videojs.Component.call(this, player, options);

      player.one('loadstart', videojs.bind(this, this.onLoadStart));
      this.tech_ = player.tech;
    }
  });

  videojs.Afrostream.prototype.options_ = {};

  /**
   * Fix subtitles error
   * @param str
   * @returns {string}
   */
  videojs.trim = function (str) {
    return (str + '').replace(/^\s+|\s+$/g, '').replace(/^NOTE Paragraph$/g, '');
  };

  videojs.Afrostream.prototype.streamInfo = null;

  videojs.Afrostream.prototype.tech_ = null;

  videojs.Afrostream.prototype.onLoadStart = function () {
    this.addMediaPlayerHandlers();
  };

  videojs.Afrostream.prototype.addMediaPlayerHandlers = function () {
    this.player().on(MediaPlayer.events.STREAM_INITIALIZED,
      videojs.bind(this, this.onInitialized));
    this.player().on(MediaPlayer.events.METRIC_CHANGED,
      videojs.bind(this, this.onMetricChanged));

  };

  videojs.Afrostream.prototype.onMetricChanged = function (e) {
    // get current buffered ranges of video element and keep them up to date
    if (e.data.stream !== 'video' && e.data.stream !== 'audio') {
      return;
    }
    var metrics = this.player().getCribbedMetricsFor(e.data.stream);
    if (metrics) {
      if (e.data.stream === 'video') {
        /*jshint sub:true*/
        if (metrics.bitrateIndex !== this.oldBitrateIndex) {
          this.tech_['featuresBitrate'] = metrics;
          this.player().trigger(metrics.bitrateIndex > this.oldBitrateIndex ? 'bandwidthIncrease' : 'bandwidthDecrease');
          this.oldBitrateIndex = metrics.bitrateIndex;
        }
      }
    }
  };

  videojs.Afrostream.prototype.onInitialized = function (manifest, err) {
    if (err) {
      this.player().error(err);
    }
  };

  /**
   * add afrostream to videojs childs
   * @type {{}}
   */
  videojs.options.children.afrostream = {};

})(window, window.videojs);
