import videojs from'video.js';

let Player = videojs.getComponent('Player');

Player.prototype.getPlaybackStatistics = function () {
  return this.tech_ && this.tech_.getPlaybackStatistics();
};

Player.prototype.getCribbedMetricsFor = function (type) {
  return this.tech_ && this.tech_.getCribbedMetricsFor(type);
};
