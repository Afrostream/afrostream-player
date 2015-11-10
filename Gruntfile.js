'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;' +
    ' Licensed <%= pkg.license %> */\n',
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dashjs: {
        src: [
          //VJS
          'node_modules/video.js/dist/video-js/video.dev.js',
          //VJS MEDIA SOURCE
          'node_modules/videojs-contrib-media-sources/src/videojs-media-sources.js',
          //HLS
          'node_modules/videojs-contrib-hls/src/videojs-hls.js',
          'node_modules/videojs-contrib-hls/src/stream.js',
          'node_modules/videojs-contrib-hls/src/flv-tag.js',
          'node_modules/videojs-contrib-hls/src/exp-golomb.js',
          'node_modules/videojs-contrib-hls/src/h264-extradata.js',
          'node_modules/videojs-contrib-hls/src/h264-stream.js',
          'node_modules/videojs-contrib-hls/src/aac-stream.js',
          'node_modules/videojs-contrib-hls/src/metadata-stream.js',
          'node_modules/videojs-contrib-hls/src/segment-parser.js',
          'node_modules/videojs-contrib-hls/src/m3u8/m3u8-parser.js',
          'node_modules/videojs-contrib-hls/src/xhr.js',
          'node_modules/videojs-contrib-hls/src/playlist.js',
          'node_modules/videojs-contrib-hls/src/playlist-loader.js',
          'node_modules/pkcs7/dist/pkcs7.unpad.js',
          'node_modules/videojs-contrib-hls/src/decrypter.js',
          'node_modules/videojs-contrib-hls/src/bin-utils.js',
          //DASH
          'node_modules/dashjs/dist/dash.debug.js',
          //CHROMECAST
          'node_modules/videojs-chromecast/dist/videojs.chromecast.js',
          //GoogleAnaltics
          'bower_components/videojs-ga/dist/videojs.ga.js',
          //METRICS
          'node_modules/videojs-metrics/dist/videojs-metrics.js',
          //CASTLAB
          //'lib/castlab/**/cldasheverywhere.min.js',
          //'!lib/castlab/**/cldashjs.min.js'
          //CORE
          'lib/**/*.js',
          '!lib/castlab/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      castlab: {
        src: [
          //VJS
          'node_modules/video.js/dist/video-js/video.dev.js',
          //CHROMECAST
          'node_modules/videojs-chromecast/dist/videojs.chromecast.js',
          //GoogleAnaltics
          'bower_components/videojs-ga/dist/videojs.ga.js',
          //METRICS
          'node_modules/videojs-metrics/dist/videojs-metrics.js',
          //CORE
          'lib/**/*.js',
          //CASTLAB
          'lib/castlab/**/cldasheverywhere.min.js',
          '!lib/castlab/**/cldashjs.min.js'
        ],
        dest: 'dist/<%= pkg.name %>.castlab.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dashjs.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      files: 'test/**/*.html'
    },
    jshint: {
      gruntfile: {
        options: {
          node: true
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'lib/**/*.js',
          '!lib/**/flash.js',
          '!lib/castlab/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      demo: {
        files: 'demo/demo.js',
        tasks: ['default']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['default', 'qunit']
      },
      less: {
        files: '<%= less.style.src %>',
        tasks: ['less']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
    less: {
      style: {
        src: 'lib/**/*.less',
        dest: 'dist/<%= pkg.name %>.css'
      }
    },
    closure: {
      options: {
        closure: 'lib/closure.js'
      },
      wrap: {
        files: [
          {
            src: ['dist/<%= pkg.name %>.js']
          }
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',//set 0.0.0.0 for external access
        livereload: 35728,
        base: ['']
      },
      dev: {
        options: {
          open: {
            target: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/demo/index.html'
          }
        }
      }
    },
    copy: {
      smoothie: {
        expand: true,
        flatten: true,
        src: [
          './node_modules/smoothie/smoothie.js'

        ],
        dest: 'demo/libs'
      },
      swf: {
        expand: true,
        flatten: true,
        src: [
          './node_modules/videojs-swf/**/*.swf',
          './lib/castlab/**/*.swf',
          './lib/castlab/**/*.{xap,xaml}'

        ],
        dest: 'dist/'
      },
      videojs: {
        expand: true,
        flatten: false,
        cwd: './node_modules/video.js/dist/video-js/',
        src: '**/*.{less,eot,svg,ttf,woff}',
        dest: 'lib/'
      },
      fonts: {
        expand: true,
        flatten: false,
        cwd: 'lib/',
        src: '**/*.{eot,svg,ttf,woff}',
        dest: 'dist/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerMultiTask('closure', 'Add closure around the app', function () {


// Set up defaults for the options hash
    var options = this.options({
      closure: ''
    });

    // Iterate over the list of files and add the banner or footer
    this.files.forEach(function (file) {
      file.src.forEach(function (src) {
        if (grunt.file.isFile(src)) {
          // wrap the original app source with the closure
          grunt.file.write(src,
            grunt.file.read(options.closure)
              .replace(/\/\*#replaceCode#\*\//, grunt.file.read(src))
          );
          grunt.verbose.writeln('Closure added to file ' + src.cyan);
        }

      });
    });

  });

  // Creates the `server` task
  grunt.registerTask('serve', [
    'default',
    'connect',
    'watch'
  ]);

  grunt.registerTask('default', [
    'clean',
    'copy',
    'jshint',
    'concat',
    'uglify',
    'less'
  ]);

  grunt.registerTask('build', [
    'default',
    'closure',
    'qunit'
  ]);
};
