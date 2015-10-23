(function (global, factory) {

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ?
      factory(global, true) :
      function (w) {
        if (!w.document) {
          throw new Error('vjs requires a window with a document');
        }
        return factory(w);
      };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) { /*jshint unused:false*/
  /*! afrostream-player - v0.2.0 - 2015-10-23
* Copyright (c) 2015 benjipott; Licensed Apache-2.0 */
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
      player.on('loadstart', videojs.bind(this, this.onLoadStart));
      this.mediaPlayer_ = player.mediaPlayer;
      this.tech_ = player.tech;
    }
  });

  videojs.Afrostream.prototype.streamInfo = null;

  videojs.Afrostream.prototype.tech_ = null;

  videojs.Afrostream.prototype.mediaPlayer_ = null;

  videojs.Afrostream.prototype.onLoadStart = function () {
    this.addMediaPlayerHandlers();
  };

  videojs.Afrostream.prototype.addMediaPlayerHandlers = function () {
    videojs.on(this.mediaPlayer_, MediaPlayer.events.STREAM_INITIALIZED,
      videojs.bind(this, this.onInitialized));
    videojs.on(this.mediaPlayer_, MediaPlayer.events.STREAM_SWITCH_STARTED,
      videojs.bind(this, this.onStreamSwitchComplete));
    videojs.on(this.mediaPlayer_, MediaPlayer.events.STREAM_SWITCH_COMPLETED,
      videojs.bind(this, this.onStreamSwitchComplete));
    videojs.on(this.mediaPlayer_, MediaPlayer.events.METRIC_CHANGED,
      videojs.bind(this, this.onMetricChanged));
  };

  videojs.Afrostream.prototype.setQuality = function (qualityIndex) {
    var bitrates = this.mediaPlayer_.getBitrateInfoListFor('video');
    this.mediaPlayer_.setAutoSwitchQuality(qualityIndex >= bitrates.length);
    this.mediaPlayer_.setQualityFor('video', qualityIndex);

    //TODO supprimer ca pour le switch auto
    /*jshint sub:true*/
    this.tech_['featuresBitrateIndex'] = qualityIndex; //AUTO;
    this.tech_.trigger('bitratechange');

  };

  videojs.Afrostream.prototype.onStreamSwitchComplete = function (e) {
    /*jshint sub:true*/
    this.tech_['featuresBitrateIndex'] = e.data.toStreamInfo.index;
    this.streamInfo = e.data.toStreamInfo;
    var evt = videojs.fixEvent({
      type: 'bitratechange',
      data: e.data
    });
    this.tech_.trigger(evt);
  };

  videojs.Afrostream.prototype.onMetricChanged = function (e) {
    // get current buffered ranges of video element and keep them up to date
    if (e.data.stream !== 'video' && e.data.stream !== 'audio') {
      return;
    }
    var metrics = this.getCribbedMetricsFor(e.data.stream);
    if (metrics) {
      this.metrics_[e.data.stream] = videojs.util.mergeOptions(this.metrics_[e.data.stream], metrics);
      if (e.data.stream === 'video') {
        /*jshint sub:true*/
        if (metrics.bitrateIndex !== this.tech_['featuresBitrateIndex']) {
          var oldBitrateIndex = this.tech_['featuresBitrateIndex'];
          this.tech_['featuresBitrateIndex'] = metrics.bitrateIndex;
          this.tech_['featuresBitrate'] = metrics;
          this.tech_.trigger(metrics.bitrateIndex > oldBitrateIndex ? 'bandwidthIncrease' : 'bandwidthDecrease');
        }
      }
    }
  };

  videojs.Afrostream.prototype.onInitialized = function (manifest, err) {
    if (err) {
      this.player().error(err);
    }
    var bitrates = this.mediaPlayer_.getBitrateInfoListFor('video');
    // bitrates are sorted from lowest to the best values
    // so the last one has the best quality
    //  maxQuality = bitrates[bitrates.length - 1].qualityIndex;
    // set max quality
    /*jshint sub:true*/
    this.tech_['featuresBitrates'] = bitrates;
    this.tech_['featuresBitrateIndex'] = bitrates.length; //AUTO;
    videojs.log('Bitrates available:' + bitrates.length);
    //this.mediaPlayer_.setQualityFor('video', maxQuality);
    //TODO generate methods from array
    this.tech_.setQuality = videojs.bind(this, this.setQuality);
    this.tech_.trigger('initialized');
    this.tech_.trigger('bitratechange');
  };

  videojs.Afrostream.METRICS_DATA = {
    bandwidth: -1,
    bitrateIndex: 0,
    pendingIndex: '',
    numBitrates: 0,
    bufferLength: 0,
    droppedFrames: 0,
    movingLatency: 0,
    movingDownload: 0,
    movingRatio: 0,
    requestsQueue: 0
  };

  videojs.Afrostream.prototype.metrics_ = {
    video: videojs.util.mergeOptions({}, videojs.Afrostream.METRICS_DATA),
    audio: videojs.util.mergeOptions({}, videojs.Afrostream.METRICS_DATA)
  };

  videojs.Afrostream.prototype.getPlaybackStatistics = function () {
    return this.metrics_;
  };

  videojs.Afrostream.prototype.getCribbedMetricsFor = function (type) {
    var metrics = this.mediaPlayer_.getMetricsFor(type),
      metricsExt = this.mediaPlayer_.getMetricsExt(),
      repSwitch,
      bufferLevel,
      httpRequests,
      droppedFramesMetrics,
      bitrateIndex,
      bandwidth,
      pendingValue,
      numBitrates,
      bufferLength = 0,
      movingLatency = {},
      movingDownload = {},
      movingRatio = {},
      droppedFrames = 0,
      requestsQueue,
      fillmoving = function (type, Requests) {
        var requestWindow,
          downloadTimes,
          latencyTimes,
          durationTimes;

        requestWindow = Requests
          .slice(-20)
          .filter(function (req) {
            return req.responsecode >= 200 && req.responsecode < 300 && !!req.mediaduration && req.type === 'Media Segment' && req.stream === type;
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
            return Math.abs(req.tfinish.getTime() - req.tresponse.getTime()) / 1000;
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
            return req.mediaduration;
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

    if (metrics && metricsExt) {
      repSwitch = metricsExt.getCurrentRepresentationSwitch(metrics);
      bufferLevel = metricsExt.getCurrentBufferLevel(metrics);
      httpRequests = metricsExt.getHttpRequests(metrics);
      droppedFramesMetrics = metricsExt.getCurrentDroppedFrames(metrics);
      requestsQueue = metricsExt.getRequestsQueue ? metricsExt.getRequestsQueue(metrics) : {};

      fillmoving('video', httpRequests);
      fillmoving('audio', httpRequests);

      var streamIdx = this.streamInfo ? this.streamInfo.index : 0;

      if (repSwitch !== null) {
        bitrateIndex = metricsExt.getIndexForRepresentation(repSwitch.to, streamIdx);
        bandwidth = metricsExt.getBandwidthForRepresentation(repSwitch.to, streamIdx);
        bandwidth = bandwidth / 1000;
        bandwidth = Math.round(bandwidth);
      }

      numBitrates = metricsExt.getMaxIndexForBufferType(type, streamIdx);

      if (bufferLevel !== null) {
        bufferLength = bufferLevel.level.toPrecision(5);
      }

      if (droppedFramesMetrics !== null) {
        droppedFrames = droppedFramesMetrics.droppedFrames;
      }

      if (isNaN(bandwidth) || bandwidth === undefined) {
        bandwidth = 0;
      }

      if (isNaN(bitrateIndex) || bitrateIndex === undefined) {
        bitrateIndex = 0;
      }

      if (isNaN(numBitrates) || numBitrates === undefined) {
        numBitrates = 0;
      }

      if (isNaN(bufferLength) || bufferLength === undefined) {
        bufferLength = 0;
      }

      pendingValue = this.mediaPlayer_.getQualityFor(type);

      return {
        bandwidth: bandwidth,
        bitrateIndex: bitrateIndex,
        pendingIndex: (pendingValue !== bitrateIndex) ? '(-> ' + (pendingValue) + ')' : '',
        numBitrates: numBitrates,
        bufferLength: bufferLength,
        droppedFrames: droppedFrames,
        movingLatency: movingLatency,
        movingDownload: movingDownload,
        movingRatio: movingRatio,
        requestsQueue: requestsQueue
      };
    }
    else {
      return null;
    }
  };
  /**
   * add afrostream to videojs childs
   * @type {{}}
   */
  videojs.options.children.afrostream = {};

  /**
   * Get default metrix statistics object
   * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
   */
  /*jshint sub:true*/
  videojs.MediaTechController.prototype['getPlaybackStatistics'] = function () {
    return {
      video: {
        bandwidth: -1
      },
      audio: {
        bandwidth: -1
      }
    };
  };

})(window, window.videojs);

(function (global, factory) {

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = global.document ?
      factory(global, true) :
      function (w) {
        if (!w.document) {
          throw new Error('vjs requires a window with a document');
        }
        return factory(w);
      };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
}(typeof window !== 'undefined' ? window : this, function (window, noGlobal) { /*jshint unused:false*/
  /*#replaceCode#*/
  return videojs;
}));

(function (window, videojs) {
  'use strict';
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
      this.on(player, 'initialized', this.update);
      this.on(player, 'bitratechange', this.updateVisibility);
      this.on(player, 'bitratechange', this.updateLabel);
    }
  });


  videojs.ControlBar.prototype.options_.children.bitrateMenuButton = {};

  videojs.BitrateMenuButton.Labels = ['bas', 'moyen', 'normal', 'HD', 'auto'];
  videojs.BitrateMenuButton.prototype.buttonText = 'Quality Selection';
  videojs.BitrateMenuButton.prototype.className = 'vjs-bitrate';


  videojs.BitrateMenuButton.prototype.createEl = function () {
    var el = videojs.MenuButton.prototype.createEl.call(this);

    this.labelEl_ = videojs.createEl('div', {
      className: 'vjs-bitrate-value',
      innerHTML: 1.0
    });

    el.appendChild(this.labelEl_);

    return el;
  };

