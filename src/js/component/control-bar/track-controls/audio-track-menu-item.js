import videojs from'video.js';

const Component = videojs.getComponent('Component');
const MenuItem = videojs.getComponent('MenuItem');

class AudioTrackMenuItem extends MenuItem {
  constructor(player, options) {
    let track = options['track'];
    let tracks = player.audioTracks();

    // Modify options for parent MenuItem class's init.
    options['label'] = track['label'] || track['language'] || 'Unknown';
    options['selected'] = track['default'] || track['enabled'] === true;

    super(player, options);

    this.track = track;

    if (tracks) {
      let changeHandler = ::this.handleTracksChange;

      tracks.addEventListener('change', changeHandler);
      this.on('dispose', function () {
        tracks.removeEventListener('change', changeHandler);
      });
    }
  }

  /**
   * Handle click on text track
   *
   * @method handleClick
   */
  handleClick(event) {
    let kind = this.track['kind'];
    let tracks = this.player_.audioTracks();

    super.handleClick(event);

    if (!tracks) return;

    for (let i = 0; i < tracks.length; i++) {
      let track = tracks[i];
      track['enabled'] = track === this.track;
    }
  }

  /**
   * Handle text track change
   *
   * @method handleTracksChange
   */
  handleTracksChange() {
    this.selected(this.track['enabled']);
  }
}

Component.registerComponent('AudioTrackMenuItem', AudioTrackMenuItem);
export default AudioTrackMenuItem;
