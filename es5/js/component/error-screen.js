/**
 * Error screen component.
 *
 * @type {*|void|videojs.CoreObject|Object}
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _videoJs = require('video.js');

var _videoJs2 = _interopRequireDefault(_videoJs);

var ErrorDisplay = _videoJs2['default'].getComponent('ErrorDisplay');

var ErrorScreen = (function (_ErrorDisplay) {
  _inherits(ErrorScreen, _ErrorDisplay);

  /**
   * Constructor for error display modal.
   *
   * @param  {Player} player
   * @param  {Object} [options]
   */

  function ErrorScreen(player, options) {
    _classCallCheck(this, ErrorScreen);

    _get(Object.getPrototypeOf(ErrorScreen.prototype), 'constructor', this).call(this, player, options);
    this.on(player, 'error', this.open);
  }

  /**
   * Create the component's DOM element
   *
   * @method createEl
   */

  _createClass(ErrorScreen, [{
    key: 'createEl',
    value: function createEl() {
      var el = _get(Object.getPrototypeOf(ErrorScreen.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-error-screen'
      });

      this.contentEl_ = _videoJs.Dom.createEl('div');
      el.appendChild(this.contentEl_);

      _videoJs.Dom.insertElFirst(el, this.player_.el());

      return el;
    }
  }, {
    key: 'update',
    value: function update() {
      if (this.player().error()) {
        /*jshint sub:true*/
        var errorCode = this.player().error().code,
            msg = this.messages.hasOwnProperty(errorCode) ? this.messages[errorCode] : this.messages['unknown'];
        this.contentEl_.innerHTML = msg + '<br/><br/>code : ' + errorCode;
      }
    }
  }]);

  return ErrorScreen;
})(ErrorDisplay);

ErrorScreen.prototype.messages = {
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

/**
 * Inject Error screen in core player
 * @type {{}}
 */
_videoJs2['default'].options.children.errorScreen = {};

ErrorDisplay.registerComponent('ErrorScreen', ErrorScreen);
exports['default'] = ErrorScreen;
module.exports = exports['default'];