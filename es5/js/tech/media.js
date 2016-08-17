'use strict';

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaTechController = _video2.default.getComponent('MediaTechController');
var AudioTrack = _video2.default.getComponent('AudioTrack');
var VideoTrack = _video2.default.getComponent('VideoTrack');

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

MediaTechController.prototype.metrics_ = {
  video: _video2.default.mergeOptions({
    bandwidth: /*this.el().webkitVideoDecodedByteCount ||*/-1
  }, MediaTechController.METRICS_DATA),
  audio: _video2.default.mergeOptions({
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

/**
 * Get default metrix statistics object
 * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
 */
MediaTechController.prototype.getPlaybackStatistics = function () {
  return this.metrics_;
};

/**
 * Get default metrix statistics object for specified type
 * @param type
 * @returns {*}
 */
MediaTechController.prototype.getCribbedMetricsFor = function (type) {
  return this.metrics_[type];
};

/**
 * Creates and returns a remote text track object
 *
 * @param {String} kind Text track kind (subtitles, captions, descriptions
 *                                       chapters and metadata)
 * @param {String=} label Label to identify the text track
 * @param {String=} language Two letter language abbreviation
 * @return {TextTrackObject}
 * @method addTextTrack
 */
MediaTechController.prototype.addAudioTrack = function (kind, label, language) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  if (!kind) {
    throw new Error('AudioTrack kind is required but was not provided');
  }

  var tracks = this.audioTracks();

  options.kind = kind;

  if (label) {
    options.label = label;
  }
  if (language) {
    options.language = language;
  }
  options.tech = self;

  var track = new AudioTrack(options);
  tracks.addTrack_(track);

  return track;
};

MediaTechController.prototype.addVideoTrack = function (kind, label, language) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

  if (!kind) {
    throw new Error('VideoTrack kind is required but was not provided');
  }

  var tracks = this.videoTracks();

  options.kind = kind;

  if (label) {
    options.label = label;
  }
  if (language) {
    options.language = language;
  }
  options.tech = self;

  var track = new VideoTrack(options);
  tracks.addTrack_(track);

  return track;
};