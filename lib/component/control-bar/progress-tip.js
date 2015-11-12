/**
 * The component for controlling the playback rate
 *
 * @param {videojs.Player|Object} player
 * @param {Object=} options
 * @constructor
 */
videojs.ProgressTip = videojs.Component.extend({
  /** @constructor */
  init: function (player, options) {
    videojs.Component.call(this, player, options);
    player.on('loadedmetadata', videojs.bind(this, function () {
      if (!this.player().controlBar) {
        return false;
      }
      this.player().controlBar.progressControl.on('mousemove', videojs.bind(this, this.updateContent));
      this.player().controlBar.progressControl.on('mouseover', videojs.bind(this, this.show));
      this.player().controlBar.on('mouseout', videojs.bind(this, this.hide));
    }));
  }
});

videojs.ProgressTip.prototype.show = function () {
  if (this.hasClass('vjs-hidden')) {
    this.removeClass('vjs-hidden');
  }
  return this;
};
videojs.ProgressTip.prototype.hide = function () {
  if (!this.hasClass('vjs-hidden')) {
    this.addClass('vjs-hidden');
  }
  return this;
};


videojs.ProgressControl.prototype.options_.children.progressTip = {};

videojs.ProgressTip.prototype.createEl = function () {
  return videojs.createEl('div', {
    className: 'vjs-tip vjs-hidden',
    innerHTML: '<div id="vjs-tip-arrow"></div><div id="vjs-tip-inner"></div>'
  });
};

videojs.ProgressTip.prototype.updateContent = function (event) {
  var barHeight, player, minutes, seconds, seekBar, seekBarPos, timeInSeconds;
  player = this.player();
  seekBar = player.controlBar.progressControl.seekBar;
  seekBarPos = videojs.findPosition(seekBar.el());
  var realPosition = (event.pageX - (seekBarPos.left));
  var mousePosition = realPosition / seekBar.width();
  timeInSeconds = mousePosition * player.duration();
  if (timeInSeconds === player.duration()) {
    timeInSeconds = timeInSeconds - 0.1;
  }
  minutes = Math.floor(timeInSeconds / 60);
  seconds = Math.floor(timeInSeconds - minutes * 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  //$('#vjs-tip-inner').html("" + minutes + ":" + seconds);
  //barHeight = $('.vjs-control-bar').height();
  //$("#vjs-tip").css("top", "" + (event.pageY - $(this).offset().top - barHeight - 20) + "px").css("left", "" + (event.pageX - $(this).offset().left - 20) + "px").css("visibility", "visible");
  this.el().innerHTML = '<div id="vjs-tip-arrow"></div><div id="vjs-tip-inner">' + minutes + ':' + seconds + '</div>';
  this.el().style.left = (realPosition - (this.width() * 0.5)) + 'px';
};
