import videojs from 'video.js'

let MediaTechController = videojs.getComponent('MediaTechController')

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
}

MediaTechController.prototype.metrics_ = {
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
}


/**
 * Get default metrix statistics object
 * @returns {{video: {bandwidth: number}, audio: {bandwidth: number}}}
 */
MediaTechController.prototype.getPlaybackStatistics = function () {
  return this.metrics_
}

/**
 * Get default metrix statistics object for specified type
 * @param type
 * @returns {*}
 */
MediaTechController.prototype.getCribbedMetricsFor = function (type) {
  return this.metrics_[type]
}

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
MediaTechController.prototype.addAudioTrack = function (kind, label, language, options = {}) {
  if (!kind) {
    throw new Error('AudioTrack kind is required but was not provided')
  }

  let tracks = this.audioTracks()

  options.kind = kind

  if (label) {
    options.label = label
  }
  if (language) {
    options.language = language
  }
  options.tech = self

  let track = new videojs.AudioTrack(options)
  tracks.addTrack_(track)

  return track
}

MediaTechController.prototype.addVideoTrack = function (kind, label, language, options = {}) {
  if (!kind) {
    throw new Error('VideoTrack kind is required but was not provided')
  }

  let tracks = this.videoTracks()

  options.kind = kind

  if (label) {
    options.label = label
  }
  if (language) {
    options.language = language
  }
  options.tech = self

  let track = new videojs.VideoTrack(options)
  tracks.addTrack_(track)

  return track
}
