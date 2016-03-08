'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = require('video.js');

var _videoJs2 = _interopRequireDefault(_videoJs);

var Player = _videoJs2['default'].getComponent('Player');

var _api = Player.prototype;

_api['audioTracks'] = function () {
  return undefined.tech_ && undefined.techGet_('audioTracks');
};

_api['setAudioTrack'] = function (track) {
  return undefined.tech_ && undefined.tech_.setAudioTrack(track);
};

_api['videoTracks'] = function () {
  return undefined.tech_ && undefined.techGet_('videoTracks');
};

_api['setVideoTrack'] = function (track) {
  return undefined.tech_ && undefined.tech_.setVideoTrack(track);
};

_api['getPlaybackStatistics'] = function () {
  return undefined.tech_ && undefined.tech_.getPlaybackStatistics();
};

_api['getCribbedMetricsFor'] = function (type) {
  return undefined.tech_ && undefined.tech_.getCribbedMetricsFor(type);
};