// Menu creation
  videojs.BitrateMenuButton.prototype.createMenu = function () {
    if (!this.player().tech) {
      return;
    }
    var menu = new videojs.Menu(this.player());
    /*jshint sub:true*/
    var bitRates = this.player().tech['featuresBitrates'];

    if (bitRates) {
      menu.addChild(
        new videojs.BitrateMenuItem(this.player(), {
          qualityIndex: bitRates.length,
          bitrate: 'Auto'
        })
      );
      for (var i = bitRates.length - 1; i >= 0; i--) {
        var bitRate = bitRates[i];
        menu.addChild(
          new videojs.BitrateMenuItem(this.player(), bitRate)
        );
      }
    }

    return menu;
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
      this.labelEl_.innerHTML = videojs.BitrateMenuButton.Labels[selected];
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

})(window, window.videojs);


/*! videojs-chromecast - v1.1.1 - 2015-09-29
* https://github.com/kim-company/videojs-chromecast
* Copyright (c) 2015 KIM Keep In Mind GmbH, srl; Licensed MIT */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  vjs.addLanguage("de", {
    "CASTING TO": "WIEDERGABE AUF"
  });

  vjs.addLanguage("it", {
    "CASTING TO": "PLAYBACK SU"
  });

  vjs.plugin("chromecast", function(options) {
    this.chromecastComponent = new vjs.ChromecastComponent(this, options);
    return this.controlBar.addChild(this.chromecastComponent);
  });

  vjs.ChromecastComponent = (function(superClass) {
    extend(ChromecastComponent, superClass);

    ChromecastComponent.prototype.buttonText = "Chromecast";

    ChromecastComponent.prototype.inactivityTimeout = 2000;

    ChromecastComponent.prototype.apiInitialized = false;

    ChromecastComponent.prototype.apiSession = null;

    ChromecastComponent.prototype.apiMedia = null;

    ChromecastComponent.prototype.casting = false;

    ChromecastComponent.prototype.paused = true;

    ChromecastComponent.prototype.muted = false;

    ChromecastComponent.prototype.currentVolume = 1;

    ChromecastComponent.prototype.currentMediaTime = 0;

    ChromecastComponent.prototype.timer = null;

    ChromecastComponent.prototype.timerStep = 1000;

    ChromecastComponent.prototype.tryingReconnect = 0;

    function ChromecastComponent(player, settings) {
      this.settings = settings;
      ChromecastComponent.__super__.constructor.call(this, player, this.settings);
      if (!player.controls()) {
        this.disable();
      }
      this.hide();
      this.initializeApi();
    }

    ChromecastComponent.prototype.initializeApi = function() {
      var apiConfig, appId, sessionRequest;
      if (!vjs.IS_CHROME) {
        return;
      }
      if (!chrome.cast || !chrome.cast.isAvailable) {
        vjs.log("Cast APIs not available");
        return;
      }
      vjs.log("Cast APIs are available");
      appId = this.settings.appId || chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
      sessionRequest = new chrome.cast.SessionRequest(appId);
      apiConfig = new chrome.cast.ApiConfig(sessionRequest, this.sessionJoinedListener, this.receiverListener.bind(this));
      return chrome.cast.initialize(apiConfig, this.onInitSuccess.bind(this), this.castError);
    };

    ChromecastComponent.prototype.sessionJoinedListener = function(session) {
      return console.log("Session joined");
    };

    ChromecastComponent.prototype.receiverListener = function(availability) {
      if (availability === "available") {
        return this.show();
      }
    };

    ChromecastComponent.prototype.onInitSuccess = function() {
      return this.apiInitialized = true;
    };

    ChromecastComponent.prototype.castError = function(castError) {
      return vjs.log("Cast Error: " + (JSON.stringify(castError)));
    };

    ChromecastComponent.prototype.doLaunch = function() {
      vjs.log("Cast video: " + (this.player_.currentSrc()));
      if (this.apiInitialized) {
        return chrome.cast.requestSession(this.onSessionSuccess.bind(this), this.castError);
      } else {
        return vjs.log("Session not initialized");
      }
    };

    ChromecastComponent.prototype.onSessionSuccess = function(session) {
      var image, key, loadRequest, mediaInfo, ref, ref1, value;
      vjs.log("Session initialized: " + session.sessionId);
      this.selectedTrack = null;
      this.apiSession = session;
      this.addClass("connected");
      mediaInfo = new chrome.cast.media.MediaInfo(this.player_.currentSrc(), this.player_.currentType());
      if (this.settings.metadata) {
        mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
        ref = this.settings.metadata;
        for (key in ref) {
          value = ref[key];
          mediaInfo.metadata[key] = value;
        }
        if (this.player_.options_.poster) {
          image = new chrome.cast.Image(this.player_.options_.poster);
          mediaInfo.metadata.images = [image];
        }
      }
      this.plTracks = this.settings.tracks;
      if (this.plTracks) {
        this.nbTrack = 1;
        this.tracks = [];
        ref1 = this.plTracks;
        for (key in ref1) {
          value = ref1[key];
          this.track = new chrome.cast.media.Track(this.nbTrack, chrome.cast.media.TrackType.TEXT);
          this.track.trackContentId = value.src;
          this.track.trackContentType = value.type;
          this.track.subtype = chrome.cast.media.TextTrackType.CAPTIONS;
          this.track.name = value.label;
          this.track.language = value.language;
          if (value.mode === 'showing') {
            this.selectedTrack = this.track;
          }
          this.track.customData = null;
          this.tracks.push(this.track);
          ++this.nbTrack;
        }
        mediaInfo.textTrackStyle = new chrome.cast.media.TextTrackStyle();
        mediaInfo.tracks = this.tracks;
      }
      loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);
      loadRequest.autoplay = true;
      loadRequest.currentTime = this.player_.currentTime();
      this.apiSession.loadMedia(loadRequest, this.onMediaDiscovered.bind(this), this.castError);
      return this.apiSession.addUpdateListener(this.onSessionUpdate.bind(this));
    };

    ChromecastComponent.prototype.onTrackChangeHandler = function() {
      var i, len, ref, track;
      this.activeTrackIds = [];
      ref = this.player_.textTracks();
      for (i = 0, len = ref.length; i < len; i++) {
        track = ref[i];
        if (track['mode'] === 'showing') {
          this.activeTrackIds.push(track.id);
        }
      }
      this.tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(this.activeTrackIds);
      if (this.apiMedia) {
        return this.apiMedia.editTracksInfo(this.tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
      }
    };

    ChromecastComponent.prototype.onTrackSuccess = function() {
      return vjs.log('track added');
    };

    ChromecastComponent.prototype.onTrackError = function() {
      return vjs.log('track error');
    };

    ChromecastComponent.prototype.onMediaDiscovered = function(media) {
      this.apiMedia = media;
      this.apiMedia.addUpdateListener(this.onMediaStatusUpdate.bind(this));
      if (this.selectedTrack) {
        this.activeTrackIds = [this.selectedTrack.trackId];
        this.tracksInfoRequest = new chrome.cast.media.EditTracksInfoRequest(this.activeTrackIds);
        this.apiMedia.editTracksInfo(this.tracksInfoRequest, this.onTrackSuccess.bind(this), this.onTrackError.bind(this));
      }
      this.startProgressTimer(this.incrementMediaTime.bind(this));
      this.player_.loadTech('ChromecastTech', {
        receiver: this.apiSession.receiver.friendlyName
      });
      this.casting = true;
      this.paused = this.player_.paused();
      this.inactivityTimeout = this.player_.options_.inactivityTimeout;
      this.player_.options_.inactivityTimeout = 0;
      return this.player_.userActive(true);
    };

    ChromecastComponent.prototype.onSessionUpdate = function(isAlive) {
      if (!this.apiMedia) {
        return;
      }
      if (!isAlive) {
        return this.onStopAppSuccess();
      }
    };

    ChromecastComponent.prototype.onMediaStatusUpdate = function(isAlive) {
      if (!this.apiMedia) {
        return;
      }
      this.currentMediaTime = this.apiMedia.currentTime;
      switch (this.apiMedia.playerState) {
        case chrome.cast.media.PlayerState.IDLE:
          this.currentMediaTime = 0;
          this.trigger("timeupdate");
          return this.onStopAppSuccess();
        case chrome.cast.media.PlayerState.PAUSED:
          if (this.paused) {
            return;
          }
          this.player_.pause();
          return this.paused = true;
        case chrome.cast.media.PlayerState.PLAYING:
          if (!this.paused) {
            return;
          }
          this.player_.play();
          return this.paused = false;
      }
    };

    ChromecastComponent.prototype.startProgressTimer = function(callback) {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      return this.timer = setInterval(callback.bind(this), this.timerStep);
    };

    ChromecastComponent.prototype.play = function() {
      if (!this.apiMedia) {
        return;
      }
      if (this.paused) {
        this.apiMedia.play(null, this.mediaCommandSuccessCallback.bind(this, "Playing: " + this.apiMedia.sessionId), this.onError);
        return this.paused = false;
      }
    };

    ChromecastComponent.prototype.pause = function() {
      if (!this.apiMedia) {
        return;
      }
      if (!this.paused) {
        this.apiMedia.pause(null, this.mediaCommandSuccessCallback.bind(this, "Paused: " + this.apiMedia.sessionId), this.onError);
        return this.paused = true;
      }
    };

    ChromecastComponent.prototype.seekMedia = function(position) {
      var request;
      request = new chrome.cast.media.SeekRequest();
      request.currentTime = position;
      if (this.player_.controlBar.progressControl.seekBar.videoWasPlaying) {
        request.resumeState = chrome.cast.media.ResumeState.PLAYBACK_START;
      }
      return this.apiMedia.seek(request, this.onSeekSuccess.bind(this, position), this.onError);
    };

    ChromecastComponent.prototype.onSeekSuccess = function(position) {
      return this.currentMediaTime = position;
    };

    ChromecastComponent.prototype.setMediaVolume = function(level, mute) {
      var request, volume;
      if (!this.apiMedia) {
        return;
      }
      volume = new chrome.cast.Volume();
      volume.level = level;
      volume.muted = mute;
      this.currentVolume = volume.level;
      this.muted = mute;
      request = new chrome.cast.media.VolumeRequest();
      request.volume = volume;
      this.apiMedia.setVolume(request, this.mediaCommandSuccessCallback.bind(this, "Volume changed"), this.onError);
      return this.player_.trigger("volumechange");
    };

    ChromecastComponent.prototype.incrementMediaTime = function() {
      if (this.apiMedia.playerState !== chrome.cast.media.PlayerState.PLAYING) {
        return;
      }
      if (this.currentMediaTime < this.apiMedia.media.duration) {
        this.currentMediaTime += 1;
        return this.trigger("timeupdate");
      } else {
        this.currentMediaTime = 0;
        return clearInterval(this.timer);
      }
    };

    ChromecastComponent.prototype.mediaCommandSuccessCallback = function(information, event) {
      return vjs.log(information);
    };

    ChromecastComponent.prototype.onError = function() {
      return vjs.log("error");
    };

    ChromecastComponent.prototype.stopCasting = function() {
      return this.apiSession.stop(this.onStopAppSuccess.bind(this), this.onError);
    };

    ChromecastComponent.prototype.onStopAppSuccess = function() {
      clearInterval(this.timer);
      this.casting = false;
      this.removeClass("connected");
      this.player_.src(this.player_.options_["sources"]);
      if (!this.paused) {
        this.player_.one('seeked', function() {
          return this.player_.play();
        });
      }
      this.player_.currentTime(this.currentMediaTime);
      this.player_.tech.setControls(false);
      this.player_.options_.inactivityTimeout = this.inactivityTimeout;
      this.apiMedia = null;
      return this.apiSession = null;
    };

    ChromecastComponent.prototype.buildCSSClass = function() {
      return ChromecastComponent.__super__.buildCSSClass.apply(this, arguments) + "vjs-chromecast-button";
    };

    ChromecastComponent.prototype.onClick = function() {
      ChromecastComponent.__super__.onClick.apply(this, arguments);
      if (this.casting) {
        return this.stopCasting();
      } else {
        return this.doLaunch();
      }
    };

    return ChromecastComponent;

  })(vjs.Button);

  vjs.ChromecastTech = (function(superClass) {
    extend(ChromecastTech, superClass);

    ChromecastTech.isSupported = function() {
      return this.player_.chromecastComponent.apiInitialized;
    };

    ChromecastTech.canPlaySource = function(source) {
      return source.type === "video/mp4" || source.type === "video/webm" || source.type === "application/x-mpegURL" || source.type === "application/vnd.apple.mpegURL";
    };

    function ChromecastTech(player, options, ready) {
      this.featuresVolumeControl = true;
      this.movingMediaElementInDOM = false;
      this.featuresFullscreenResize = false;
      this.featuresProgressEvents = true;
      this.receiver = options.source.receiver;
      ChromecastTech.__super__.constructor.call(this, player, options, ready);
      this.triggerReady();
    }

    ChromecastTech.prototype.createEl = function() {
      var element;
      element = document.createElement("div");
      element.id = this.player_.id_ + "_chromecast_api";
      element.className = "vjs-tech vjs-tech-chromecast";
      element.innerHTML = "<div class=\"casting-image\" style=\"background-image: url('" + this.player_.options_.poster + "')\"></div>\n<div class=\"casting-overlay\">\n  <div class=\"casting-information\">\n    <div class=\"casting-icon\">&#58880</div>\n    <div class=\"casting-description\"><small>" + (this.localize("CASTING TO")) + "</small><br>" + this.receiver + "</div>\n  </div>\n</div>";
      element.player = this.player_;
      vjs.insertFirst(element, this.player_.el());
      return element;
    };


    /*
    MEDIA PLAYER EVENTS
     */

    ChromecastTech.prototype.play = function() {
      this.player_.chromecastComponent.play();
      return this.player_.onPlay();
    };

    ChromecastTech.prototype.pause = function() {
      this.player_.chromecastComponent.pause();
      return this.player_.onPause();
    };

    ChromecastTech.prototype.paused = function() {
      return this.player_.chromecastComponent.paused;
    };

    ChromecastTech.prototype.currentTime = function() {
      return this.player_.chromecastComponent.currentMediaTime;
    };

    ChromecastTech.prototype.setCurrentTime = function(seconds) {
      return this.player_.chromecastComponent.seekMedia(seconds);
    };

    ChromecastTech.prototype.volume = function() {
      return this.player_.chromecastComponent.currentVolume;
    };

    ChromecastTech.prototype.setVolume = function(volume) {
      return this.player_.chromecastComponent.setMediaVolume(volume, false);
    };

    ChromecastTech.prototype.muted = function() {
      return this.player_.chromecastComponent.muted;
    };

    ChromecastTech.prototype.setMuted = function(muted) {
      return this.player_.chromecastComponent.setMediaVolume(this.player_.chromecastComponent.currentVolume, muted);
    };

    ChromecastTech.prototype.supportsFullScreen = function() {
      return false;
    };

    return ChromecastTech;

  })(vjs.MediaTechController);

}).call(this);

