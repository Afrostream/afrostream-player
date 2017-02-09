/**
 * @file streamroot.js
 * STREAMROOT P2P Media Controller - Wrapper for DASH Media API
 */
import videojs from 'video.js'
import Dash from './dash'
import { MediaPlayer } from 'dashjs'

const Component = videojs.getComponent('Component')
const Tech = videojs.getComponent('Tech')

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Dash
 * @class EasyBroadcast
 */
class Streamroot extends Dash {

  constructor (options, ready) {
    super(options, ready)
  }

  /**
   * Set video
   *
   * @param {Object=} src Source object
   * @method setSrc
   */
  src (src) {
    if (!src) {
      return this.el_.src
    }

    if (!this.libLoaded) {
      super.src(src)
    } else {
      // But make a fresh MediaPlayer each time the sourceHandler is used
      this.mediaPlayer_ = MediaPlayer(this.context_).create()
      this.initYoubora()
      this.dashjsWrapper_ = new DashjsWrapper(this.mediaPlayer_, this.options_.p2pConfig, 30)
      // Apply any options that are set
      this.mediaPlayer_.initialize()
      this.mediaPlayer_.setLimitBitrateByPortal(this.options_.limitBitrateByPortal);
      super.src(src)
    }
  }


  getCribbedMetricsFor (type) {
    if (type !== 'p2p') {
      return super.getCribbedMetricsFor(type)
    }
    const metrics = this.mediaPlayer_.getMetricsFor(type)
    if (metrics) {
      return metrics.metricsP2PWeb
    }
    else {
      return null
    }
  }

  onMetricChanged (e) {
    if (e.mediaType !== 'video' && e.mediaType !== 'audio') {
      return
    }
    const metricsKey = 'p2p'
    const metrics = this.getCribbedMetricsFor(metricsKey)
    if (metrics) {
      this.metrics_[metricsKey] = videojs.mergeOptions(this.metrics_[metricsKey], metrics)
    }
    super.onMetricChanged(e)
  }

  get libLoaded () {
    return window.DashjsWrapper
  }

  set libLoaded (loaded) {
    this.libLoaded_ = window.DashjsWrapper || loaded
  }
}

Streamroot.prototype.options_ = Object.assign(Dash.prototype.options_, {
  lib: '//cdn.streamroot.io/dashjs-p2p-wrapper/stable/dashjs-p2p-wrapper.js',
  p2pConfig: {
    streamrootKey: 'none',
    debug: true
  },
  limitBitrateByPortal: false
})

/* Streamroot Support Testing -------------------------------------------------------- */

Streamroot.isSupported = function () {
  return Dash.isSupported() && !!(window.RTCPeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection) && (!videojs.browser.IS_IOS && !videojs.browser.IS_ANDROID)
}

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Streamroot)

videojs.options.streamroot = {}

Component.registerComponent('Streamroot', Streamroot)
Tech.registerTech('Streamroot', Streamroot)
export default Streamroot
