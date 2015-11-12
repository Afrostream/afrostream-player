videojs.Html5.prototype.videoTracks = function (tracks) {
  /*jshint sub:true*/
  if (!this['featuresNativeVideoTracks']) {
    return videojs.MediaTechController.prototype.videoTracks.call(this, tracks);
  }

  if (tracks !== undefined) {
    this.el_.videoTracks = tracks;
  }

  return this.el_.videoTracks;
};

videojs.Html5.prototype.audioTracks = function (tracks) {
  /*jshint sub:true*/
  if (!this['featuresNativeAudioTracks']) {
    return videojs.MediaTechController.prototype.audioTracks.call(this, tracks);
  }

  if (tracks !== undefined) {
    this.el_.audioTracks_ = tracks;
  }

  return this.el_.audioTracks;
};

videojs.Html5.supportsNativeTracks = function (type) {
  var supportsTracks;

  supportsTracks = !!videojs.TEST_VID[type + 'Tracks'];
  if (supportsTracks && videojs.TEST_VID[type + 'Tracks'].length > 0) {
    /*jshint sub:true*/
    supportsTracks = typeof videojs.TEST_VID[type + 'Tracks'][0]['mode'] !== 'number';
  }
  if (supportsTracks && videojs.IS_FIREFOX) {
    supportsTracks = false;
  }

  return supportsTracks;
};
/**
 * Sets the tech's status on native video/audio track support
 * @type {Boolean}
 */
//TODO reactiver la gestion du bitrate et du multipiste audio
/*jshint sub:true*/
videojs.Html5.prototype['featuresNativeVideoTracks'] = false;//videojs.Html5.supportsNativeTracks('video');
videojs.Html5.prototype['featuresNativeAudioTracks'] = false;//videojs.Html5.supportsNativeTracks('audio');

