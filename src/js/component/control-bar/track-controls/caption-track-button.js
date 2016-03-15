import videojs from'video.js';
import CaptionTrackMenuItem from './caption-track-menu-item';
import OffCaptionTrackMenuItem from './off-caption-track-menu-item';

const Component = videojs.getComponent('Component');
const ControlBar = videojs.getComponent('ControlBar');
const CaptionsButton = videojs.getComponent('CaptionsButton');

class CaptionTrackButton extends CaptionsButton {
  constructor(options, ready) {
    super(options, ready);
  }

  // Create a menu item for each text track
  createItems(items = []) {
    // Add an OFF menu item to turn all tracks off
    items.push(new OffCaptionTrackMenuItem(this.player_, {'kind': this.kind_, 'mode': 'hidden'}));

    let tracks = this.player_.textTracks();

    if (!tracks) {
      return items;
    }

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];

      // only add tracks that are of the appropriate kind and have a label
      if (track['kind'] === this.kind_) {
        items.push(new CaptionTrackMenuItem(this.player_, {
          'selectable': true,
          'track': track
        }));
      }
    }

    return items;
  }

}


CaptionTrackButton.prototype.kind_ = 'captions';
CaptionTrackButton.prototype.controlText_ = 'Captions';

//Replace videojs CaptionButton child with this one
ControlBar.prototype.options_.children.splice(12, 1, 'captionTrackButton');

Component.registerComponent('CaptionTrackButton', CaptionTrackButton);
export default CaptionTrackButton;
