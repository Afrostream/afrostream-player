/**
 * @file video-track-button.js
 */
import videojs from 'video.js';
import VideoTrackMenuItem from './video-track-menu-item';
import OffVideoTrackMenuItem from './off-video-track-menu-item';

const Component = videojs.getComponent('Component');
const ControlBar = videojs.getComponent('ControlBar');
const MenuButton = videojs.getComponent('MenuButton');
const MenuItem = videojs.getComponent('MenuItem');

/**
 * The base class for buttons that toggle specific video track types (e.g. commentary)
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends MenuButton
 * @class VideoTrackButton
 */
class VideoTrackButton extends MenuButton {

  constructor(player, options) {
    super(player, options);

    let tracks = this.player_.videoTracks();

    if (!tracks) {
      return;
    }

    let updateHandler = ::this.update;
    tracks.addEventListener('removetrack', updateHandler);
    tracks.addEventListener('addtrack', updateHandler);

    this.player_.on('dispose', function () {
      tracks.removeEventListener('removetrack', updateHandler);
      tracks.removeEventListener('addtrack', updateHandler);
    });
  }

  /**
   * Allow sub components to stack CSS class names
   *
   * @return {String} The constructed class name
   * @method buildCSSClass
   */
  buildCSSClass() {
    return `vjs-video-button ${super.buildCSSClass()}`;
  }

  // Create a menu item for each text track
  createItems() {
    let items = [];
    // Add an OFF menu item to turn all tracks off
    items.push(new MenuItem(this.player_, {
      'label': 'Quality',
      selectable: false
    }));
    // Add an OFF menu item to turn all tracks off
    items.push(new OffVideoTrackMenuItem(this.player_, {
      'kind': 'Auto'
    }));

    let tracks = this.player_.videoTracks();

    if (!tracks) {
      return items;
    }

    if (tracks.length < 2) {
      return [];
    }

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];

      // only add tracks that are of the appropriate kind and have a label
      if (track['kind'] === 'main') {
        items.push(new VideoTrackMenuItem(this.player_, {
          // MenuItem is selectable
          'selectable': true,
          'track': track
        }));
      }
    }

    return items;
  }

}

VideoTrackButton.prototype.kind_ = 'video';
VideoTrackButton.prototype.controlText_ = 'Quality Selection';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 0, 'videoTrackButton');

Component.registerComponent('VideoTrackButton', VideoTrackButton);
export default VideoTrackButton;
