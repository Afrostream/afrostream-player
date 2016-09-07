/**
 * ! afrostrream-player - v2.0.0 - 2016-02-15
 * Copyright (c) 2015 benjipott
 * Licensed under the Apache-2.0 license.
 * @file afrostream.js
 **/

import videojs from 'video.js'
import { MediaPlayer } from 'dashjs'
import './tech/media'
import './tech/dash'
import './tech/dashas'
import './tech/easy-broadcast'
import './tech/streamroot'
import './component/control-bar/'
import 'videojs-metrics'
import 'videojs-chromecast'
import 'videojs-youtube'
import 'koment-js'

const Component = videojs.getComponent('Component')
const ControlBar = videojs.getComponent('ControlBar')

/**
 * Initialize the plugin.
 * @param options (optional) {object} configuration for the plugin
 */
class Afrostream extends Component {
  constructor (player, options, ready) {

    super(player, options, ready)
    player.one('loadstart', ::this.onLoadStart)
    player.one('firstplay', ::this.onFirstPlay)
    player.getPlaybackStatistics = ::this.getPlaybackStatistics
    player.one('fullscreenchange', ::this.onFullScreenChange)
  }

  getPrefix () {
    return (screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation) && 'orientation' in screen
  }

  onFullScreenChange () {
    let prefix = this.getPrefix()

    if (!prefix) {
      return
    }
    try {

      if (this.player_.isFullscreen()) {
        screen.orientation.lock('landscape')
      } else {
        screen.orientation.unlock()
      }
    } catch (e) {
      videojs.log(e)
    }
  }

  onLoadStart () {
    this.addMediaPlayerHandlers()
  }

  onFirstPlay () {
    if (this.player_.options_.starttime) {
      this.player_.currentTime(this.player_.options_.starttime);
    }
  }

  addMediaPlayerHandlers () {
    this.player_.tech_.on(MediaPlayer.events.STREAM_INITIALIZED,
      ::this.onInitialized)
    this.player_.tech_.on(MediaPlayer.events.METRIC_CHANGED,
      ::this.onMetricChanged)
  }

  onMetricChanged (e) {
    // get current buffered ranges of video element and keep them up to date
    if (e.mediaType !== 'video' && e.mediaType !== 'audio' && e.mediaType !== 'p2pweb') {
      return
    }
    var metrics = this.getCribbedMetricsFor(e.mediaType)
    if (metrics) {
      switch (e.mediaType) {
        case 'video':
          /*jshint sub:true*/
          if (metrics.bandwidth !== this.oldBandwidth) {
            this.player_.trigger(metrics.bandwidth > this.oldBandwidth ? 'bandwidthIncrease' : 'bandwidthDecrease')
            this.oldBandwidth = metrics.bandwidth
          }
          break
        case 'p2pweb':
          /*jshint sub:true*/
          if (metrics.chunksFromP2P !== this.oldChunksFromP2P) {
            this.player_.trigger('chunksfromp2p')
            this.oldChunksFromP2P = metrics.chunksFromP2P
          }
          break
        default:
          break
      }
    }
  }

  onInitialized (manifest, err) {
    if (err) {
      this.player_.error(err)
    }
  }

  getPlaybackStatistics () {
    return this.player_.tech_ && this.player_.tech_.getPlaybackStatistics()
  }

  getCribbedMetricsFor (type) {
    return this.player_.tech_ && this.player_.tech_.getCribbedMetricsFor(type)
  }
}

Afrostream.prototype.options_ = {}

Afrostream.prototype.oldBandwidth = 0

Afrostream.prototype.oldChunksFromP2P = 0

Afrostream.prototype.streamInfo = null

Afrostream.prototype.tech_ = null

const USER_AGENT = window.navigator.userAgent

videojs.browser.IS_SAFARI = (/safari/i).test(USER_AGENT)
/**
 * add afrostream to videojs childs
 * @type {{}}
 */
videojs.options.children.push('afrostream')

ControlBar.prototype.options_.children.splice(11, 0, ControlBar.prototype.options_.children.splice(1, 1)[0])

Component.registerComponent('Afrostream', Afrostream)
export default Afrostream
