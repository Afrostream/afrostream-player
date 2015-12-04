videojs.MediaTechController.METRICS_DATA = {
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

videojs.MediaTechController.prototype.metrics_ = {
  video: videojs.util.mergeOptions({}, videojs.MediaTechController.METRICS_DATA),
  audio: videojs.util.mergeOptions({}, videojs.MediaTechController.METRICS_DATA)
};


videojs.MediaTechController.prototype.mediaPlayer_ = null;

videojs.MediaTechController.prototype.mediaPlayer = function () {
  return this.mediaPlayer_;
};

videojs.MediaTechController.prototype.detectBandwithChange = function () {
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
    var metricsChangeEvent = videojs.fixEvent({
      type: MediaPlayer.events.METRIC_CHANGED,
      data: {
        stream: metricsChangeType
      }
    });
    this.trigger(metricsChangeEvent);
  }
};
/**
 * Get default metrix statistics object
 * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
 */
videojs.MediaTechController.prototype.getPlaybackStatistics = function () {
  return {
    video: {
      bandwidth: this.el().webkitVideoDecodedByteCount || -1
    },
    audio: {
      bandwidth: this.el().webkitAudioDecodedByteCount || -1
    }
  };
};

videojs.MediaTechController.prototype.videoTracks_ = null;

videojs.MediaTechController.prototype.videoTracks = function (tracks) {
  if (tracks !== undefined) {
    this.videoTracks_ = tracks;
  }
  return this.videoTracks_ || new videojs.TextTrackList();
};

videojs.MediaTechController.prototype.audioTracks_ = null;

videojs.MediaTechController.prototype.audioTracks = function (tracks) {
  if (tracks !== undefined) {
    this.audioTracks_ = tracks;
  }
  return this.audioTracks_ || new videojs.TextTrackList();
};

videojs.MediaTechController.prototype.setAudioTrack = function (track) {
  var tracks = this.player().audioTracks();
  for (var i = 0; i < tracks.length; i++) {
    var audioTrack = tracks[i];
    audioTrack.enabled = audioTrack === track;
  }
  /*jshint sub:true*/
  this['featuresAudioIndex'] = parseInt(track.id || track.index, 10);
  this.trigger('audiochange');
};

/*jshint sub:true*/
videojs.MediaTechController.prototype.setVideoTrack = function (track) {
  var tracks = this.player().videoTracks();
  for (var i = 0; i < tracks.length; i++) {
    var videoTrack = tracks[i];
    videoTrack.enabled = videoTrack.qualityIndex === track.qualityIndex;
  }
  /*jshint sub:true*/
  this['featuresBitrateIndex'] = track.qualityIndex; //AUTO;
  this.trigger('bitratechange');
};
