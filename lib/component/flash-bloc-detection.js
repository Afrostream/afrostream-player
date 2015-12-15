/**
 * Flash blocker detection
 * based on https://github.com/browserstack/flashblock-detector
 * Mac:
 *
 * Chrome
 *
 * Flashblock
 * AdBlock Pro
 * Firefox
 *
 * Flashblock 1.5.15.1
 * Safari
 *
 * ClickToFlash
 * Windows:
 *
 * IE
 * Shockwave Player disabled on IE
 * AdBlock
 * @type {videojs.CoreObject}
 *
 * 0 - all well
 * 1 - flash is not installed
 * 2 - some flashblocker plugin is enabled
 */
videojs.FlashBlockDetector = videojs.CoreObject.extend({
  init: function (player, options, ready) {
    videojs.CoreObject.call(this, player, options, ready);
    var techRequired = 'Flash,Dashas';
    var techFounded = false;
    var fbVal = (function () {
      if (player.techName && !~techRequired.indexOf(player.techName)) {
        return false;
      }
      /*jshint sub:true*/
      for (var i = 0, j = player.options_['techOrder']; i < j.length; i++) {
        var techName = videojs.capitalize(j[i]);
        if (~techRequired.indexOf(techName)) {
          techFounded = true;
        }
      }

      if (!techFounded) {
        return false;
      }
      if (videojs.IS_ANDROID || videojs.IS_IOS) {
        return false;
      }
      var e = document.createElement(videojs.IS_IE ? 'object' : 'embed');
      e.type = 'application/x-shockwave-flash';
      document.body.appendChild(e);
      var isValid = !('PercentLoaded' in e);
      document.body.removeChild(e);
      return isValid;
    })();
    player.ready(function () {
      if (fbVal) {
        //Si le player requiert une version de flash mais que celle ci n'est pas installée on affiche un message d'erreur
        var flVersion = videojs.Flash.version();
        if (!parseInt(flVersion, 10)) {
          this.setTimeout(function () {
            player.error({code: 6, message: ''});
          }, 0);
        } else {
          player.addClass('flash-block');
        }
      }
    });
  }
});

/**
 * Push childrre in default config
 * @type {{}}
 */
videojs.options.children.flashBlockDetector = {};
