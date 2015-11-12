videojs.Player.prototype.audioTracks = function () {
  /*jshint sub:true*/
  return this.tech && this.tech['audioTracks']();
};

videojs.Player.prototype.setAudioTrack = function (track) {
  /*jshint sub:true*/
  return this.tech && this.tech['setAudioTrack'](track);
};

videojs.Player.prototype.videoTracks = function () {
  /*jshint sub:true*/
  return this.tech && this.tech['videoTracks']();
};

videojs.Player.prototype.setVideoTrack = function (track) {
  /*jshint sub:true*/
  return this.tech && this.tech['setVideoTrack'](track);
};
