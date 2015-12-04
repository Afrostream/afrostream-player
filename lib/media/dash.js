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
videojs.Dash = videojs.Html5.extend({
  /** @constructor */
  init: function (player, options, ready) {
    videojs.Html5.call(this, player, options, ready);
    //override config
    MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME = this.options().buffer.minBufferTime;
    MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD = this.options().buffer.lowBufferThreshold;
    MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY = this.options().buffer.bufferTimeAtTopQuality;
    MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY_LONG_FORM = this.options().buffer.bufferTimeAtTopQualityLongForm;
    MediaPlayer.dependencies.BufferController.LONG_FORM_CONTENT_DURATION_THRESHOLD = this.options().buffer.longFormContentDurationThreshold;
    MediaPlayer.dependencies.BufferController.RICH_BUFFER_THRESHOLD = this.options().buffer.richBufferThreshold;
    MediaPlayer.dependencies.BufferController.BUFFER_TO_KEEP = this.options().buffer.bufferToKeep;
    MediaPlayer.dependencies.BufferController.BUFFER_PRUNING_INTERVAL = this.options().buffer.bufferPruningInterval;
  }
});


videojs.options.dash = {};

videojs.Dash.prototype.options_ = {
  autoSwitch: true,
  buffer: {
    minBufferTime: 12,
    lowBufferThreshold: 4,
    bufferTimeAtTopQuality: 30,
    bufferTimeAtTopQualityLongForm: 300,
    longFormContentDurationThreshold: 600,
    richBufferThreshold: 20,
    bufferToKeep: 30,
    bufferPruningInterval: 30
  },
  protData: {}
};


videojs.Dash.prototype.getWidevineProtectionData = null;
videojs.Dash.prototype.context_ = null;

videojs.Dash.prototype.duration = function () {
  var duration = videojs.Html5.prototype.duration.call(this);
  var isDynamic = false;
  //FIXME WTF for detect live we should get duration to Infinity
  try {
    isDynamic = this.mediaPlayer_.getVideoModel().system.getObject('playbackController').getIsDynamic();
  } catch (e) {
    videojs.warn(e);
  }
  return isDynamic ? Infinity : duration;
};

videojs.Dash.prototype.setSrc = function (source) {
  if (!source.src) {
    return;
  }

  this.isReady_ = false;
  this.keySystemOptions_ = this.buildDashJSProtData(this.options().protData);

  this.hideErrors();

  // Save the context after the first initialization for subsequent instances
  this.context_ = this.context_ || new Dash.di.DashContext();
  // But make a fresh MediaPlayer each time the sourceHandler is used
  this.player().mediaPlayer_ = this.mediaPlayer_ = new MediaPlayer(this.context_);


  // Must run controller before these two lines or else there is no
  // element to bind to.
  this.mediaPlayer_.startup();
  this.mediaPlayer_.attachView(this.el());
  this.mediaPlayer_.addEventListener(MediaPlayer.events.STREAM_INITIALIZED,
    videojs.bind(this, this.onInitialized));
  this.mediaPlayer_.addEventListener(MediaPlayer.events.TEXT_TRACKS_ADDED,
    videojs.bind(this, this.onTextTracksAdded));

  // Dash.js autoplays by default
  if (!this.player().options().autoplay) {
    this.mediaPlayer_.setAutoPlay(false);
  }
  this.mediaPlayer_.setAutoSwitchQuality(this.options().autoSwitch);

  this.mediaPlayer_.setInitialMediaSettingsFor('audio', {lang: 'fr'});
  //player.setInitialMediaSettingsFor("video", {role: $scope.initialSettings.video});

  this.player().trigger('loadstart');
  // Fetches and parses the manifest - WARNING the callback is non-standard "error-last" style
  this.ready(function () {
    this.mediaPlayer_.retrieveManifest(source.src, videojs.bind(this, this.initializeDashJS));
  });
};

videojs.Dash.prototype.onTextTracksAdded = function (e) {
  var tracks = e.data.tracks;
  if (tracks) {
    var l = tracks.length, track;
    for (var i = 0; i < l; i++) {
      track = tracks[i];

      if (track.kind !== 'captions') {
        break;
      }
      if (track.lang === 'fra') {
        track.defaultTrack = true;
        this.mediaPlayer_.setTextTrack(i);
      }
    }
  }
};

