/**
 * @file caption-track-button-off.js
 */
import videojs from'video.js';
import CaptionTrackMenuItem from './caption-track-menu-item';

const Component = videojs.getComponent('Component');
/**
 * A special menu item for turning of a specific type of text track
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends TextTrackMenuItem
 * @class OffTextTrackMenuItem
 */
class OffCaptionTrackMenuItem extends CaptionTrackMenuItem {

  constructor(player, options) {
    // Create pseudo track info
    // Requires options['kind']
    options['track'] = {
      'kind': options['kind'],
      'player': player,
      'label': options['kind'] + ' off',
      'default': false,
      'mode': 'hidden'
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
    let tracks = this.player().textTracks();
    let selected = true;

    for (let i = 0, l = tracks.length; i < l; i++) {
      let track = tracks[i];
      if (track['kind'] === this.track['kind'] && track['mode'] === 'showing') {
        selected = false;
        break;
      }
    }

    this.selected(selected);
  }

}

Component.registerComponent('OffCaptionTrackMenuItem', OffCaptionTrackMenuItem);
export default OffCaptionTrackMenuItem;
