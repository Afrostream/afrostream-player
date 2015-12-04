/**
 * @fileoverview VideoJS-DASHAS - Custom Flash Player with HTML5-ish API
 */

/**
 * DASHAS Media Controller - Wrapper for fallback SWF API
 *
 * @param {vjs.Player} player
 * @param {Object=} options
 * @param {Function=} ready
 * @constructor
 */
videojs.Dashas = videojs.Flash.extend({
  /** @constructor */
  init: function (player, options, ready) {
    var serverUrl = videojs.Dashas.buildMetadataUrl(options);
    var customData = videojs.Dashas.buildOptData(options);
    // Merge default flashvars with ones passed in to init
    options.flashVars = videojs.util.mergeOptions({
      'errorEventProxyFunction': 'videojs.Dashas.onError',
      'eventProxyFunction': 'videojs.Dashas.onEvent',
      'metadataUrl': encodeURIComponent(serverUrl),
      'authenticationToken': encodeURIComponent(customData),
      'language': 'fr',
      'spinner': !1,
      'watermark': !1,
      'muted': player.options().muted,
      'debug': true,
      'quality': 'autolow',
      'maxBufferLength': 8
    }, options.flashVars || {});

    videojs.Flash.call(this, player, options, ready);
    this.mediaPlayer_ = this;
    this.metricsInterval = this.setInterval(this.detectBandwithChange, 5000);
    player.on('error', vjs.bind(this, function () {
      this.clearInterval(this.metricsInterval);
    }));
    //player.ready(function () {
    //  vjs.bind(this, this.detectBandwithChange);
    //})
    this.player().one('playerready', vjs.bind(this, this.initBandwith));
  }
});

/**
 * Initialize metrics values
 */
videojs.Dashas.prototype.initBandwith = function () {
  var metrics = this.getPlaybackStatistics(), metricsChangeType;
  if (!metrics) {
    return;
  }
  videojs.util.mergeOptions(this.metrics_, metrics);
};

videojs.Dashas.prototype.detectBandwithChange = function () {
  var metrics = this.getPlaybackStatistics(), metricsChangeType;
  if (!metrics) {
    return;
  }
  switch (true) {
    case metrics.video.bandwidth !== this.metrics_.video.bandwidth:
      this.metrics_.video.bandwidth = metrics.video.bandwidth;
      metricsChangeType = 'video';
      break;
    case metrics.audio.bandwidth !== this.metrics_.audio.bandwidth:
      this.metrics_.audio.bandwidth = metrics.audio.bandwidth;
      metricsChangeType = 'audio';
      break;
    default:
      break;
  }
  if (metricsChangeType) {
    var metricsChangeEvent = {
      type: MediaPlayer.events.METRIC_CHANGED,
      data: {
        stream: metricsChangeType
      }
    };
    this.trigger(metricsChangeEvent);
  }
};

/**
 * Check if the tech can support the given source.
 *
 * @param  {Object} srcObj  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
videojs.Dashas.canPlaySource = function (source) {
  var type;
  if (!source.type) {
    return '';
  }
  // Strip code information from the type because we don't get that specific
  type = source.type.replace(/;.*/, '').toLowerCase();

  if (type in videojs.Dashas.formats) {
    return 'maybe';
  }

  return '';
};

/**
 * Dashas player supported format
 * @type {{application/dash+xml: string}}
 */
videojs.Dashas.formats = {
  'application/dash+xml': 'MPD'
};


// Add Source Handler pattern functions to this tech
videojs.MediaTechController.withSourceHandlers(videojs.Dashas);

/**
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 * @param  {Object} source   The source object
 * @param  {vjs.Flash} tech  The instance of the Flash tech
 */
videojs.Dashas['nativeSourceHandler'] = {};

/**
 * Check Flash can handle the source natively
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
videojs.Dashas['nativeSourceHandler']['canHandleSource'] = function (source) {
  var type;

  if (!source.type) {
    return '';
  }

  // Strip code information from the type because we don't get that specific
  type = source.type.replace(/;.*/, '').toLowerCase();

  if (type in videojs.Dashas.formats) {
    return 'maybe';
  }

  return '';
};

/**
 * Flash Support Testing.
 */
