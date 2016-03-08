/**
 * ! afrostrream-player - v2.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file videojs-metrics.js
 **/

import videojs from 'video.js';
import Dash from './tech/dash';
import MediaTechController from './tech/media';
import Player from './core/player';
import CaptionTrackButton from './component/control-bar/text-track-controls/caption-track-button';

const Component = videojs.getComponent('Component');
/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */
class Afrostream extends Component {
  constructor(options, ready) {
    super(options, ready);
    this.player().one('loadstart', videojs.bind(this, this.onLoadStart));
  }

  onLoadStart() {
    this.addMediaPlayerHandlers();
  }


  addMediaPlayerHandlers() {
    this.player().on(MediaPlayer.events.STREAM_INITIALIZED,
      videojs.bind(this, this.onInitialized));
    this.player().on(MediaPlayer.events.METRIC_CHANGED,
      videojs.bind(this, this.onMetricChanged));

  }

  onMetricChanged(e) {
    // get current buffered ranges of video element and keep them up to date
    if (e.data.stream !== 'video' && e.data.stream !== 'audio' && e.data.stream !== 'p2pweb') {
      return;
    }
    var metrics = this.player().getCribbedMetricsFor(e.data.stream);
    if (metrics) {
      switch (e.data.stream) {
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
  };

  onInitialized(manifest, err) {
    if (err) {
      this.player().error(err);
    }
  };
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
videojs.options.children.afrostream = {};

Component.registerComponent('Afrostream', Afrostream);
export default Afrostream;
