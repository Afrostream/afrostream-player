/**
 * @file easy-broadcast.js
 * EASY_BROADCAST P2P Media Controller - Wrapper for DASH Media API
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
class EasyBroadcast extends Dash {
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
      this.mediaPlayer_ = new DashEB.MediaPlayer(this.el_, src, true)
      this.initYoubora()
      super.src(src)
    }

  }

  getCribbedMetricsFor (type) {
    if (type !== 'p2pweb') {
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
    const metricsKey = 'p2pweb'
    const metrics = this.getCribbedMetricsFor(metricsKey)
    if (metrics) {
      this.metrics_[metricsKey] = videojs.mergeOptions(this.metrics_[metricsKey], metrics)
    }
    super.onMetricChanged(e)
  }

}

EasyBroadcast.prototype.options_ = Object.assign(Dash.prototype.options_, {
  lib: '//www.libs.easybroadcast.fr/afrostream/EB.js',
  //override option EB, cause switch lang too long
  trackSwitchMode: 'alwaysReplace'
})

/* EasyBroadcast Support Testing -------------------------------------------------------- */

EasyBroadcast.isSupported = function () {
  return Dash.isSupported() && !!(window.RTCPeerConnection || window.webkitPeerConnection00 || window.webkitRTCPeerConnection) && (!videojs.browser.IS_IOS && !videojs.browser.IS_ANDROID)
}

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(EasyBroadcast)

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
EasyBroadcast.nativeSourceHandler = Dash.nativeSourceHandler

/*
 * Sets the tech's status on native audio track support
 *
 * @type {Boolean}
 */
EasyBroadcast.supportsNativeTextTracks = Dash.supportsNativeTextTracks

/*
 * Check to see if native video tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
EasyBroadcast.supportsNativeVideoTracks = Dash.supportsNativeVideoTracks

/*
 * Check to see if native audio tracks are supported by this browser/device
 *
 * @return {Boolean}
 */
21021
EasyBroadcast.supportsNativeAudioTracks = Dash.supportsNativeAudioTracks

videojs.options.easybroadcast = {}

Component.registerComponent('EasyBroadcast', EasyBroadcast)
Tech.registerTech('EasyBroadcast', EasyBroadcast)
export default EasyBroadcast
