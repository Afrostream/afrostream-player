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

var loadPlayer = function (url) {

    var sources =
      [
        //{
        //  "src": "http://playertest.longtailvideo.com/adaptive/eleph-audio/playlist.m3u8",
        //  "type": "application/vnd.apple.mpegurl"
        //}
        //{
        //  "src": "https://origin.cdn.afrostream.net/vod/ARAISININTHESUN_178_25_ProRes422_FRA_ENG_HD_STEREO/0341bc2bdadd2e79.ism/master.m3u8",
        //  "type": "application/vnd.apple.mpegurl"
        //},
        //{
        //  "src": "https://origin.cdn.afrostream.net/vod/ARAISININTHESUN_178_25_ProRes422_FRA_ENG_HD_STEREO/0341bc2bdadd2e79.ism/0341bc2bdadd2e79.mpd",
        //  "type": "application/dash+xml"
        //}
        //DRM
        {
          "src": "https://origin.cdn.afrostream.net/vod/24hourlovebis/d4eed726882a4be3-drm.ism/d4eed726882a4be3-drm.mpd",
          "type": "application/dash+xml"
        }
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

    var techOrder = qs.tech ? qs.tech.split(',') : ['dash', 'html5', 'hls', 'flash'];
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
          "dt-custom-data": "eyJ1c2VySWQiOiJiZW5qaXBvdHQiLCJzZXNzaW9uSWQiOiIxMjMiLCJtZXJjaGFudCI6ImFmcm9zdHJlYW0ifQ0K"
        }
      },
      "com.microsoft.playready": {
        "drmtoday": true,
        "serverURL": "https://lic.staging.drmtoday.com/license-proxy-headerauth/drmtoday/RightsManager.asmx",
        "httpRequestHeaders": {
          "http-header-CustomData": "eyJ1c2VySWQiOiJiZW5qaXBvdHQiLCJzZXNzaW9uSWQiOiIxMjMiLCJtZXJjaGFudCI6ImFmcm9zdHJlYW0ifQ0K"
        }
      },
      "org.w3.clearkey": {
        "clearkeys": {
          "21920416600048BC8DBB9A45FD4A3B9E": "0001020304050607"
        }
      }
    }

    var player = videojs('player', {
      metrics: {user_id: 33},
      autoplay: true,
      controls: true,
      muted: muted,
      width: '100%',
      height: '550',
      techOrder: techOrder,
      dash: {
        protData: protData
      },
      hls: {
        swf: 'bower_components/video.js/dist/video-js/video-js.swf'
      },
      sources: sources
    }).ready(function () {
      var player = this;

      console.log('Video Ready');

      var smoothie = new SmoothieChart({
        millisPerPixel: 20,
        interpolation: 'bezier'
      });

      var timeSerie = new TimeSeries();

      setTimeout(function () {
        smoothie.streamTo($('#_chart')[0], 1000);
        smoothie.addTimeSeries(timeSerie, {
          strokeStyle: '#00ff00',
          fillStyle: 'rgba(255, 0, 0, 0.4)',
          lineWidth: 2
        });
      }, 100);

      setInterval(function () {
        var statistics = player.afrostream.getPlaybackStatistics();
        document.getElementById('version').innerHTML = videojs.CDN_VERSION;
        document.getElementById('resolution').innerHTML = player.width() + ' x ' + player.height();
        document.getElementById('audioBuffer').innerHTML = statistics.audio.bufferLength;
        document.getElementById('videoBuffer').innerHTML = statistics.video.bufferLength;
        document.getElementById('dlAudioBitrate').innerHTML = Math.round(statistics.audio.bandwidth / 10.24) / 100;
        var dlVidBitrate = Math.round(statistics.video.bandwidth / 10.24) / 100;
        document.getElementById('dlVideoBitrate').innerHTML = dlVidBitrate;
        timeSerie.append(new Date().getTime(), dlVidBitrate);

      }, 500);
    });
  }
  ;

loadPlayer(qs.url ? decodeURIComponent(qs.url) : '');