videojs.Dash.prototype.onInitialized = function (manifest, err) {
  if (err) {
    this.player().error(err);
  }
  var bitrates = this.mediaPlayer_.getBitrateInfoListFor('video');
  var audios = this.mediaPlayer_.getTracksFor('audio');
  var autoSwitch = this.mediaPlayer_.getAutoSwitchQuality();
  // bitrates are sorted from lowest to the best values
  // so the last one has the best quality
  //  maxQuality = bitrates[bitrates.length - 1].qualityIndex;
  // set max quality
  /*jshint sub:true*/
  this.videoTracks(bitrates);
  this.audioTracks(audios);
  this['featuresAudioIndex'] = this['featuresAudioIndex'] || (audios.length - 1);
  this['featuresBitrateIndex'] = autoSwitch ? bitrates.length : (this['featuresBitrateIndex'] || bitrates.length);
};

/*jshint sub:true*/
videojs.Dash.prototype.getPlaybackStatistics = function () {
  return this.player().afrostream.getPlaybackStatistics();
};

videojs.Dash.prototype.initializeDashJS = function (manifest, err) {
  var manifestProtectionData = {};

  if (err) {
    this.showErrors();
    this.triggerReady();
    this.dispose();
    return;
  }

  // If we haven't received protection data from the outside world try to get it from the manifest
  // We merge the two allowing the manifest to override any keySystemOptions provided via src()
  if (this.getWidevineProtectionData) {
    manifestProtectionData = this.getWidevineProtectionData(manifest);
    this.keySystemOptions_ = videojs.util.mergeOptions(
      this.keySystemOptions_,
      manifestProtectionData);
  }

  // We have to reset any mediaKeys before the attachSource call below
  this.resetSrc_(videojs.bind(this, function afterMediaKeysReset() {
    this.showErrors();

    // Attach the source with any protection data
    this.mediaPlayer_.attachSource(manifest, null, this.keySystemOptions_, 'fr');

    this.triggerReady();
  }));
};

videojs.Dash.prototype.videoTracks = function () {
  var bitrates;
  try {
    bitrates = this.mediaPlayer_.getBitrateInfoListFor('video');
  } catch (e) {
    videojs.log('get bitrate not possible');
  }
  return bitrates || this.mediaPlayer_.getTracksFor('video');
};

videojs.Dash.prototype.setVideoTrack = function (track) {
  var bitrates = this.mediaPlayer_.getBitrateInfoListFor('video');
  this.mediaPlayer_.setAutoSwitchQuality(track.qualityIndex >= bitrates.length);
  this.mediaPlayer_.setQualityFor('video', track.qualityIndex);
  videojs.MediaTechController.prototype.setVideoTrack.call(this, track);
};

videojs.Dash.prototype.audioTracks = function () {
  return this.mediaPlayer_.getTracksFor('audio');
};


videojs.Dash.prototype.setAudioTrack = function (track) {
  this.mediaPlayer_.setCurrentTrack(track);
  videojs.MediaTechController.prototype.setAudioTrack.call(this, track);
};

/**
 * Override textTrack base car disabled ne fonctionne pas width dahjs
 */
videojs.TextTrackMenuItem.prototype.onClick = function () {
  var kind = this.track['kind'],
    tracks = this.player_.textTracks(),
    mode,
    track,
    i = 0;

  videojs.MenuItem.prototype.onClick.call(this);

  if (!tracks) {
    return;
  }

  for (; i < tracks.length; i++) {
    track = tracks[i];

    if (track['kind'] !== kind) {
      continue;
    }

    if (track === this.track) {
      track['mode'] = 'showing';
    } else {
      track['mode'] = 'hidden';
    }
  }
};

//videojs.Dash.prototype.textTracks = function () {
//  if (!this['featuresNativeTextTracks']) {
//    return videojs.MediaTechController.prototype.textTracks.call(this);
//  }
//  var tracks = this.el_.textTracks;
//  if (tracks) {
//    var changeHandler = videojs.bind(this, function () {
//      var l = tracks.length, track;
//
//      for (var i = 0; i < l; i++) {
//        track = tracks[i];
//        if (track['kind'] !== 'captions') {
//          break;
//        }
//        if (track['mode'] === 'disabled') {
//          track['mode'] = 'hidden';
//        }
//
//        if (track['mode'] === 'showing') {
//          this.mediaPlayer_.setTextTrack(i);
//        }
//      }
//      tracks.removeEventListener('change', changeHandler);
//    });
//    tracks.addEventListener('change', changeHandler);
//    this.player().on('dispose', function () {
//      tracks.removeEventListener('change', changeHandler);
//    });
//  }
//
//  return tracks;
//};

