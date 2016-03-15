/**
 * @file off-audio-track-menu-item.js
 */
import videojs from 'video.js';
import AudioTrackMenuItem from './audio-track-menu-item';
const Component = videojs.getComponent('Component');
//const AudioTrackMenuItem = videojs.getComponent('AudioTrackMenuItem');

/**
 * A special menu item for turning of a specific type of audio track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends AudioTrackMenuItem
 * @class OffAudioTrackMenuItem
 */
class OffAudioTrackMenuItem extends AudioTrackMenuItem {

  constructor(player, options) {
    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      'kind': options['kind'],
      'player': player,
      'label': options['kind'] + ' off',
      'default': false,
      'enabled': false
    };

    // MenuItem is selectable
    options['selectable'] = true;

    super(player, options);
  }

  /**
   * Handle text track change
   *
   * @param {Object} event Event object
   * @method handleTracksChange
   */
  handleTracksChange(event) {
    let tracks = this.player().audioTracks();
    let selected = true;

    for (let i = 0, l = tracks.length; i < l; i++) {
      let track = tracks[i];
      if (track['kind'] === 'main' && track['enabled']) {
        selected = false;
        break;
      }
    }
    this.selected(selected);
  }

}

Component.registerComponent('OffAudioTrackMenuItem', OffAudioTrackMenuItem);
export default OffAudioTrackMenuItem;
