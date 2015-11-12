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
      {
        "src": "https://origin.cdn.afrostream.net/vod/ARAISININTHESUN_178_25_ProRes422_FRA_ENG_HD_STEREO/0341bc2bdadd2e79.ism/master.m3u8",
        "type": "application/vnd.apple.mpegurl"
      },
      {
        "src": "https://origin.cdn.afrostream.net/vod/ARAISININTHESUN_178_25_ProRes422_FRA_ENG_HD_STEREO/0341bc2bdadd2e79.ism/0341bc2bdadd2e79.mpd",
        "type": "application/dash+xml"
      }
    ];

  var techOrder = qs.tech ? qs.tech.split(',') : ['dash', 'html5'];

  if (url) {
    sources = [
      {
        src: url,
        type: extractType(url).type
      }
    ]
  }

  var player = videojs('player', {
    metrics: {user_id: 33},
    autoplay: true,
    controls: true,
    width: '100%',
    height: '550',
    techOrder: techOrder,
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
};

loadPlayer(qs.url ? decodeURIComponent(qs.url) : '');
