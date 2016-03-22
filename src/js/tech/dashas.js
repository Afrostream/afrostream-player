/**
 * @file dashas.js
 * DASH Media Controller - Wrapper for Flash Media API
 */
import videojs from 'video.js';
import {MediaPlayer} from 'dashjs';
import window from 'global/window';

const Component = videojs.getComponent('Component');
const Tech = videojs.getComponent('Tech');
const Flash = videojs.getComponent('Flash');

/**
 * Dash Media Controller - Wrapper for HTML5 Media API
 *
 * @param {Object=} options Object of option names and values
 * @param {Function=} ready Ready callback function
 * @extends Html5
 * @class Dash
 */
class Dashas extends Flash {
  constructor(options, ready) {
    super(options, ready);
    // Add global window functions that the swf expects
    // A 4.x workflow we weren't able to solve for in 5.0
    // because of the need to hard code these functions
    // into the swf for security reasons
    window.videojs = window.videojs || {};
    window.videojs.Dashas = window.videojs.Dashas || {};
    window.videojs.Dashas.onReady = Flash.onReady;
    window.videojs.Dashas.onEvent = Flash.onEvent;
    window.videojs.Dashas.onError = Flash.onError;

    this.metricsInterval = this.setInterval(this.detectBandwithChange, 5000);
    this.on('loadedmetadata', ::this.onInitialized);
    this.on('firstplay', ::this.selectDefaultTrack);

  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    let options = this.options_;
    var serverUrl = Dashas.buildMetadataUrl(options);
    var customData = Dashas.buildOptData(options);
    // Merge default flashvars with ones passed in to init
    options.flashVars = videojs.mergeOptions({
      'metadataUrl': encodeURIComponent(serverUrl),
      'authenticationToken': encodeURIComponent(customData),
      'language': 'fr',
      'spinner': !1,
      'watermark': !1,
      'muted': this.player_.options_.muted,
      'debug': true,
      'quality': 'autolow',
      'maxBufferLength': 8
    }, options.flashVars || {});

    return super.createEl();
  }

  onInitialized() {
    const metrics = this.getPlaybackStatistics();
    if (!metrics) {
      return;
    }
    this.metrics_ = videojs.mergeOptions(this.metrics_, metrics);
  }

  selectDefaultTrack() {
    const tracks = this.audioTracks();
    let track;
    debugger;
    for (let i = 0; i < tracks.length; i++) {
      track = tracks[i];
      if (typeof  track === 'string') {
        if ((track === 'fra' || track === 'fr')) {
          this.setAudioTrack(track);
        }
      }
    }
  }

  detectBandwithChange() {
    let metrics = this.getPlaybackStatistics();
    let metricsChangeType;
    if (!metrics) {
      return;
    }
    switch (true) {
      case metrics.video.bandwidth !== this.metrics_.video.bandwidth:
        this.metrics_.video.bandwidth = metrics.video.bandwidth;
        metricsChangeType = 'video';
        break;
      case metrics.audio.bandwidth !== this.metrics_.audio.bandwidth:
        this.metrics_.audio.bandwidth = metrics.audio.bandwidth;
        metricsChangeType = 'audio';
        break;
      default:
        break;
    }
    if (metricsChangeType) {
      var metricsChangeEvent = {
        type: MediaPlayer.events.METRIC_CHANGED,
        data: metricsChangeType
      };

      this.trigger(metricsChangeEvent);
    }
  }

  subtitleTracks() {
    return this.textTracks();
  }

  setSubsTrack(track) {
    this.setTextTrack(track);
  }

  setAudioTrack(track) {
    this.el_.vjs_setProperty('forcedAudioLang', track.index);
  }

  getDroppedFrames() {
    return this.el_.vjs_getProperty('droppedFrames');
  }

  getBuffered() {
    return this.el_.vjs_getProperty('buffered');
  }

  getBufferLevel() {
    return this.el_.vjs_getProperty('bufferLevel');
  }

  getCurrentAudioBandwidth() {
    return this.el_.vjs_getProperty('currentAudioBandwidth');
  }

  getCurrentVideoBandwidth() {
    return this.el_.vjs_getProperty('currentVideoBandwidth');
  }

  getPlaybackStatistics() {
    let z = this.getBuffered();
    let W = (this.getBufferLevel(), this.getDroppedFrames());
    let Z = this.getCurrentVideoBandwidth();
    let K = this.getCurrentAudioBandwidth();
    let R = {
      bandwidth: Z,
      bufferLength: z,
      droppedFrames: W
    }, N = {bandwidth: K, bufferLength: z};
    return videojs.mergeOptions(this.metrics_, {video: R, audio: N});
  }

  src(src) {
    var options = this.options_;
    var autoPlay = this.player_.autoplay();
    var serverUrl = Dashas.buildMetadataUrl(options);
    var customData = Dashas.buildOptData(options);
    this.el_.vjs_source(src, autoPlay, serverUrl, customData);
  }