/*
 * Add a css-class that is used to temporarily hide the error dialog while so that
 * we don't see a flash of the dialog box when we remove the video element's src
 * to reset MediaKeys in resetSrc_
 */
videojs.Dash.prototype.hideErrors = function () {
  this.player().addClass(' vjs-dashjs-hide-errors');
};

/*
 * Remove the css-class above to enable the error dialog to be shown once again
 */
videojs.Dash.prototype.showErrors = function () {
  // The video element's src is set asynchronously so we have to wait a while
  // before we unhide any errors
  // 250ms is arbitrary but I haven't seen dash.js take longer than that to initialize
  // in my testing
  this.setTimeout(function () {
    this.player().removeClass('vjs-dashjs-hide-errors');
  }, 250);
};

videojs.Dash.isArray = function (a) {
  /*jshint sub:true*/
  return Object.prototype.toString.call(a) === '[object Array]';
};

videojs.Dash.each = function (obj, fn, context) {
  var hasOwnProp = Object.prototype.hasOwnProperty;
  for (var key in obj) {
    if (hasOwnProp.call(obj, key)) {
      fn.call(context || this, key, obj[key]);
    }
  }
};


/*
 * Iterate over the `keySystemOptions` array and convert each object into
 * the type of object Dash.js expects in the `protData` argument.
 *
 * Also rename 'licenseUrl' property in the options to an 'laURL' property
 */
videojs.Dash.prototype.buildDashJSProtData = function (keySystemOptions) {
  var output = {};

  if (!keySystemOptions) {
    return output;
  }

  videojs.Dash.each(keySystemOptions, function (key, data) {
    if (data.licenseUrl) {
      data.laURL = data.licenseUrl;
      delete data.licenseUrl;
    }
  });

  return keySystemOptions;
};

/*
 * Helper function to clear any EME keys that may have been set on the video element
 *
 * The MediaKeys has to be explicitly set to null before any DRM content can be loaded into
 * a video element that already contained DRM content.
 */
videojs.Dash.prototype.resetSrc_ = function (callback) {
  // In Chrome, MediaKeys can NOT be changed when a src is loaded in the video element
  // Dash.js has a bug where it doesn't correctly reset the data so we do it manually
  // The order of these two lines is important. The video element's src must be reset
  // to allow `mediaKeys` to changed otherwise a DOMException is thrown.
  if (this.el()) {
    this.el().src = '';
    if (this.el().setMediaKeys) {
      this.el().setMediaKeys(null).then(callback, callback);
    } else {
      callback();
    }
  }
};

videojs.Dash.prototype.dispose = function () {
  if (this.mediaPlayer_) {
    this.mediaPlayer_.reset();
  }
  this.resetSrc_(function noop() {
  });
  videojs.Html5.prototype.dispose.call(this);
};

/**
 * Check if HTML5 video is supported by this browser/device
 * @return {Boolean}
 */
videojs.Dash.isSupported = function () {
  return videojs.Html5.isSupported() && !!window.MediaSource;
};

// Add Source Handler pattern functions to this tech
videojs.MediaTechController.withSourceHandlers(videojs.Dash);

/**
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 * @param  {Object} source   The source object
 * @param  {videojs.Dash} tech  The instance of the HTML5 tech
 */
/*jshint sub:true*/
videojs.Dash['nativeSourceHandler'] = {};
/**
 * Check if the video element can handle the source natively
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
/*jshint sub:true*/
videojs.Dash['nativeSourceHandler']['canHandleSource'] = function (source) {
  var dashTypeRE = /^application\/dash\+xml/i;
  var dashExtRE = /\.mpd/i;

  if (dashTypeRE.test(source.type)) {
    return 'probably';
  } else if (dashExtRE.test(source.src)) {
    return 'maybe';
  } else {
    return '';
  }
};
/**
 * Pass the source to the video element
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 * @param  {Object} source    The source object
 * @param  {vjs.Html5} tech   The instance of the Html5 tech
 */
/*jshint sub:true*/
videojs.Dash['nativeSourceHandler']['handleSource'] = function (source, tech) {
  tech.setSrc(source);
};

/**
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the getTracksForformat natively)
 */
/*jshint sub:true*/
videojs.Dash['nativeSourceHandler']['dispose'] = function () {
};

// Register the native source handler
/*jshint sub:true*/
videojs.Dash['registerSourceHandler'](videojs.Dash['nativeSourceHandler']);
