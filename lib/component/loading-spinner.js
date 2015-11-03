/* Loading Spinner
 ================================================================================ */
/**
 * Loading spinner for waiting events
 * @param {vjs.Player|Object} player
 * @param {Object=} options
 * @class
 * @constructor
 */

videojs.LoadingSpinner.prototype.createEl = function () {
  var
    el = videojs.Component.prototype.createEl.call(this, 'div', {
      className: 'vjs-loading-spinner',
      innerHTML: '<svg class="circular" viewBox="25 25 50 50"> <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/> </svg>'
    });

  return el;
};
