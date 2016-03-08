'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = require('video.js');

var _videoJs2 = _interopRequireDefault(_videoJs);

var MediaTechController = _videoJs2['default'].getComponent('MediaTechController');

var _api = MediaTechController.prototype;

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
  video: _videoJs2['default'].mergeOptions({
    bandwidth: /*this.el().webkitVideoDecodedByteCount ||*/-1
  }, MediaTechController.METRICS_DATA),
  audio: _videoJs2['default'].mergeOptions({
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

_api['mediaPlayer'] = function () {
  return undefined.mediaPlayer_;
};

/**
 * Get default metrix statistics object
 * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
 */
_api['getPlaybackStatistics'] = function () {
  return undefined.metrics_;
};

/**
 * Get default metrix statistics object for specified type
 * @param type
 * @returns {*}
 */
_api['getCribbedMetricsFor'] = function (type) {
  return undefined.metrics_[type];
};

_api['videoTracks_'] = null;

_api['videoTracks'] = function (tracks) {
  if (tracks !== undefined) {
    undefined.videoTracks_ = tracks;
  }
  return undefined.videoTracks_ || new _videoJs2['default'].TextTrackList();
};

_api['audioTracks_'] = null;

_api['audioTracks'] = function (tracks) {
  if (tracks !== undefined) {
    undefined.audioTracks_ = tracks;
  }
  return undefined.audioTracks_ || new _videoJs2['default'].TextTrackList();
};

_api['setAudioTrack'] = function (track) {
  var tracks = undefined.player().audioTracks();
  for (var i = 0; i < tracks.length; i++) {
    var audioTrack = tracks[i];
    audioTrack.enabled = audioTrack === track;
  }
  /*jshint sub:true*/
  undefined['featuresAudioIndex'] = parseInt(track.id || track.index, 10);
  undefined.trigger('audiochange');
};

/*jshint sub:true*/
_api['setVideoTrack'] = function (track) {
  var tracks = undefined.player().videoTracks();
  for (var i = 0; i < tracks.length; i++) {
    var videoTrack = tracks[i];
    videoTrack.enabled = videoTrack.qualityIndex === track.qualityIndex;
  }
  /*jshint sub:true*/
  undefined['featuresBitrateIndex'] = track.qualityIndex; //AUTO;
  undefined.trigger('bitratechange');
};