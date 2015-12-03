/**
 * Error screen component.
 *
 * @type {*|void|videojs.CoreObject|Object}
 */
videojs.ErrorScreen = videojs.ErrorDisplay.extend({
  /** @constructor */
  init: function (player, options) {
    videojs.ErrorDisplay.call(this, player, options);
  }
});

/**
 * Inject Error screen in core player
 * @type {{}}
 */
videojs.options.children.errorScreen = {};

videojs.ErrorScreen.prototype.messages = {
  unknown: 'Une erreur est survenue lors de la lecture de la vidéo.',
  1: 'Vous avez interrompu la lecture de la vidéo.',
  2: 'Une erreur de réseau a interrompu le téléchargement de la vidéo.',
  3: 'La lecture de la vidéo a été interrompue à cause d\'un problème de corruption ou parce que la vidéo utilise des fonctionnalités non prises en charge par votre navigateur.',
  4: 'Cette vidéo n\'a pas pu être chargée, soit parce que le serveur ou le réseau a échoué ou parce que le format n\'est pas reconnu.',
  5: 'The video is encrypted and we do not have the keys to decrypt it.',
  6: 'La lecture de cette vidéo nécessite Adobe Flash Player, cliquer ici pour le télécharger : <a href="https://get.adobe.com/fr/flashplayer/">https://get.adobe.com/fr/flashplayer/</a>',
  2014: 'Le plugin Adobe Flash Player de votre système d\'exploitation est obsolète et ne permet pas la lecture de cette vidéo.',
  AUTHORIZATION_ERROR: 'Cette vidéo ne peut pas être lu sur ce domaine.',
  DRM_ERROR: 'L\'obtention de la licence de contenu de la vidéo a échoué.',
  PRIMETIME_ERROR: 'Une erreur est survenue lors de la lecture de la vidéo.',
  3313: 'L\'obtention de la licence de contenu de la vidéo a échoué, veuillez rééssayer.',
  3727: 'L\'obtention de la licence de contenu de la vidéo a échoué, veuillez rééssayer.',
  3307: 'L\'obtention de la licence de contenu de la vidéo a échoué.<br/>Veuillez réinitialiser vos fichiers licences de contenu vidéo dans les paramètres de Flash Player en <a href="http://www.macromedia.com/support/documentation/fr/flashplayer/help/settings_manager08.html">cliquant ici</a>.',
  3321: 'L\'obtention de la licence de contenu de la vidéo a échoué.<br/>Veuillez réinitialiser vos fichiers licences de contenu vidéo dans les paramètres de Flash Player en <a href="http://www.macromedia.com/support/documentation/fr/flashplayer/help/settings_manager08.html">cliquant ici</a>.',
  3364: 'L\'obtention de la licence de contenu de la vidéo a échoué.<br/>Veuillez réinitialiser vos fichiers licences de contenu vidéo dans les paramètres de Flash Player en <a href="http://www.macromedia.com/support/documentation/fr/flashplayer/help/settings_manager08.html">cliquant ici</a>.',
  3365: 'Vous ne pouvez pas lire cette vidéo en mode "navigation privée".',
  102100: 'La vidéo que vous demandez n\'existe plus.'
};

videojs.ErrorScreen.prototype.createEl = function () {
  var el = videojs.Component.prototype.createEl.call(this, 'div', {
    className: 'vjs-error-screen'
  });

  this.contentEl_ = videojs.createEl('div');
  el.appendChild(this.contentEl_);

  videojs.insertFirst(el, this.player_.el());

  return el;
};

videojs.ErrorScreen.prototype.update = function () {
  if (this.player().error()) {
    /*jshint sub:true*/
    var errorCode = this.player().error().code,
      msg = this.messages.hasOwnProperty(errorCode) ? this.messages[errorCode] : this.messages['unknown'];
    this.contentEl_.innerHTML = msg + '<br/><br/>code : ' + errorCode;
  }
};