videojs.Dashas.isSupported = function () {
  return videojs.Flash.version()[0] >= 14;
};

/**
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 * @param  {Object} source    The source object
 * @param  {vjs.Flash} tech   The instance of the Flash tech
 */
videojs.Dashas['nativeSourceHandler']['handleSource'] = function (source, tech) {
  tech.setSrc(source);
};

/**
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
videojs.Dashas['nativeSourceHandler']['dispose'] = function () {
};

// Register the native source handler
videojs.Dashas['registerSourceHandler'](videojs.Dashas['nativeSourceHandler']);

/**
 * Trigger events from the swf on the player
 * @param swfID
 * @param eventName
 */
videojs.Dashas['onEvent'] = function (swfID, eventName) {
  videojs.log('videojs.Dashas', eventName);
  videojs.Flash.onEvent(swfID, eventName);
};
/**
 * Log errors from the swf.
 *
 * @param  {String} swfID  The source object
 * @param  {int} code  The error code
 * @param  {Object} mediaError  The MediaError metadata
 */
videojs.Dashas['onError'] = function (swfID, code, mediaError) {
  videojs.Flash.onError(swfID, code, mediaError);
};

videojs.Dashas.prototype.metricsInterval = 0;
/**
 * Set the video source.
 *
 * @param  {String} source The source URL
 */
videojs.Dashas.prototype.src = function (src) {
  var tech = this;

  // do nothing if the src is false
  if (!src) {
    return;
  }

  this.src_ = src;

  this.player().ready(function () {
    // do nothing if the tech has been disposed already
    // this can occur if someone sets the src in player.ready(), for instance
    if (!tech.el()) {
      return;
    }
    var autoPlay = this.player_.autoplay();
    var serverUrl = videojs.Dashas.buildMetadataUrl(this.options());
    var customData = videojs.Dashas.buildOptData(this.options());

    this.el_.vjs_source(src, autoPlay, serverUrl, customData);
  });
};

videojs.Dashas.prototype.setSrc = function (source) {
  // Make sure source URL is absolute.
  source.src = videojs.getAbsoluteURL(source.src);
  var options = this.options();
  var autoPlay = this.player_.autoplay();
  var serverUrl = videojs.Dashas.buildMetadataUrl(options);
  var customData = videojs.Dashas.buildOptData(options);

  this.el_.vjs_source(source.src, autoPlay, serverUrl, customData);

  // Currently the SWF doesn't autoplay if you load a source later.
  // e.g. Load player w/ no source, wait 2s, set src.
  //if (autoPlay) {
  //  var tech = this;
  //  this.setTimeout(function () {
  //    tech.play();
  //  }, 0);
  //}
};

videojs.Dashas.extractAssetId = function (source) {
  var reg = /^(.*\/)?(?:$|(.+?)(?:(\.[^.]*$)|$))/;
  var filePath = source.match(reg);

  var assetId = filePath[2];
  return assetId;
};

videojs.Dashas.getDRMData = function (options) {
  var drmData = options.protData['com.adobe.flashaccess'];
  var customData = drmData['httpRequestHeaders'] ? drmData['httpRequestHeaders'].customData || {} : {};
  var serverUrl = drmData['serverURL'] ? drmData['serverURL'] || '' : '';
  var assetId = options.source ? videojs.Dashas.extractAssetId(options.source.src) : '';

  if (options.source && !options.source.drm) {
    serverUrl = customData = assetId = '';
  }

  return {
    customData: customData,
    serverUrl: serverUrl,
    assetId: assetId,
    variantId: ''//on utilise pas cette key
  }
};

videojs.Dashas.buildMetadataUrl = function (options) {
  var data = videojs.Dashas.getDRMData(options);
  var metadataUrl = data.serverUrl;
  if (data.customData) {
    metadataUrl += '?optData=' + data.customData;
  }
  if (data.assetId) {
    metadataUrl += '&assetId=' + data.assetId;
  }
  if (data.variantId) {
    metadataUrl += '&variantId=' + data.variantId;
  }
  return metadataUrl;
};

videojs.Dashas.buildOptData = function (options) {
  return videojs.Dashas.getDRMData(options).customData
};


