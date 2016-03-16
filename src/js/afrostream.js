/**
 * ! afrostrream-player - v2.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-metrics.js
 **/

import videojs from 'video.js';
//import Player from './core/player';
import MediaTechController from './tech/media';
import Dash from './tech/dash';
import {MediaPlayer} from 'dashjs';
import CaptionTrackButton from './component/control-bar/track-controls/caption-track-button';
import AudioTrackButton from './component/control-bar/track-controls/audio-track-button';
import VideoTrackButton from './component/control-bar/track-controls/video-track-button';

const Component = videojs.getComponent('Component');
const ControlBar = videojs.getComponent('ControlBar');
/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */
class Afrostream extends Component {
  constructor(player, options, ready) {

    super(player, options, ready);

    player.one('loadstart', videojs.bind(this, this.onLoadStart));

    //player.audioTracks = ::this.audioTracks;
    //player.setAudioTrack = ::this.setAudioTrack;
    //player.videoTracks = ::this.videoTracks;
    //player.setVideoTrack = ::this.setVideoTrack;
    //player.getPlaybackStatistics = ::this.getPlaybackStatistics;
    //player.getCribbedMetricsFor = ::this.getCribbedMetricsFor;
  }

  onLoadStart() {
    this.addMediaPlayerHandlers();
  }


  addMediaPlayerHandlers() {
    this.player().on(MediaPlayer.events.STREAM_INITIALIZED,
      ::this.onInitialized);
    this.player().on(MediaPlayer.events.METRIC_CHANGED,
      ::this.onMetricChanged);

  }

  onMetricChanged(e) {
    // get current buffered ranges of video element and keep them up to date
    if (e.stream !== 'video' && e.stream !== 'audio' && e.stream !== 'p2pweb') {
      return;
    }
    var metrics = this.player().getCribbedMetricsFor(e.stream);
    if (metrics) {
      switch (e.stream) {
        case 'video':
          /*jshint sub:true*/
          if (metrics.bandwidth !== this.oldBandwidth) {
            this.tech_['featuresBitrate'] = metrics;
            this.player().trigger(metrics.bandwidth > this.oldBandwidth ? 'bandwidthIncrease' : 'bandwidthDecrease');
            this.oldBandwidth = metrics.bandwidth;
          }
          break;
        case 'p2pweb':
          /*jshint sub:true*/
          if (metrics.chunksFromP2P !== this.oldChunksFromP2P) {
            this.tech_['featuresBitrate'] = metrics;
            this.player().trigger('chunksFromP2P');
            this.oldChunksFromP2P = metrics.chunksFromP2P;
          }
          break;
        default:
          break;
      }
    }
  }

  onInitialized(manifest, err) {
    if (err) {
      this.player().error(err);
    }
  }

  audioTracks() {
    return this.player().tech_ && this.player().techGet_('audioTracks');
  }

  setAudioTrack(track) {
    return this.player().tech_ && this.player().techCall_('setAudioTrack', track);
  }

  videoTracks() {
    return this.player().tech_ && this.player().techGet_('videoTracks');
  }

  setVideoTrack(track) {
    return this.player().tech_ && this.player().tech_.setVideoTrack(track);
  }

  getPlaybackStatistics() {
    return this.player().tech_ && this.player().tech_.getPlaybackStatistics();
  }

  getCribbedMetricsFor(type) {
    return this.player().tech_ && this.player().tech_.getCribbedMetricsFor(type);
  }
}

Afrostream.prototype.options_ = {};

Afrostream.prototype.oldBandwidth = 0;

Afrostream.prototype.oldChunksFromP2P = 0;

Afrostream.prototype.streamInfo = null;

Afrostream.prototype.tech_ = null;

/**
 * add afrostream to videojs childs
 * @type {{}}
 */
videojs.options.children.push('afrostream');

ControlBar.prototype.options_.children.splice(11, 0, ControlBar.prototype.options_.children.splice(1, 1)[0]);

Component.registerComponent('Afrostream', Afrostream);
export default Afrostream;
