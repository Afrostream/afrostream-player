/**
 * @file dash.js
 * DASH Media Controller - Wrapper for HTML5 Media API
 */
import videojs from 'video.js';
import {MediaPlayer} from 'dashjs';
import window from 'global/window';

const Component = videojs.getComponent('Component');
const Tech = videojs.getComponent('Tech');
const Html5 = videojs.getComponent('Html5');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */
class Dash extends Html5 {
  constructor(options, ready) {
    super(options, ready);

    let tracks;
    tracks = this.audioTracks();
    if (tracks) {
      let changeHandler = ::this.handleAudioTracksChange;

      tracks.addEventListener('change', changeHandler);
      this.on('dispose', function () {
        tracks.removeEventListener('change', changeHandler);
      });
    }
    tracks = this.videoTracks();
    if (tracks) {
      let changeHandler = ::this.handleVideoTracksChange;

      tracks.addEventListener('change', changeHandler);
      this.on('dispose', function () {
        tracks.removeEventListener('change', changeHandler);
      });
    }
  }


  /**
   * Detect if source is Live
   * TODO detect with other method based on duration Infinity
   * @returns {boolean}
   */
  isDynamic() {
    let isDynamic = false;
    try {
      isDynamic = this.mediaPlayer_.time();
    } catch (e) {
      videojs.log(e);
    }
    return isDynamic;
  };

  duration() {
    let duration = super.duration();
    //FIXME WTF for detect live we should get duration to Infinity
    return this.isDynamic() ? Infinity : duration;
  }

  //play() {
  //  let isDynamic = this.isDynamic();
  //  if (isDynamic) {
  //    this.mediaPlayer_.retrieveManifest(this.options_.source.src, ::this.initializeDashJS);
  //  }
  //  super.play();
  //}

  /**
   * Set video
   *
   * @param {Object=} src Source object
   * @method setSrc
   */
  src(src) {
    if (src === undefined) {
      return this.el_.src;
    } else {
      this.keySystemOptions_ = this.buildDashJSProtData(this.options_.protData);

      // Save the context after the first initialization for subsequent instances
      this.context_ = this.context_ || {};
      // But make a fresh MediaPlayer each time the sourceHandler is used
      this.mediaPlayer_ = MediaPlayer(this.context_).create();

      // Must run controller before these two lines or else there is no
      // element to bind to.
      this.mediaPlayer_.initialize();
      this.mediaPlayer_.attachView(this.el());
      this.mediaPlayer_.on(MediaPlayer.events.STREAM_INITIALIZED, ::this.onInitialized);
      this.mediaPlayer_.on(MediaPlayer.events.TEXT_TRACKS_ADDED, ::this.onTextTracksAdded);
      this.mediaPlayer_.on(MediaPlayer.events.METRIC_CHANGED, ::this.onMetricChanged);
      this.mediaPlayer_.on(MediaPlayer.events.PLAYBACK_PROGRESS, ::this.onProgress);
      // Dash.js autoplays by default
      if (!this.player_.options().autoplay) {
        this.mediaPlayer_.setAutoPlay(false);
      }

      this.mediaPlayer_.setInitialMediaSettingsFor('audio', {lang: this.options_.lang});
      this.mediaPlayer_.setInitialMediaSettingsFor('video', {lang: this.options_.lang});
      this.mediaPlayer_.setTrackSwitchModeFor('audio', 'neverReplace');//alwaysReplace
      this.mediaPlayer_.setTrackSwitchModeFor('video', 'neverReplace');//alwaysReplace

      this.mediaPlayer_.setScheduleWhilePaused(this.options_.scheduleWhilePaused);
      this.mediaPlayer_.setAutoSwitchQuality(this.options_.autoSwitch);
      this.mediaPlayer_.enableBufferOccupancyABR(this.options_.bolaEnabled);

      this.mediaPlayer_.setBufferToKeep(this.options_.buffer.minBufferTime);
      this.mediaPlayer_.setBufferPruningInterval(this.options_.buffer.bufferPruningInterval);
      this.mediaPlayer_.setStableBufferTime(this.options_.buffer.minBufferTime);
      this.mediaPlayer_.setBufferTimeAtTopQuality(this.options_.buffer.bufferTimeAtTopQuality);
      this.mediaPlayer_.setBufferTimeAtTopQualityLongForm(this.options_.buffer.bufferTimeAtTopQualityLongForm);
      this.mediaPlayer_.setLongFormContentDurationThreshold(this.options_.buffer.longFormContentDurationThreshold);
      this.mediaPlayer_.setRichBufferThreshold(this.options_.buffer.longFormContentDurationThreshold);
      this.mediaPlayer_.setBandwidthSafetyFactor(this.options_.buffer.bandwidthSafetyFactor);
      // ReplaceMediaController.TRACK_SWITCH_MODE_ALWAYS_REPLACE
      // ReplaceMediaController.TRACK_SWITCH_MODE_NEVER_REPLACE
      //player.setInitialMediaSettingsFor("video", {role: $scope.initialSettings.video});
      this.player_.on('texttrackchange', ::this.textTracksChange);

      this.player_.trigger('loadstart');
      // Fetches and parses the manifest - WARNING the callback is non-standard "error-last" style
      this.ready(() => {
        this.mediaPlayer_.retrieveManifest(src, ::this.initializeDashJS);
      });
    }
  }

