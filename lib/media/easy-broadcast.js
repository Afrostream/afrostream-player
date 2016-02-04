/**
 * @fileoverview VideoJS-DASH - Custom Dash Player with Dashjs API
 */

/**
 * DASH Media Controller
 *
 * @param {vjs.Player} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */
videojs.EasyBroadcast = videojs.Dash.extend({
  /** @constructor */
  init: function (player, options, ready) {
    videojs.Dash.call(this, player, options, ready);
  }
});


videojs.options.easybroadcast = {};

videojs.EasyBroadcast.prototype.setSrc = function (source) {
  this.context_ = this.context_ || new DashEB.classes.Context({
      source: source.src
    });
  videojs.Dash.prototype.setSrc.call(this, source);
};

videojs.EasyBroadcast.prototype.onMetricChanged = function (e) {
  if (e.data.stream !== 'video') {
    return;
  }
  var metricsKey = 'p2pweb';
  var metrics = this.getCribbedMetricsFor(metricsKey);
  if (metrics) {
    this.metrics_[metricsKey] = videojs.util.mergeOptions(this.metrics_[metricsKey], metrics);
  }
  videojs.Dash.prototype.onMetricChanged.call(this, e);
};
videojs.EasyBroadcast.prototype.getCribbedMetricsFor = function (type) {
  if (type !== 'p2pweb') {
    return videojs.Dash.prototype.getCribbedMetricsFor.call(this, type);
  }
  var metrics = this.mediaPlayer_.getMetricsFor(type);
  if (metrics) {
    return metrics.metricsP2PWeb;
  }
  else {
    return null;
  }
};
/**
 * Check if HTML5 video is supported by this browser/device
 * @return {Boolean}
 */
videojs.EasyBroadcast.isSupported = function () {
  return videojs.Dash.isSupported();
};

// Add Source Handler pattern functions to this tech
videojs.MediaTechController.withSourceHandlers(videojs.EasyBroadcast);

/**
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 * @param  {Object} source   The source object
 * @param  {videojs.Dash} tech  The instance of the HTML5 tech
 */
/*jshint sub:true*/
videojs.EasyBroadcast['nativeSourceHandler'] = {};
/**
 * Check if the video element can handle the source natively
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
/*jshint sub:true*/
videojs.EasyBroadcast['nativeSourceHandler']['canHandleSource'] = videojs.Dash['nativeSourceHandler']['canHandleSource'];
/**
 * Pass the source to the video element
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 * @param  {Object} source    The source object
 * @param  {vjs.Html5} tech   The instance of the Html5 tech
 */
/*jshint sub:true*/
videojs.EasyBroadcast['nativeSourceHandler']['handleSource'] = videojs.Dash['nativeSourceHandler']['handleSource'];

/**
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the getTracksForformat natively)
 */
/*jshint sub:true*/
videojs.EasyBroadcast['nativeSourceHandler']['dispose'] = videojs.Dash['nativeSourceHandler']['dispose'];

// Register the native source handler
/*jshint sub:true*/
videojs.EasyBroadcast['registerSourceHandler'](videojs.EasyBroadcast['nativeSourceHandler']);
