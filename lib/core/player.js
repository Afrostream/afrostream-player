videojs.Player.prototype.audioTracks = function () {
  /*jshint sub:true*/
  return this.tech && this.techGet('audioTracks');
};

videojs.Player.prototype.setAudioTrack = function (track) {
  /*jshint sub:true*/
  return this.tech && this.tech['setAudioTrack'](track);
};

videojs.Player.prototype.videoTracks = function () {
  /*jshint sub:true*/
  return this.tech && this.techGet('videoTracks');
};

videojs.Player.prototype.setVideoTrack = function (track) {
  /*jshint sub:true*/
  return this.tech && this.tech['setVideoTrack'](track);
};

videojs.Player.prototype.getPlaybackStatistics = function (type) {
  /*jshint sub:true*/
  return this.tech && this.tech['getPlaybackStatistics']();
};

videojs.Player.prototype.getCribbedMetricsFor = function (type) {
  /*jshint sub:true*/
  return this.tech && this.tech['getCribbedMetricsFor'](type);
};
