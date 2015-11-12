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
  return this.el_.videoTracks || this.videoTracks_ || new videojs.TextTrackList();
};

videojs.MediaTechController.prototype.audioTracks_ = null;

videojs.MediaTechController.prototype.audioTracks = function (tracks) {
  if (tracks !== undefined) {
    this.audioTracks_ = tracks;
  }
  return this.el_.audioTracks || this.audioTracks_ || new videojs.TextTrackList();
};

videojs.MediaTechController.prototype.setAudioTrack = function (track) {
  var tracks = this.player().audioTracks();
  for (var i = 0; i < tracks.length; i++) {
    var audioTrack = tracks[i];
    audioTrack.enabled = audioTrack === track;
  }
  this.trigger('audiochange');
};

/*jshint sub:true*/
videojs.MediaTechController.prototype.setVideoTrack = function (track) {
  var tracks = this.player().videoTracks();
  for (var i = 0; i < tracks.length; i++) {
    var videoTrack = tracks[i];
    videoTrack.enabled = videoTrack.qualityIndex === track.qualityIndex;
  }
  this.trigger('bitratechange');
};