videojs.Dashas.prototype.getDroppedFrames = function () {
  return this.el().vjs_getProperty('droppedFrames');
};
videojs.Dashas.prototype.videoClass = function () {
  return this.el().vjs_videoClass();
};
videojs.Dashas.prototype.getBuffered = function () {
  return this.el().vjs_getProperty('buffered');
};
videojs.Dashas.prototype.getBufferLevel = function () {
  return this.el().vjs_getProperty('bufferLevel');
};
videojs.Dashas.prototype.getCurrentAudioBandwidth = function () {
  return this.el().vjs_getProperty('currentAudioBandwidth');
};
videojs.Dashas.prototype.getCurrentVideoBandwidth = function () {
  return this.el().vjs_getProperty('currentVideoBandwidth');
};

videojs.Dashas.prototype.getPlaybackStatistics = function () {
  var z = this.getBuffered(), W = (this.getBufferLevel(), this.getDroppedFrames()), Z = this.getCurrentVideoBandwidth(), K = this.getCurrentAudioBandwidth(), R = {
    bandwidth: Z,
    bufferLength: z,
    droppedFrames: W
  }, N = {bandwidth: K, bufferLength: z};
  return {video: R, audio: N};
};

videojs.Dashas.now = function () {
  return new Date().getTime();
};

videojs.Dashas.prototype.currentTime = function () {
  return this.el().vjs_getProperty('currentTime');
};

videojs.Dashas.prototype.buffered = function () {
  return this.el().vjs_getProperty('buffered');
};

videojs.Dashas.prototype.setAudioTrack = function (track) {
  this.el().vjs_setProperty('forcedAudioLang', track.index);
  videojs.MediaTechController.prototype.setAudioTrack.call(this, track);
};

videojs.Dashas.prototype.audioTracks = function () {
  return this.el().vjs_getProperty('audioTracks');
};

