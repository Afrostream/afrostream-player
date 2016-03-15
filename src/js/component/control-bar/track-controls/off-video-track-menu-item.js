/**
 * @file off-video-track-menu-item.js
 */
import videojs from 'video.js';
import VideoTrackMenuItem from './video-track-menu-item';
const Component = videojs.getComponent('Component');

/**
 * A special menu item for turning of a specific type of video track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends VideoTrackMenuItem
 * @class OffVideoTrackMenuItem
 */
class OffVideoTrackMenuItem extends VideoTrackMenuItem {

  constructor(player, options) {
    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      'kind': options['kind'],
      'player': player,
      'label': options['kind'] + ' off',
      'default': false,
      'selected': false
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
    let tracks = this.player().videoTracks();
    let selected = true;

    for (let i = 0, l = tracks.length; i < l; i++) {
      let track = tracks[i];
      if (track['kind'] === 'main' && track['selected']) {
        selected = false;
        break;
      }
    }
    this.selected(selected);
  }

}

Component.registerComponent('OffVideoTrackMenuItem', OffVideoTrackMenuItem);
export default OffVideoTrackMenuItem;