  currentTime() {
    return this.el_.vjs_getProperty('currentTime');
  }

  buffered() {
    return this.el_.vjs_getProperty('buffered');
  }

  audioTracks() {
    return this.el_.vjs_getProperty('audioTracks');
  }

}

Dashas.extractAssetId = (source)=> {
  const reg = /^(.*\/)?(?:$|(.+?)(?:(\.[^.]*$)|$))/;
  const filePath = source.match(reg);

  const assetId = filePath[2];
  return assetId;
};

Dashas.getDRMData = (options) => {
  const drmData = options.protData['com.adobe.flashaccess'];
  let assetId = options.source ? Dashas.extractAssetId(options.source.src) : '';
  let customData = drmData['httpRequestHeaders'] ? drmData['httpRequestHeaders'].customData || {} : {};
  let serverUrl = drmData['serverURL'] ? drmData['serverURL'] || '' : '';

  if (options.source && !options.source.drm) {
    serverUrl = customData = assetId = '';
  }

  return {
    customData: customData,
    serverUrl: serverUrl,
    assetId: assetId,
    variantId: ''//on utilise pas cette key
  }
};

Dashas.buildMetadataUrl = (options) => {
  const data = Dashas.getDRMData(options);
  let metadataUrl = data.serverUrl;
  if (data.customData) {
    metadataUrl += '?optData=' + data.customData;
  }
  if (data.assetId) {
    metadataUrl += '&assetId=' + data.assetId;
  }
  if (data.variantId) {
    metadataUrl += '&variantId=' + data.variantId;
  }
  return metadataUrl;
};

Dashas.buildOptData = (options) => {
  return Dashas.getDRMData(options).customData;
};

Dashas.prototype.options_ = {
  customData: {},
  protData: {
    "com.widevine.alpha": {},
    "com.microsoft.playready": {},
    "com.adobe.flashaccess": {},
    "org.w3.clearkey": {}
  }
};

/* Dash Support Testing -------------------------------------------------------- */

Dashas.isSupported = function () {
  return Flash.isSupported() && Flash.version()[0] >= 14;
};

// Add Source Handler pattern functions to this tech
Tech.withSourceHandlers(Dashas);

/*
 * The default native source handler.
 * This simply passes the source to the video element. Nothing fancy.
 *
 * @param  {Object} source   The source object
 * @param  {Flash} tech  The instance of the Flash tech
 */
Dashas.nativeSourceHandler = {};

/**
 * Check if Flash can play the given videotype
 * @param  {String} type    The mimetype to check
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dashas.nativeSourceHandler.canPlayType = function (source) {

  const dashTypeRE = /^application\/dash\+xml/i;
  const dashExtRE = /\.mpd/i;

  if (dashTypeRE.test(source)) {
    return 'probably';
  } else if (dashExtRE.test(source)) {
    return 'maybe';
  } else {
    return '';
  }

};

/*
 * Check Flash can handle the source natively
 *
 * @param  {Object} source  The source object
 * @return {String}         'probably', 'maybe', or '' (empty string)
 */
Dashas.nativeSourceHandler.canHandleSource = function (source) {

  // If a type was provided we should rely on that
  if (source.type) {
    return Dashas.nativeSourceHandler.canPlayType(source.type);
  } else if (source.src) {
    return Dashas.nativeSourceHandler.canPlayType(source.src);
  }

  return '';
};

/*
 * Pass the source to the flash object
 * Adaptive source handlers will have more complicated workflows before passing
 * video data to the video element
 *
 * @param  {Object} source    The source object
 * @param  {Flash} tech   The instance of the Flash tech
 */
Dashas.nativeSourceHandler.handleSource = function (source, tech) {
  tech.src(source.src);
};

/*
 * Clean up the source handler when disposing the player or switching sources..
 * (no cleanup is needed when supporting the format natively)
 */
Dashas.nativeSourceHandler.dispose = function () {
};

// Register the native source handler
Dashas.registerSourceHandler(Dashas.nativeSourceHandler);

videojs.options.dashas = {};

Component.registerComponent('Dashas', Dashas);
Tech.registerTech('Dashas', Dashas);

/**
 * @fileoverview Externs for video-js.swf. Externs are functions
 * that the compiler shouldn't obfuscate.
 */

/**
 * @param {string} name
 */
HTMLObjectElement.prototype.vjs_getProperty = function (name) {
};

/**
 * @param {string} name
 * @param {string|number} value
 */
HTMLObjectElement.prototype.vjs_setProperty = function (name, value) {
};

/**
 * Control methods
 */
HTMLObjectElement.prototype.vjs_play = function () {
};
HTMLObjectElement.prototype.vjs_pause = function () {
};
HTMLObjectElement.prototype.vjs_load = function () {
};

/**
 * @param {string} src
 */
HTMLObjectElement.prototype.vjs_src = function (src) {
};

export default Dashas;
