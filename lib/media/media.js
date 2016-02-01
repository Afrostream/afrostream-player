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
  video: videojs.util.mergeOptions({
    bandwidth: /*this.el().webkitVideoDecodedByteCount ||*/ -1
  }, videojs.MediaTechController.METRICS_DATA),
  audio: videojs.util.mergeOptions({
    bandwidth: /*this.el().webkitAudioDecodedByteCount || */-1
  }, videojs.MediaTechController.METRICS_DATA),
  p2pweb: {
    chunksFromCDN: -1,
    chunksFromP2P: -1,
    chunksSent: -1,
    bufferLength: -1,
    swarmSize: -1,
    p2pRatio: -1,
    startupTime: -1
  }
};


videojs.MediaTechController.prototype.mediaPlayer_ = null;

videojs.MediaTechController.prototype.mediaPlayer = function () {
  return this.mediaPlayer_;
};

/**
 * Get default metrix statistics object
 * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
 */
videojs.MediaTechController.prototype.getPlaybackStatistics = function () {
  return this.metrics_;
};

/**
 * Get default metrix statistics object for specified type
 * @param type
 * @returns {*}
 */
videojs.MediaTechController.prototype.getCribbedMetricsFor = function (type) {
  return this.metrics_[type];
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
