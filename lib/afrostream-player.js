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

  videojs.trim = function (str) {
    return (str + '').replace(/^\s+|\s+$/g, '').replace(/^NOTE Paragraph$/g, '');
  };

  // Trigger events from the swf on the player
  videojs.Afrostream.onHandleEvent = function (events) {
    //var player = vjs.el(swfID)['player'];
    //player.trigger(eventName);
    videojs.log('onHandleEvent', events);
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      switch (event.id) {
        case 'log':
          videojs.log(event.level, event.message);
          break;
        case 'appendUserBandwidth':
        case 'appendMediaBandwidth':
          videojs.log(event.id, event.level, event.message);
          //appendUserBandwidth(event.dataset, event.bandwidth);
          break;
      }
    }
  };

  videojs.Afrostream.onEvent = function (swfID, eventName) {
    /*jshint sub:true*/
    var player = videojs.el(swfID)['player'];
    videojs.log(eventName);
    player.trigger(eventName);
  };

  var handleEvents = window.handleEvents = videojs.Afrostream.onHandleEvent;

  videojs.Afrostream.prototype.streamInfo = null;

  videojs.Afrostream.prototype.tech_ = null;

  videojs.Afrostream.prototype.mediaPlayer_ = null;

  videojs.Afrostream.prototype.onLoadStart = function () {
    if (!this.mediaPlayer_) {
      return;
    }
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
    this.tech_['featuresBitrateIndex'] = this.tech_['featuresBitrateIndex'] || bitrates.length; //AUTO;
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
