/**
 * @file audio-track-button.js
 */
import videojs from 'video.js';
//import AudioTrackMenuItem from './audio-track-menu-item';
import './off-audio-track-menu-item'

const Component = videojs.getComponent('Component')
const ControlBar = videojs.getComponent('ControlBar')
const TrackButton = videojs.getComponent('TrackButton')
const AudioTrackMenuItem = videojs.getComponent('AudioTrackMenuItem')

/**
 * The base class for buttons that toggle specific audio track types (e.g. description)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class AudioTrackButton
 */
class AudioTrackButton extends TrackButton {

  constructor (player, options) {
    options.tracks = player.audioTracks();
    super(player, options)
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass () {
    return `vjs-audio-button ${super.buildCSSClass()}`
  }

  // Create a menu item for each text track
  createItems () {
    let items = []
    // if there's only one audio track, there no point in showing it
    this.hideThreshold_ = 1;

    const tracks = this.player_.audioTracks();

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];

      items.push(new AudioTrackMenuItem(this.player_, {
        track,
        // MenuItem is selectable
        selectable: true
      }));
    }

    return items;

    /*let items = []
    items.push(new AudioTrackMenuItem(this.player_, {
      label: this.controlText_,
      selectable: false
    }))

    let tracks = this.player_.audioTracks()

    if (!tracks) {
      return items
    }

    if (tracks.length < 2) {
      this.hide()
      return items
    }

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i]

      // only add tracks that are of the appropriate kind and have a label
      if (track['kind'] === 'main') {
        items.push(new AudioTrackMenuItem(this.player_, {
          // MenuItem is selectable
          'selectable': true,
          'track': track
        }))
      }
    }

    return items*/
  }

}


AudioTrackButton.prototype.kind_ = 'audio'
AudioTrackButton.prototype.controlText_ = 'Audio Selection'

//Replace videojs CaptionButton child with this one
//ControlBar.prototype.options_.children.splice(12, 0, 'audioTrackButton')

Component.registerComponent('AudioTrackButton', AudioTrackButton)
export default AudioTrackButton