  onInitialized(manifest, err) {
    if (this.playbackInitialized) {
      return;
    }
    this.playbackInitialized = true;

    if (err) {
      this.player_.error(err);
    }

    this.triggerReady();

    this.trigger(MediaPlayer.events.STREAM_INITIALIZED);

    let bitrates = this.mediaPlayer_.getBitrateInfoListFor('video');
    let audioDashTracks = this.mediaPlayer_.getTracksFor('audio');
    let videoDashTracks = this.mediaPlayer_.getTracksFor('video');
    let autoSwitch = this.mediaPlayer_.getAutoSwitchQuality();

    let defaultAudio = this.mediaPlayer_.getInitialMediaSettingsFor('audio');
    let defaultVideo = this.mediaPlayer_.getInitialMediaSettingsFor('video');
    let initialVideoBitrate = this.mediaPlayer_.getInitialBitrateFor('video');

    let i;

    for (i = 0; i < audioDashTracks.length; i++) {
      let track = audioDashTracks[i];
      let plTrack = this.addAudioTrack('main', track.label, track.lang);
      plTrack.enabled = plTrack['language'] === defaultAudio.lang;
    }

    for (i = 0; i < videoDashTracks.length; i++) {
      let track = videoDashTracks[i];
      let bitrateList = track.bitrateList;
      for (let j = 0; j < bitrateList.length; j++) {
        let bitRateInfo = bitrateList[j] / 1000;
        let bitRateTrack = this.addVideoTrack('main', bitRateInfo, bitRateInfo);
        bitRateTrack.selected = !autoSwitch && initialVideoBitrate === bitRateInfo;
      }
    }
  }

  onProgress(e) {
    this.trigger('progress');
  }

  onMetricChanged(e) {
    // get current buffered ranges of video element and keep them up to date
    if (e.mediaType !== 'video' && e.mediaType !== 'audio' && e.mediaType !== 'p2pweb') {
      return;
    }
    var metrics = this.getCribbedMetricsFor(e.mediaType);
    if (metrics) {
      this.metrics_[e.mediaType] = videojs.mergeOptions(this.metrics_[e.mediaType], metrics);
      //this.trigger(videojs.obj.copy(e));
      var metricsChangeEvent = {
        type: MediaPlayer.events.METRIC_CHANGED,
        data: e.data
      };
      this.trigger(metricsChangeEvent);
    }
  }