//
//videojs.Dashas = videojs.Flash.extend({
//  init: function (W, Z, K) {
//    var R = function () {
//      W.isReady = !1;
//    }, N, M;
//    R();
//    var P = !!W.options().autoplay;
//    W.options().children.bigPlayButton = !P, W.on("playerready", function () {
//      var z = function () {
//        W.isReady = !0;
//      };
//      z();
//    }), Z.assetId && (N = encodeURIComponent(videojs.Dashas.buildMetadataUrl(Z)), M = encodeURIComponent(videojs.Dashas.buildOptData(Z))), this.cache_ = {
//      buffered: {
//        timestamp: 0,
//        value: null
//      }, currentTime: {timestmap: 0, value: null}, playing: !1
//    }, this.initialized_ = !1, this.playPressed_ = !1, Z.swf = Z.flashFile, maxBufferLength = 15, void 0 !== Z.ABRParameters && b9o.u4v(null, Z.ABRParameters) && b9o.s4v("", Z.ABRParameters) && Z.ABRParameters.maxBufferLength && void 0 !== Z.ABRParameters.maxBufferLength && (maxBufferLength = Z.ABRParameters.maxBufferLength), Z.flashVars = videojs.util.mergeOptions({
//      metadataUrl: N,
//      authenticationToken: M,
//      spinner: !1,
//      watermark: !1,
//      debug: Z.debug && Z.debug === !0 ? !0 : !1,
//      quality: "autolow",
//      errorEventProxyFunction: "videojs.Dashas.onError",
//      maxBufferLength: maxBufferLength
//    }, Z.flashVars), Z.source && Z.source.src && (Z.flashVars.src = encodeURIComponent(Z.source.src)), videojs.Flash.call(this, W, Z, K), W.setAudioTrack = videojs.bind(this, this.setAudioTrack), W.audioTracks = videojs.bind(this, this.audioTracks), W.subtitleTracks = videojs.bind(this, this.textTracks), W.absoluteTime = videojs.bind(this, this.currentTime), W.setSubsTrack = videojs.bind(this, this.setSubsTrack), W.getBuffered = videojs.bind(this, this.getBuffered), W.getBufferLevel = videojs.bind(this, this.getBufferLevel), W.getDroppedFrames = videojs.bind(this, this.getDroppedFrames), W.getCurrentAudioBandwidth = videojs.bind(this, this.getCurrentAudioBandwidth), W.getCurrentVideoBandwidth = videojs.bind(this, this.getCurrentVideoBandwidth), W.getPlaybackStatistics = videojs.bind(this, this.getPlaybackStatistics), W.videoClass = videojs.bind(this, this.videoClass), W.debug_maxRepresentationHeight = videojs.bind(this, this.maxRepresentationHeight), W.debug_minRepresentationHeight = videojs.bind(this, this.minRepresentationHeight), W.loadSrc = videojs.bind(this, this.loadSrc), W.on(["play", "playing", "seeking", "pause", "waiting", "ended"], videojs.bind(this, this.resetCache)), W.on(["play"], videojs.bind(this, this.markPlay)), W.on(["playing"], videojs.bind(this, this.markPlaying)), W.on(["seeking", "pause", "waiting", "ended"], videojs.bind(this, this.unmarkPlaying)), W.on(["loadedmetadata"], videojs.bind(this, this.markInitializedAndPlayIfNeeded));
//  }
//}), videojs.Dashas.prototype.maxRepresentationHeight = function (z) {
//  return z ? void this.el().vjs_setProperty("maxRepresentationHeight", z) : this.el().vjs_getProperty("maxRepresentationHeight");
//}, videojs.Dashas.prototype.minRepresentationHeight = function (z) {
//  return z ? void this.el().vjs_setProperty("minRepresentationHeight", z) : this.el().vjs_getProperty("minRepresentationHeight");
//}, videojs.Dashas.buildMetadataUrl = function (z) {
//  var W, Z, K, R, N = "";
//  return W = videojs.Dashas.buildOptData(z), R = z.authenticationToken, Z = z.assetId, K = z.variantId, N += z.accessLicenseServerURL + "?optData=" + W, void 0 !== Z && b9o.e4v(null, Z) && b9o.U4v("", Z) && (N += "&assetId=" + Z), void 0 !== K && b9o.o9v(null, K) && b9o.Z9v("", K) && (N += "&variantId=" + K), (void 0 === R || b9o.p9v(null, R) || b9o.P9v("", R)) && (R = null), N += b9o.r9v(null, R) ? "" : "&authToken=" + R;
//}, videojs.Dashas.buildOptData = function (z) {
//  return (new castLabsDashJS.classes.Utils).B64Tools.encode(JSON.stringify(z.customData));
//}, videojs.Dashas.prototype.limitToXEntries = function (z, W) {
//  for (; b9o.S9v(z.length, W);)z.shift();
//}, videojs.Dashas.prototype.getDroppedFrames = function () {
//  return this.el().vjs_getProperty("droppedFrames");
//}, videojs.Dashas.prototype.videoClass = function () {
//  return this.el().vjs_videoClass();
//}, videojs.Dashas.prototype.getBuffered = function () {
//  return this.el().vjs_getProperty("buffered");
//}, videojs.Dashas.prototype.getBufferLevel = function () {
//  return this.el().vjs_getProperty("bufferLevel");
//}, videojs.Dashas.prototype.getCurrentAudioBandwidth = function () {
//  return this.el().vjs_getProperty("currentAudioBandwidth");
//}, videojs.Dashas.prototype.getCurrentVideoBandwidth = function () {
//  return this.el().vjs_getProperty("currentVideoBandwidth");
//}, videojs.Dashas.prototype.getPlaybackStatistics = function () {
//  var z = this.getBuffered(), W = (this.getBufferLevel(), this.getDroppedFrames()), Z = this.getCurrentVideoBandwidth(), K = this.getCurrentAudioBandwidth(), R = {
//    bandwidth: Z,
//    bufferLength: z,
//    droppedFrames: W
//  }, N = {bandwidth: K, bufferLength: z};
//  return {video: R, audio: N};
//}, videojs.Dashas.onError = function (z, W) {
//  var Z = videojs(z);
//  "string" == typeof W && -1 != W.indexOf("MANIFEST_LOAD_ERROR") ? Z.error({
//    code: 2,
//    subtype: "MANIFEST_LOAD_ERROR"
//  }) : "string" == typeof W && -1 != W.indexOf("SEGMENT_LOAD_ERROR") ? Z.error({
//    code: 2,
//    subtype: "SEGMENT_LOAD_ERROR"
//  }) : videojs.Flash.onError(z, W);
//}, videojs.Dashas.prototype.loadSrc = function (z, W) {
//  var Z, K, R, N = this, M = function () {
//    Z = !1, "boolean" == typeof W.autoplay && (Z = W.autoplay), W.assetId && (K = videojs.Dashas.buildMetadataUrl(W), R = videojs.Dashas.buildOptData(W)), N.el().vjs_source(z, Z, K, R);
//  };
//  this.player().isReady === !1 ? this.player().one("playerready", function () {
//    setTimeout(function () {
//      M();
//    }, 0);
//  }) : setTimeout(function () {
//    M();
//  }, 0);
//}, videojs.Dashas.now = function () {
//  return b9o.E9v((new Date).getTime(), 1e3);
//}, videojs.Dashas.isSupported = function () {
//  var z = videojs.Flash.version();
//  return b9o.q9v(z[0], 11) || b9o.J9v(11, z[0]) && b9o.H9v(z[1], 5);
//}, videojs.Dashas.canPlaySource = function (z) {
//  return b9o.V9v("application/dash+xml", z.type) ? "maybe" : "";
//}, videojs.Dashas.prototype.setSubsTrack = function (z) {
//  this.player().setTextTrack(z);
//}, videojs.Dashas.prototype.setAudioTrack = function (z) {
//  this.el().vjs_setProperty("forcedAudioLang", z);
//}, videojs.Dashas.prototype.setCurrentTime = function (z) {
//  this.el().vjs_setProperty("currentTime", z);
//}, videojs.Dashas.prototype.currentTime = function () {
//  if (!this.el().vjs_getProperty)return 0;
//  if (b9o.x9v(null, this.cache_.currentTime.value) && this.updateCurrentTime(), this.cache_.playing) {
//    var z = b9o.m9v(videojs.Dashas.now(), this.cache_.currentTime.timestamp);
//    return b9o.X9v(z, 5) && (this.updateCurrentTime(), z = b9o.g9v(videojs.Dashas.now(), this.cache_.currentTime.timestamp)), this.cache_.currentTime.value + z;
//  }
//  return this.cache_.currentTime.value;
//}, videojs.Dashas.prototype.buffered = function () {
//  if (!this.el().vjs_getProperty)return 0;
//  var z = b9o.f9v(videojs.Dashas.now(), this.cache_.buffered.timestamp);
//  return b9o.h9v(z, 5) && (this.cache_.buffered.value = videojs.createTimeRange(0, this.el().vjs_getProperty("buffered")), this.cache_.buffered.timestamp = videojs.Dashas.now()), this.cache_.buffered.value;
//}, videojs.Dashas.prototype.play = function () {
//  this.initialized_ === !1 ? (this.player().addClass("vjs-waiting"), this.player().removeChild("bigPlayButton"), this.playPressed_ = !0) : videojs.Flash.prototype.play.call(this);
//}, videojs.Dashas.prototype.resetCache = function () {
//  this.cache_.currentTime.value = null, this.cache_.currentTime.timestamp = 0, this.cache_.buffered.value = null, this.cache_.buffered.timestamp = 0;
//}, videojs.Dashas.prototype.updateCurrentTime = function () {
//  this.cache_.currentTime.value = this.el().vjs_getProperty("currentTime"), this.cache_.currentTime.timestamp = videojs.Dashas.now();
//}, videojs.Dashas.prototype.unmarkPlaying = function () {
//  this.cache_.playing = !1;
//}, videojs.Dashas.prototype.markPlay = function () {
//  this.cache_.playing = !0;
//}, videojs.Dashas.prototype.markPlaying = function () {
//  this.player().paused() || (this.cache_.playing = !0);
//}, videojs.Dashas.prototype.markInitializedAndPlayIfNeeded = function () {
//  this.initialized_ = !0, this.playPressed_ === !0 && (this.playPressed_ = !1, this.play());
//}, videojs.Dashas.prototype.duration = function () {
//  var z = this.el().vjs_getProperty("duration");
//  return b9o.C9v(0, z) ? z : z + 1;
//}
