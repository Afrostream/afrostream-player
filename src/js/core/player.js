import videojs from'video.js';

let Player = videojs.getComponent('Player');

Player.prototype.audioTracks = function () {
  return this.tech_ && this.tech_.audioTracks();
};

Player.prototype.setAudioTrack = function (track) {
  return this.tech_ && this.tech_.setAudioTrack(track);
};

Player.prototype.videoTracks = function () {
  return this.tech_ && this.tech_.videoTracks();
};

Player.prototype.setVideoTrack = function (track) {
  return this.tech_ && this.tech_.setVideoTrack(track);
};

Player.prototype.getPlaybackStatistics = function () {
  return this.tech_ && this.tech_.getPlaybackStatistics();
};

Player.prototype.getCribbedMetricsFor = function (type) {
  return this.tech_ && this.tech_.getCribbedMetricsFor(type);
};