(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  videojs.plugin('ga', function(options) {
    var dataSetupOptions, defaultsEventsToTrack, end, error, eventCategory, eventLabel, eventsToTrack, fullscreen, loaded, parsedOptions, pause, percentsAlreadyTracked, percentsPlayedInterval, play, resize, seekEnd, seekStart, seeking, sendbeacon, timeupdate, volumeChange;
    if (options == null) {
      options = {};
    }
    dataSetupOptions = {};
    if (this.options()["data-setup"]) {
      parsedOptions = JSON.parse(this.options()["data-setup"]);
      if (parsedOptions.ga) {
        dataSetupOptions = parsedOptions.ga;
      }
    }
    defaultsEventsToTrack = ['loaded', 'percentsPlayed', 'start', 'end', 'seek', 'play', 'pause', 'resize', 'volumeChange', 'error', 'fullscreen'];
    eventsToTrack = options.eventsToTrack || dataSetupOptions.eventsToTrack || defaultsEventsToTrack;
    percentsPlayedInterval = options.percentsPlayedInterval || dataSetupOptions.percentsPlayedInterval || 10;
    eventCategory = options.eventCategory || dataSetupOptions.eventCategory || 'Video';
    eventLabel = options.eventLabel || dataSetupOptions.eventLabel;
    options.debug = options.debug || false;
    percentsAlreadyTracked = [];
    seekStart = seekEnd = 0;
    seeking = false;
    loaded = function() {
      if (!eventLabel) {
        eventLabel = this.currentSrc().split("/").slice(-1)[0].replace(/\.(\w{3,4})(\?.*)?$/i, '');
      }
      if (__indexOf.call(eventsToTrack, "loadedmetadata") >= 0) {
        sendbeacon('loadedmetadata', true);
      }
    };
    timeupdate = function() {
      var currentTime, duration, percent, percentPlayed, _i;
      currentTime = Math.round(this.currentTime());
      duration = Math.round(this.duration());
      percentPlayed = Math.round(currentTime / duration * 100);
      for (percent = _i = 0; _i <= 99; percent = _i += percentsPlayedInterval) {
        if (percentPlayed >= percent && __indexOf.call(percentsAlreadyTracked, percent) < 0) {
          if (__indexOf.call(eventsToTrack, "start") >= 0 && percent === 0 && percentPlayed > 0) {
            sendbeacon('start', true);
          } else if (__indexOf.call(eventsToTrack, "percentsPlayed") >= 0 && percentPlayed !== 0) {
            sendbeacon('percent played', true, percent);
          }
          if (percentPlayed > 0) {
            percentsAlreadyTracked.push(percent);
          }
        }
      }
      if (__indexOf.call(eventsToTrack, "seek") >= 0) {
        seekStart = seekEnd;
        seekEnd = currentTime;
        if (Math.abs(seekStart - seekEnd) > 1) {
          seeking = true;
          sendbeacon('seek start', false, seekStart);
          sendbeacon('seek end', false, seekEnd);
        }
      }
    };
    end = function() {
      sendbeacon('end', true);
    };
    play = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      sendbeacon('play', true, currentTime);
      seeking = false;
    };
    pause = function() {
      var currentTime, duration;
      currentTime = Math.round(this.currentTime());
      duration = Math.round(this.duration());
      if (currentTime !== duration && !seeking) {
        sendbeacon('pause', false, currentTime);
      }
    };
    volumeChange = function() {
      var volume;
      volume = this.muted() === true ? 0 : this.volume();
      sendbeacon('volume change', false, volume);
    };
    resize = function() {
      sendbeacon('resize - ' + this.width() + "*" + this.height(), true);
    };
    error = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      sendbeacon('error', true, currentTime);
    };
    fullscreen = function() {
      var currentTime;
      currentTime = Math.round(this.currentTime());
      if ((typeof this.isFullscreen === "function" ? this.isFullscreen() : void 0) || (typeof this.isFullScreen === "function" ? this.isFullScreen() : void 0)) {
        sendbeacon('enter fullscreen', false, currentTime);
      } else {
        sendbeacon('exit fullscreen', false, currentTime);
      }
    };
    sendbeacon = function(action, nonInteraction, value) {
      if (window.ga) {
        ga('send', 'event', {
          'eventCategory': eventCategory,
          'eventAction': action,
          'eventLabel': eventLabel,
          'eventValue': value,
          'nonInteraction': nonInteraction
        });
      } else if (window._gaq) {
        _gaq.push(['_trackEvent', eventCategory, action, eventLabel, value, nonInteraction]);
      } else if (options.debug) {
        console.log("Google Analytics not detected");
      }
    };
    this.ready(function() {
      this.on("loadedmetadata", loaded);
      this.on("timeupdate", timeupdate);
      if (__indexOf.call(eventsToTrack, "end") >= 0) {
        this.on("ended", end);
      }
      if (__indexOf.call(eventsToTrack, "play") >= 0) {
        this.on("play", play);
      }
      if (__indexOf.call(eventsToTrack, "pause") >= 0) {
        this.on("pause", pause);
      }
      if (__indexOf.call(eventsToTrack, "volumeChange") >= 0) {
        this.on("volumechange", volumeChange);
      }
      if (__indexOf.call(eventsToTrack, "resize") >= 0) {
        this.on("resize", resize);
      }
      if (__indexOf.call(eventsToTrack, "error") >= 0) {
        this.on("error", error);
      }
      if (__indexOf.call(eventsToTrack, "fullscreen") >= 0) {
        return this.on("fullscreenchange", fullscreen);
      }
    });
    return {
      'sendbeacon': sendbeacon
    };
  });

}).call(this);

