import videojs from'video.js';

let MediaTechController = videojs.getComponent('MediaTechController');

const _api = MediaTechController.prototype;

MediaTechController.METRICS_DATA = {
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

_api['metrics_'] = {
  video: videojs.mergeOptions({
    bandwidth: /*this.el().webkitVideoDecodedByteCount ||*/ -1
  }, MediaTechController.METRICS_DATA),
  audio: videojs.mergeOptions({
    bandwidth: /*this.el().webkitAudioDecodedByteCount || */-1
  }, MediaTechController.METRICS_DATA),
  p2pweb: {
    chunksFromCDN: 0,
    chunksFromP2P: 0,
    chunksSent: 0,
    bufferLength: -1,
    swarmSize: -1,
    p2pRatio: -1,
    startupTime: -1
  }
};


_api['mediaPlayer_'] = null;

_api['mediaPlayer'] = () => {
  return this.mediaPlayer_;
};

/**
 * Get default metrix statistics object
 * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
 */
_api['getPlaybackStatistics'] = () => {
  return this.metrics_;
};

/**
 * Get default metrix statistics object for specified type
 * @param type
 * @returns {*}
 */
_api['getCribbedMetricsFor'] = (type) => {
  return this.metrics_[type];
};

_api['videoTracks_'] = null;

_api['videoTracks'] = (tracks)=> {
  if (tracks !== undefined) {
    this.videoTracks_ = tracks;
  }
  return this.videoTracks_ || new videojs.TextTrackList();
};

_api['audioTracks_'] = null;

_api['audioTracks'] = (tracks)=> {
  if (tracks !== undefined) {
    this.audioTracks_ = tracks;
  }
  return this.audioTracks_ || new videojs.TextTrackList();
};

_api['setAudioTrack'] = (track)=> {
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
_api['setVideoTrack'] = (track)=> {
  var tracks = this.player().videoTracks();
  for (var i = 0; i < tracks.length; i++) {
    var videoTrack = tracks[i];
    videoTrack.enabled = videoTrack.qualityIndex === track.qualityIndex;
  }
  /*jshint sub:true*/
  this['featuresBitrateIndex'] = track.qualityIndex; //AUTO;
  this.trigger('bitratechange');
};