  getCribbedMetricsFor(type) {
    let metrics = this.mediaPlayer_.getMetricsFor(type),
      dashMetrics = this.mediaPlayer_.getDashMetrics(),
      repSwitch,
      bufferLevel,
      httpRequests,
      droppedFramesMetrics,
      bitrateIndexValue,
      bandwidthValue,
      pendingValue,
      numBitratesValue,
      bufferLengthValue = 0,
      point,
      movingLatency = {},
      movingDownload = {},
      movingRatio = {},
      droppedFramesValue = 0,
      requestsQueue,
      fillmoving = function (type, Requests) {
        var requestWindow,
          downloadTimes,
          latencyTimes,
          durationTimes;

        requestWindow = Requests
          .slice(-20)
          .filter(function (req) {
            return req.responsecode >= 200 && req.responsecode < 300 && !!req._mediaduration && req.type === "MediaSegment" && req._stream === type;
          })
          .slice(-4);
        if (requestWindow.length > 0) {

          latencyTimes = requestWindow.map(function (req) {
            return Math.abs(req.tresponse.getTime() - req.trequest.getTime()) / 1000;
          });

          movingLatency[type] = {
            average: latencyTimes.reduce(function (l, r) {
              return l + r;
            }) / latencyTimes.length,
            high: latencyTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }),
            low: latencyTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }),
            count: latencyTimes.length
          };

          downloadTimes = requestWindow.map(function (req) {
            return Math.abs(req._tfinish.getTime() - req.tresponse.getTime()) / 1000;
          });

          movingDownload[type] = {
            average: downloadTimes.reduce(function (l, r) {
              return l + r;
            }) / downloadTimes.length,
            high: downloadTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }),
            low: downloadTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }),
            count: downloadTimes.length
          };

          durationTimes = requestWindow.map(function (req) {
            return req._mediaduration;
          });

          movingRatio[type] = {
            average: (durationTimes.reduce(function (l, r) {
              return l + r;
            }) / downloadTimes.length) / movingDownload[type].average,
            high: durationTimes.reduce(function (l, r) {
              return l < r ? r : l;
            }) / movingDownload[type].low,
            low: durationTimes.reduce(function (l, r) {
              return l < r ? l : r;
            }) / movingDownload[type].high,
            count: durationTimes.length
          };
        }
      };

    if (metrics && dashMetrics) {
      repSwitch = dashMetrics.getCurrentRepresentationSwitch(metrics);
      bufferLevel = dashMetrics.getCurrentBufferLevel(metrics);
      httpRequests = dashMetrics.getHttpRequests(metrics);
      droppedFramesMetrics = dashMetrics.getCurrentDroppedFrames(metrics);
      requestsQueue = dashMetrics.getRequestsQueue(metrics);

      fillmoving("video", httpRequests);
      fillmoving("audio", httpRequests);

      var streamIdx = this.streamInfo ? this.streamInfo.index : 0;

      if (repSwitch !== null) {
        bitrateIndexValue = dashMetrics.getIndexForRepresentation(repSwitch.to, streamIdx);
        bandwidthValue = dashMetrics.getBandwidthForRepresentation(repSwitch.to, streamIdx);
        bandwidthValue = bandwidthValue / 1000;
        bandwidthValue = Math.round(bandwidthValue);
      }

      numBitratesValue = dashMetrics.getMaxIndexForBufferType(type, streamIdx);

      if (bufferLevel !== null) {
        bufferLengthValue = bufferLevel.toPrecision(5);
      }

      if (droppedFramesMetrics !== null) {
        droppedFramesValue = droppedFramesMetrics.droppedFrames;
      }

      if (isNaN(bandwidthValue) || bandwidthValue === undefined) {
        bandwidthValue = 0;
      }

      if (isNaN(bitrateIndexValue) || bitrateIndexValue === undefined) {
        bitrateIndexValue = 0;
      }

      if (isNaN(numBitratesValue) || numBitratesValue === undefined) {
        numBitratesValue = 0;
      }

      if (isNaN(bufferLengthValue) || bufferLengthValue === undefined) {
        bufferLengthValue = 0;
      }

      pendingValue = this.mediaPlayer_.getQualityFor(type);

      return {
        bandwidth: bandwidthValue,
        bitrateIndex: bitrateIndexValue + 1,
        pendingIndex: (pendingValue !== bitrateIndexValue) ? "(-> " + (pendingValue + 1) + ")" : "",
        numBitrates: numBitratesValue,
        bufferLength: bufferLengthValue,
        droppedFrames: droppedFramesValue,
        movingLatency: movingLatency,
        movingDownload: movingDownload,
        movingRatio: movingRatio,
        requestsQueue: requestsQueue
      }
    } else {
      return null;
    }
  }

  buildDashJSProtData(keySystemOptions) {
    var output = {};

    if (!keySystemOptions) {
      return output;
    }

    Object.keys(keySystemOptions).forEach((key, data)=> {
      if (data.licenseUrl) {
        data.laURL = data.licenseUrl;
        delete data.licenseUrl;
      }
    });

    return keySystemOptions;
  }

  initializeDashJS(manifest, err) {
    let manifestProtectionData = {};

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
      this.keySystemOptions_ = videojs.mergeOptions(
        this.keySystemOptions_,
        manifestProtectionData);
    }

    // We have to reset any mediaKeys before the attachSource call below
    this.resetSrc_(()=> {
      this.afterMediaKeysReset(manifest)
    });
  }

  onTextTracksAdded(e) {
    const tracks = e.tracks;
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
  }

  /**
   * Update display texttracks
   *
   * @method updateDisplay
   */
  textTracksChange() {
    const tracks = this.textTracks();

    if (!tracks) {
      return;
    }

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      if (track['mode'] === 'showing') {
        this.mediaPlayer_.setTextTrack(i);
      }
    }
  }

  handleAudioTracksChange() {
    const tracks = this.audioTracks();

    if (!tracks || !this.playbackInitialized) {
      return;
    }

    let audioDashTracks = this.mediaPlayer_.getTracksFor('audio');

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      if (track['enabled']) {
        let audioDashTrack = audioDashTracks[i];
        if (track['language'] == audioDashTrack['lang']) {
          audioDashTracks['enabled'] = true;
          try {
            this.mediaPlayer_.setCurrentTrack(audioDashTracks[i]);
          } catch (err) {
            videojs.log(err);
          }
        }
      }
    }
  }

  handleVideoTracksChange() {
    const tracks = this.videoTracks();

    if (!tracks || !this.playbackInitialized) {
      return;
    }
    var isInt = tracks.selectedIndex !== null && !isNaN(tracks.selectedIndex) && (tracks.selectedIndex % 1 === 0);

    this.mediaPlayer_.setAutoSwitchQuality(!isInt);
    if (isInt) {
      this.mediaPlayer_.setQualityFor('video', tracks.selectedIndex);
    }
  }

  afterMediaKeysReset(manifest) {
    this.showErrors();

    // Attach the source with any protection data
    this.mediaPlayer_.attachSource(manifest, null, this.keySystemOptions_, 'fr');

    this.triggerReady();
  }

  showErrors() {
    // The video element's src is set asynchronously so we have to wait a while
    // before we unhide any errors
    // 250ms is arbitrary but I haven't seen dash.js take longer than that to initialize
    // in my testing
    this.setTimeout(()=> {
      this.player_.removeClass('vjs-dashjs-hide-errors');
    }, 250);
  }

  resetSrc_(callback) {
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
  }

  dispose() {
    if (this.mediaPlayer_) {
      this.mediaPlayer_.reset();
    }
    this.resetSrc_(Function.prototype);
    super.dispose(this);
  }

}