/*! videojs-metrics - v0.0.0 - 2015-10-23
* Copyright (c) 2015 benjipott; Licensed Apache-2.0 */
/*! videojs-metrics - v0.0.0 - 2015-10-7
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license. */
(function (window, videojs) {
  'use strict';

  /**
   * Initialize the plugin.
   * @param options (optional) {object} configuration for the plugin
   */
  videojs.Metrics = videojs.Component.extend({
    init: function (player, options) {
      videojs.Component.call(this, player, options);
      this.setupTriggers();
      this.browserInfo = videojs.Metrics.getBrowser();
    }
  });

  videojs.Metrics.prototype.options_ = {
    'option': true,
    'user_id': 666,
    'method': 'POST',
    'responseType': 'json',
    'timeout': 1000,
    'url': '//stats.afrostream.tv/api/v1/events',
    'trackEvents': ['loadstart', 'ping', 'firstplay', 'ended', 'dispose', 'waiting', 'error', 'bandwidthIncrease', 'bandwidthDecrease', 'dispose']
  };
  /**
   * Get browser infos
   * @returns {{}}
   */
  videojs.Metrics.getBrowser = function () {
    var data = {};
    var browser = null;
    var version = null;
    var os = null;
    var osVersion = null;
    var parseUserAgent, prepareData, renameOsx, cutSafariVersion;

    parseUserAgent = function () {
      var userAgent = navigator.userAgent.toLowerCase(),
        browserParts = /(ie|firefox|chrome|safari|opera)(?:.*version)?(?:[ \/])?([\w.]+)/.exec(userAgent),
        osParts = /(mac|win|linux|freebsd|mobile|iphone|ipod|ipad|android|blackberry|j2me|webtv)/.exec(userAgent);

      if (!!userAgent.match(/trident\/7\./)) {
        browser = 'ie';
        version = 11;
      } else if (browserParts && browserParts.length > 2) {
        browser = browserParts[1];
        version = browserParts[2];
      }

      if (osParts && osParts.length > 1) {
        os = osParts[1];
      }

      osVersion = navigator.oscpu || navigator.appName;
    };

    prepareData = function () {
      data.browser = browser;
      data.version = parseInt(version, 10) || null;
      data.os = os;
      data.osVersion = osVersion;
    };

    renameOsx = function () {
      if (os === 'mac') {
        os = 'osx';
      }
    };

    cutSafariVersion = function () {
      if (os === 'safari') {
        version = version.substring(0, 1);
      }
    };

    parseUserAgent();

    // exception rules
    renameOsx();
    cutSafariVersion();

    prepareData();

    return data;
  };

  videojs.Metrics.INTERVAL_PING = 60000;

  videojs.Metrics.BASE_KEYS = ['user_id', 'type', 'fqdn'];

  videojs.Metrics.METRICS_DATA = {
    bandwidth: -1,
    bitrateIndex: 0,
    pendingIndex: '',
    numBitrates: 0,
    bufferLength: 0,
    droppedFrames: 0,
    movingLatency: 0,
    movingDownload: 0,
    movingRatio: 0,
    requestsQueue: 0
  };

  videojs.Metrics.prototype.metrics_ = {
    video: videojs.util.mergeOptions({}, videojs.Metrics.METRICS_DATA),
    audio: videojs.util.mergeOptions({}, videojs.Metrics.METRICS_DATA)
  };

  videojs.Metrics.REQUIRED_KEY = {
    'bandwidthIncrease': ['video_bitrate', 'audio_bitrate'],
    'bandwidthDecrease': ['video_bitrate', 'audio_bitrate'],
    'ping': [],
    'buffering': [],
    'error': ['number', 'message'],
    'start': ['video_bitrate', 'audio_bitrate', 'os', 'os_version', 'web_browser', 'web_browser_version', 'resolution_size', 'flash_version', 'html5_video', 'relative_url'],
    'stop': ['timeout', 'frames_dropped']
  };

  videojs.Metrics.URL_MATCH = /https?:\/\/(?:www\.)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b)*(\/[\/\d\w\.-]*)*(?:[\?])*(.+)*/gi;

  videojs.Metrics.prototype.pathUrl = '';
  videojs.Metrics.prototype.oldType = null;
  videojs.Metrics.prototype.intervalPing = 0;
  videojs.Metrics.prototype.browserInfo = {};

  videojs.Metrics.prototype.eventHandler = function (evt) {
    var data = {
      type: evt.type
    }, skipped = false;

    switch (data.type) {
      case 'error':
        break;
      case 'dispose':
      case 'ended':
        if (data.type === this.oldType) {
          skipped = true;
        }
        data.type = 'stop';
        break;
      case 'loadstart':
        var source = this.player().manifestUrl || this.player().currentSrc();
        this.pathUrl = videojs.Metrics.URL_MATCH.exec(source);
        skipped = true;
        break;
      case 'firstplay':
        data.type = 'start';
        this.intervalPing = this.setInterval(this.onPing, videojs.Metrics.INTERVAL_PING);
        break;
      case 'waiting':
        data.type = 'buffering';
        break;
      case 'bandwidthIncrease':
      case 'bandwidthDecrease':
        break;
      default:
        break;
    }

    this.oldType = data.type;

    if (skipped) {
      return;
    }

    this.notify(data);

  };

  videojs.Metrics.prototype.onPing = function () {
    this.player().trigger('ping');
  };

  videojs.Metrics.prototype.setupTriggers = function () {
    var events = this.options_.trackEvents;
    for (var i = events.length - 1; i >= 0; i--) {
      this.player().on(events[i], videojs.bind(this, this.eventHandler));
    }
  };

  videojs.Metrics.pick = function (obj, list, context) {
    var result = {};

    if (typeof list === 'string') {
      list = [list];
    }

    Object.keys(obj)
      .forEach(function (key) {
        if (list.indexOf(key) > -1) {
          result[key] = obj[key];
        }
      }, context);

    return result;
  };

  videojs.Metrics.prototype.getRequiredKeys = function (type) {
    return videojs.Metrics.BASE_KEYS.concat(videojs.Metrics.REQUIRED_KEY[type] || []);
  };


  videojs.Metrics.prototype.notify = function (evt) {
    var player = this.player();
    // Merge with default options
    evt.user_id = this.options().user_id;
    evt.fqdn = this.pathUrl[1];
    evt.os = this.browserInfo.os;
    evt.os_version = this.browserInfo.osVersion.toString();
    evt.web_browser = this.browserInfo.browser;
    evt.web_browser_version = this.browserInfo.version.toString();
    evt.resolution_size = screen.width + 'x' + screen.height;
    evt.flash_version = videojs.Flash.version().join(',');
    evt.html5_video = player.techName === 'Html5';
    evt.relative_url = this.pathUrl[2];
    evt.timeout = false;
    evt.frames_dropped = 0;
    //=== BITDASH
    //bandwidth
    //bitrateIndex
    //pendingIndex
    //numBitrates
    //bufferLength
    //droppedFrames
    //movingLatency
    //movingDownload
    //movingRatio
    //requestsQueue
    //=== CASTLAB
    // ???
    try {
      var metrics = player.techGet('getPlaybackStatistics');
      this.metrics_ = videojs.util.mergeOptions(this.metrics_, metrics);
      evt.video_bitrate = this.metrics_.video.bandwidth || 0;
      evt.audio_bitrate = this.metrics_.audio.bandwidth || 0;
      var pickedData = videojs.Metrics.pick(evt, this.getRequiredKeys(evt.type));
      this.xhr(this.options(), pickedData);
    }
    catch (e) {
      videojs.log(e);
    }
  };

  videojs.Metrics.prototype.xhr = function (url, data, callback) {
    var
      options = {
        method: 'GET',
        timeout: 45 * 1000
      },
      request,
      abortTimeout;

    if (typeof callback !== 'function') {
      callback = function () {
      };
    }

    if (typeof url === 'object') {
      options = videojs.util.mergeOptions(options, url);
      url = options.url;
    }

    var XHR = window.XMLHttpRequest;

    if (typeof XHR === 'undefined') {
      // Shim XMLHttpRequest for older IEs
      XHR = function () {
        try {
          return new window.ActiveXObject('Msxml2.XMLHTTP.6.0');
        } catch (e) {
        }
        try {
          return new window.ActiveXObject('Msxml2.XMLHTTP.3.0');
        } catch (f) {
        }
        try {
          return new window.ActiveXObject('Msxml2.XMLHTTP');
        } catch (g) {
        }
        throw new Error('This browser does not support XMLHttpRequest.');
      };
    }

    request = new XHR();
    request.open(options.method, url);
    request.url = url;
    request.requestTime = new Date().getTime();
    //request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (options.responseType) {
      request.responseType = options.responseType;
    }
    if (options.withCredentials) {
      request.withCredentials = true;
    }
    if (options.timeout) {
      abortTimeout = window.setTimeout(function () {
        if (request.readyState !== 4) {
          request.timedout = true;
          request.abort();
        }
      }, options.timeout);
    }

    request.onreadystatechange = function () {
      // wait until the request completes
      if (this.readyState !== 4) {
        return;
      }

      // clear outstanding timeouts
      window.clearTimeout(abortTimeout);

      // request timeout
      if (request.timedout) {
        return callback.call(this, 'timeout', url);
      }

      // request aborted or errored
      if (this.status >= 400 || this.status === 0) {
        return callback.call(this, true, url);
      }

      if (this.response) {
        this.responseTime = new Date().getTime();
        this.roundTripTime = this.responseTime - this.requestTime;
        this.bytesReceived = this.response.byteLength || this.response.length;
        this.bandwidth = Math.floor((this.bytesReceived / this.roundTripTime) * 8 * 1000);
      }

      return callback.call(this, false, url);
    };

    var queryString = '';
    if (typeof data === 'object') {
      for (var paramName in data) {
        queryString += (queryString.length === 0 ? '' : '&') + paramName + '=' + encodeURIComponent(data[paramName]);
      }
    }

    request.send(queryString);
    return request;
  };

  //// register the plugin
  videojs.options.children.metrics = {};
  //videojs.plugin('metrics', videojs.Metrics);

})(window, window.videojs);

  return videojs;
}));
