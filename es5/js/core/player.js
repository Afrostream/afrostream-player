'use strict';

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Player = _video2.default.getComponent('Player');

Player.prototype.getPlaybackStatistics = function () {
  return this.tech_ && this.tech_.getPlaybackStatistics();
};

Player.prototype.getCribbedMetricsFor = function (type) {
  return this.tech_ && this.tech_.getCribbedMetricsFor(type);
};