Dash.prototype.options_ = {
  lang: 'fr',
  //Set to false to switch off adaptive bitrate switching.
  autoSwitch: true,
  //Enabling buffer-occupancy ABR will switch to the *experimental* implementation of BOLA
  bolaEnabled: true,
  //Set to true if you would like dash.js to keep downloading fragments in the background
  scheduleWhilePaused: false,
  //This value influences the buffer pruning logic.
  //https://github.com/Dash-Industry-Forum/dash.js/blob/master/src/streaming/MediaPlayer.js
  buffer: {
    //Allows you to modify the buffer that is kept in source buffer in seconds.
    bufferToKeep: 30,
    //When the time is set higher than the default you will have to wait longer
    minBufferTime: 12,
    //Allows you to modify the interval of pruning buffer in seconds.
    bufferPruningInterval: 30,
    //A percentage between 0.0 and 1 to reduce the measured throughput calculations
    bandwidthSafetyFactor: 0.9,
    //The time that the internal buffer target will be set to once playing the top quality.
    bufferTimeAtTopQuality: 30,
    //The time that the internal buffer target will be set to once playing the top quality for long form content.
    bufferTimeAtTopQualityLongForm: 60,
    //This will directly affect the buffer targets when playing back at the top quality.
    longFormContentDurationThreshold: 600,
    //A threshold, in seconds, of when dashjs abr becomes less conservative since we have a larger "rich" buffer
    richBufferThreshold: 20
  },
  protData: {}
};

/* Dash Support Testing -------------------------------------------------------- */

Dash.isSupported = function () {
  return Html5.isSupported() && !!window.MediaSource;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Dash);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Dash.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canPlayType = function (source) {

  const dashTypeRE = /^application\/dash\+xml/i;
  const dashExtRE = /\.mpd/i;

  if (dashTypeRE.test(source)) {
    return 'probably';
  } else if (dashExtRE.test(source)) {
    return 'maybe';
  } else {
    return '';
  }

};

/*
 * Check Flash can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dash.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Dash.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Dash.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

/*
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 *
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Dash.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Dash.nativeSourceHandler.dispose = function () {
};

// Register the native source handler
Dash.registerSourceHandler(Dash.nativeSourceHandler);

videojs.options.dash = {};

Component.registerComponent('Dash', Dash);
Tech.registerTech('Dash', Dash);
export default Dash;