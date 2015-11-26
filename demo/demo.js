var playerAfrostream = angular.module('afrostreamPlayer', ['afrostreamAuth'])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])
  .run(['$rootScope', '$location', '$cookies', '$http', 'AuthenticationService',
    function ($rootScope, $location, $cookies, $http, AuthenticationService) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookies.getObject('globals') || {};
      if ($rootScope.globals.user) {
        if ($rootScope.globals.user.expires_in > new Date().getTime()) {
          AuthenticationService.ClearCredentials();
        }
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $rootScope.globals.user.token; // jshint ignore:line
      }

      //$rootScope.$on('$locationChangeStart', function (event, next, current) {
      //  // redirect to login page if not logged in
      //  if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
      //    $location.path('/login');
      //  }
      //});
    }]);


playerAfrostream.controller('PlayerCtrl', ['$scope', '$rootScope', 'AuthenticationService', function ($scope, $rootScope, AuthenticationService) {
  // listen for login events
  $scope.user = $rootScope.globals.user;
  $scope.customData = $rootScope.globals.customData;
  // method to log-in
  $scope.onLoginButton = function () {
    $scope.dataLoading = true;
    AuthenticationService.Login($scope.email, $scope.password, function (response) {
      if (response) {
        $scope.user = response.user;
        $scope.customData = response.customData;
        loadPlayer(qs.url ? decodeURIComponent(qs.url) : '');
      } else {
        $scope.error = response.message;
        $scope.dataLoading = false;
        $scope.user = null;
      }
    });
  };


  //var qs = $location.search();
  var qs = (function (a) {
    if (a == '') return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
      var p = a[i].split('=', 2);
      if (p.length == 1)
        b[p[0]] = '';
      else
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
    }
    return b;
  })(window.location.search.substr(1).split('&'));

  var extractMime = function (filename) {
    var reg = /(\/[^?]+).*/;
    var filePath = filename.match(reg);

    var parts = filePath[1].split('.');
    var type = (parts.length > 1) ? parts.pop() : 'mp4';
    return type;
  };

  var replaceType = function (filename, replacement) {
    var type = extractMime(filename);
    var newFile = filename.replace(type, replacement);
    return newFile;
  };

  var extractType = function (filename) {
    var type = extractMime(filename);
    var rtType = {};
    switch (type) {
      case 'm3u8':
        rtType.type = 'application/x-mpegURL';
        rtType.format = 'hls';
        break;
      case 'mpd':
        rtType.type = 'application/dash+xml';
        rtType.format = 'mpd';
        break;
      case 'f4m':
        rtType.type = 'application/adobe-f4m';
        rtType.format = 'hds';
        break;
      default:
        rtType.type = 'video/' + type;
        rtType.format = 'progressive';
        break;
    }
    return rtType;
  };

  $scope.urls = [
    {
      'name': 'Nexus S',
      'snippet': 'Fast just got faster with Nexus S.'
    },
    {
      'name': 'Motorola XOOM™ with Wi-Fi',
      'snippet': 'The Next, Next Generation tablet.'
    },
    {
      'name': 'MOTOROLA XOOM™',
      'snippet': 'The Next, Next Generation tablet.'
    }
  ];

  var loadPlayer = function (url) {


    var sources =
      [
        //EXTERNAL SIMPLE
        //{
        //  "src": "http://str01.enterplay.com.br/pi/picenc.ism/.mpd",
        //  "type": "application/dash+xml"
        //}
        //{
        //  "src": "http://dashas.castlabs.com/videos/files/bbb/Manifest.mpd",
        //  "type": "application/dash+xml"
        //}
        //{
        //  "src": "http://playertest.longtailvideo.com/adaptive/eleph-audio/playlist.m3u8",
        //  "type": "application/vnd.apple.mpegurl"
        //}
        //DIGIBOS/AFRO
        //{
        //  "src": "https://origin.cdn.afrostream.net/vod/ARAISININTHESUN_178_25_ProRes422_FRA_ENG_HD_STEREO/0341bc2bdadd2e79.ism/master.m3u8",
        //  "type": "application/vnd.apple.mpegurl"
        //},
        //{
        //  "src": "https://origin.cdn.afrostream.net/vod/ARAISININTHESUN_178_25_ProRes422_FRA_ENG_HD_STEREO/0341bc2bdadd2e79.ism/0341bc2bdadd2e79.mpd",
        //  "type": "application/dash+xml"
        //}
        //{
        //  "src": "http://hw.cdn.afrostream.net/vod/BWNG_Ep1_bis/44ea1a1f7bd1722b.ism/44ea1a1f7bd1722b.mpd",
        //  "type": "application/dash+xml"
        //}
        //DRM
        {
          "src": "https://origin.cdn.afrostream.net/vod/big_buck_bunny_480p_surround-fix/b829352c949f8bfc.ism/b829352c949f8bfc.mpd",
          "type": "application/dash+xml"
        }
        //DRM CASTLAB

        //{
        //  //"src": "http://playready.directtaps.net/smoothstreaming/SSWSS720H264PR/SuperSpeedway_720.ism/Manifest",
        //  "src": "http://origin.cdn.afrostream.net/vod/big_buck_bunny_480p_surround-fix/b829352c949f8bfc.ism/Manifest",
        //  "type": "application/dash+xml"
        //}
        //{
        //  "src": "https://origin.cdn.afrostream.net/vod/big_buck_bunny_480p_surround-fix/b829352c949f8bfc.ism/b829352c949f8bfc.f4m",
        //  "type": "application/adobe-f4m"
        //}
        //{
        //  "src": "http://html5.cablelabs.com:8100/cenc/wvck/dash_initdata.mpd",
        //  "type": "application/dash+xml",
        //  "protData": {
        //    "com.widevine.alpha": {
        //      "serverURL": "https://html5.cablelabs.com:8025"
        //    },
        //    "org.w3.clearkey": {
        //      "clearkeys": {
        //        "H3JbV93QV3mPNBKQON2UtQ": "ClKhDPHMtCouEx1vLGsJsA"
        //      }
        //    }
        //  }
        //},
        //DRM DASHJS sources https://github.com/Dash-Industry-Forum/dash.js/blob/60059134ba946f9cf79e1b2f3609dd537fa54e8c/samples/dash-if-reference-player/app/sources.json#L283
        //{
        //  "src": "http://html5.cablelabs.com:8100/cenc/prwv/dash_init.mpd",
        //  "type": "application/dash+xml",
        //  "protData": {
        //    "com.widevine.alpha": {
        //      "drmtoday": true,
        //      "serverURL": "https://lic.staging.drmtoday.com/license-proxy-widevine/cenc/",
        //      "httpRequestHeaders": {
        //        "dt-custom-data": "eyJ1c2VySWQiOiIxMjM0NSIsInNlc3Npb25JZCI6ImV3b2dJQ0p3Y205bWFXeGxJaUE2SUhzS0lDQWdJQ0p3ZFhKamFHRnpaU0lnT2lCN0lIMEtJQ0I5TEFvZ0lDSnZkWFJ3ZFhSUWNtOTBaV04wYVc5dUlpQTZJSHNLSUNBZ0lDSmthV2RwZEdGc0lpQTZJR1poYkhObExBb2dJQ0FnSW1GdVlXeHZaM1ZsSWlBNklHWmhiSE5sTEFvZ0lDQWdJbVZ1Wm05eVkyVWlJRG9nWm1Gc2MyVUtJQ0I5TEFvZ0lDSnpkRzl5WlV4cFkyVnVjMlVpSURvZ1ptRnNjMlVLZlFvSyIsIm1lcmNoYW50IjoiY2FibGVsYWJzIn0K"
        //      }
        //    },
        //    "com.microsoft.playready": {
        //      "drmtoday": true,
        //      "serverURL": "https://lic.staging.drmtoday.com/license-proxy-headerauth/drmtoday/RightsManager.asmx",
        //      "httpRequestHeaders": {
        //        "http-header-CustomData": "eyJ1c2VySWQiOiIxMjM0NSIsInNlc3Npb25JZCI6ImV3b2dJQ0p3Y205bWFXeGxJaUE2SUhzS0lDQWdJQ0p3ZFhKamFHRnpaU0lnT2lCN0lIMEtJQ0I5TEFvZ0lDSnZkWFJ3ZFhSUWNtOTBaV04wYVc5dUlpQTZJSHNLSUNBZ0lDSmthV2RwZEdGc0lpQTZJR1poYkhObExBb2dJQ0FnSW1GdVlXeHZaM1ZsSWlBNklHWmhiSE5sTEFvZ0lDQWdJbVZ1Wm05eVkyVWlJRG9nWm1Gc2MyVUtJQ0I5TEFvZ0lDSnpkRzl5WlV4cFkyVnVjMlVpSURvZ1ptRnNjMlVLZlFvSyIsIm1lcmNoYW50IjoiY2FibGVsYWJzIn0K"
        //      }
        //    }
        //  }
        //}
      ];

    var techOrder = qs.tech ? qs.tech.split(',') : ['dash', 'dashas', 'osmf', 'html5', 'hls', 'flash'];
    var muted = qs.muted ? qs.muted : false;

    if (url) {
      sources = [
        {
          src: url,
          type: extractType(url).type
        }
      ]
    }

    var protData = {
      "com.widevine.alpha": {
        "drmtoday": true,
        "serverURL": "https://lic.staging.drmtoday.com/license-proxy-widevine/cenc/",
        "httpRequestHeaders": {
          "dt-custom-data": $scope.customData
        }
      },
      "com.microsoft.playready": {
        "drmtoday": true,
        "serverURL": "https://lic.staging.drmtoday.com/license-proxy-headerauth/drmtoday/RightsManager.asmx",
        "httpRequestHeaders": {
          "http-header-CustomData": $scope.customData
        }
      },
      "com.adobe.flashaccess": {
        "drmtoday": true,
        "serverURL": "https://lic.staging.drmtoday.com/flashaccess/LicenseTrigger/v1",
        "httpRequestHeaders": {
          "customData": $scope.customData
        }
      },
      "org.w3.clearkey": {
        "clearkeys": {
          "21920416600048BC8DBB9A45FD4A3B9E": "0001020304050607"
        }
      }
    };

    //Init player
    var dasheverywhere = {
      "customData": {
        "userId": $scope.user.userId,
        "sessionId": $scope.user.token,
        "merchant": "afrostream"
      },
      "sendCustomData": true,
      "assetId": "b829352c949f8bfc",
      "variantId": "",
      "debug": true,
      "widevineLicenseServerURL": "https://lic.staging.drmtoday.com/license-proxy-widevine/cenc/",
      "accessLicenseServerURL": "https://lic.staging.drmtoday.com/flashaccess/LicenseTrigger/v1",
      "playReadyLicenseServerURL": "https://lic.staging.drmtoday.com/license-proxy-headerauth/drmtoday/RightsManager.asmx",
      "flashFile": './libs/dashas.swf',
      "techs": ['dashas', 'dashcs']
    };

    var config = $scope.config = {
      metrics: {user_id: $scope.user.userId},
      autoplay: true,
      controls: true,
      muted: muted,
      width: '100%',
      height: '550',
      techOrder: techOrder,
      dashas: {
        swf: './libs/dashas.swf',
        //swf: '../bower_components/dashas/site/demo/StrobeMediaPlayback.swf',
        //flashVars: {
        //  'plugin_DashPlugin': encodeURIComponent('../bower_components/dashas/site/demo/debug/dashas.swf?log=true')
        //},
        //swf: './assets/swf/videojs-osmf.swf',
        protData: protData
      },
      osmf: {
        swf: './assets/swf/videojs-osmf.swf'
      },
      dash: {
        protData: protData
      },
      hls: {
        swf: 'bower_components/video.js/dist/video-js/video-js.swf'
      },
      dasheverywhere: dasheverywhere,
      sources: sources
    };

    var player = $scope.player = videojs('player', config).ready(function () {
      var player = this;

      console.log('Video Ready');
      var smoothie = new SmoothieChart({
        millisPerPixel: 20,
        interpolation: 'bezier',
        grid: {strokeStyle: 'rgba(119,119,119,0.02)'},
        maxValue: 5000,
        minValue: -50
      });

      var audioSerie = new TimeSeries();
      var videoSerie = new TimeSeries();

      smoothie.addTimeSeries(audioSerie, {
        strokeStyle: 'rgb(100,255,255)',
        fillStyle: 'rgba(150,255,255, 0.4)',
        lineWidth: 2
      });

      smoothie.addTimeSeries(videoSerie, {
        strokeStyle: '#00ff00',
        fillStyle: 'rgba(255, 0, 0, 0.4)',
        lineWidth: 2
      });

      var chart = $('#_chart')[0];
      player.on('loadedmetadata', function () {
        chart.width = player.width();
      });

      smoothie.streamTo(chart, 1000);

      setInterval(function () {
        var statistics = player.tech.getPlaybackStatistics();
        var dlAudioBitrate = Math.round(statistics.audio.bandwidth / 10.24) / 100;
        var dlVidBitrate = Math.round(statistics.video.bandwidth / 10.24) / 100;
        document.getElementById('version').innerHTML = videojs.CDN_VERSION;
        document.getElementById('resolution').innerHTML = player.width() + ' x ' + player.height();
        document.getElementById('audioBuffer').innerHTML = statistics.audio.bufferLength;
        document.getElementById('videoBuffer').innerHTML = statistics.video.bufferLength;
        document.getElementById('dlAudioBitrate').innerHTML = dlAudioBitrate;
        document.getElementById('dlVideoBitrate').innerHTML = dlVidBitrate;
        var now = new Date().getTime();
        audioSerie.append(now, dlAudioBitrate);
        videoSerie.append(now, dlVidBitrate);
      }, 500);
    });
  }
  if ($scope.user) {
    loadPlayer(qs.url ? decodeURIComponent(qs.url) : '');
  }
}
]);

