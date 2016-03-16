/**
 * @file load-progress-spinner.js
 */
import videojs from 'video.js';

const Component = videojs.getComponent('Component');
const LoadProgressBar = videojs.getComponent('LoadProgressBar');

/**
 * Shows load progress
 *
 * @param {Player|Object} player
 * @param {Object=} options
 * @extends Component
 * @class LoadProgressSpinner
 */
class LoadProgressSpinner extends LoadProgressBar {

  constructor(player, options) {
    super(player, options);
  }

  /**
   * Create the component's DOM element
   *
   * @return {Element}
   * @method createEl
   */
  createEl() {
    let el = videojs.createEl('div', {
      className: 'vjs-load-progress-spinner',
      innerHTML: `<svg class="circular" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="${this.options_.rayon}" fill="none" stroke-width="2" stroke-miterlimit="10"/> </svg>`
    });

    this.circle = videojs.createEl('svg', {
      className: 'circular',
      innerHTML: `<circle class="path" cx="50" cy="50" r="${this.options_.rayon}" fill="none" stroke-width="2" stroke-miterlimit="10"/>`
    }, {
      viewBox: '25 25 50 50'
    });

    //el.appendChild(this.circle);
    return el;
  }

  /**
   * Update progress bar
   *
   * @method update
   */
  update() {
    let buffered = this.player_.buffered();
    let duration = this.player_.duration();
    let bufferedEnd = this.player_.bufferedEnd();
    let children = this.el_.children;
    let rayon = this.options_.rayon;

    // get the percent width of a time compared to the total end
    //let percentify = function (time, end) {
    //  let percent = (time / end) || 0; // no NaN
    //  percent = ((percent >= 1 ? 1 : percent) * 100);
    //
    //  let c = Math.PI * (rayon * 2);
    //  let pct = ((100 - percent) / 200) * c;
    //  return pct;
    //};

    // get the percent width of a time compared to the total end
    let percentify = function (time, end) {
      let percent = (time / end) || 0; // no NaN
      return ((percent >= 1 ? 1 : percent) * 125);
    };

    // update the width of the progress bar
    let svg = this.el_.firstChild;
    if (svg.firstChild) {
      let i = buffered.length - 1;
      let start = buffered.start(i);
      let end = buffered.end(i);
      let percent = percentify(end - start, 30);
      console.log('dash :', percent);
      svg.firstChild.nextElementSibling.style.strokeDasharray = [percent, 125];
    }

    //for (let i = 0; i < buffered.length; i++) {
    //  let start = buffered.start(i);
    //  let end = buffered.end(i);
    //
    //  // set the percent based on the width of the progress bar (bufferedEnd)
    //  part.style.left = percentify(start, bufferedEnd);
    //  part.style.width = percentify(end - start, bufferedEnd);
    //}
    //
    //// remove unused buffered range elements
    //for (let i = children.length; i > buffered.length; i--) {
    //  this.el_.removeChild(children[i - 1]);
    //}
  }

}

LoadProgressSpinner.prototype.options_ = {
  rayon: 20
};

Component.registerComponent('LoadProgressSpinner', LoadProgressSpinner);

//Replace videojs CaptionButton child with this one
videojs.options.children.splice(3, 1, 'loadProgressSpinner');

export default LoadProgressSpinner;
