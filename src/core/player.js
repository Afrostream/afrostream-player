import videojs from'video.js';

let Player = videojs.getComponent('Player');

const _api = Player.prototype;

_api['audioTracks'] = () => {
  return this.tech_ && this.techGet_('audioTracks');
};

_api['setAudioTrack'] = (track) => {
  return this.tech_ && this.tech_.setAudioTrack(track);
};

_api['videoTracks'] = () => {
  return this.tech_ && this.techGet_('videoTracks');
};

_api['setVideoTrack'] = (track) => {
  return this.tech_ && this.tech_.setVideoTrack(track);
};

_api['getPlaybackStatistics'] = ()=> {
  return this.tech_ && this.tech_.getPlaybackStatistics();
};

_api['getCribbedMetricsFor'] = (type) => {
  return this.tech_ && this.tech_.getCribbedMetricsFor(type);
};
