module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-gjslint');

  var targetConfig = require('./target-config.js');

  uglifyConfig = {};
  for (var target in targetConfig) {
    console.log(targetConfig[target].src);
    uglifyConfig[target] = {
      options: {
        sourceMap: true,
        sourceMapName: 'web-animations-' + target + '.min.js.map',
        banner: grunt.file.read('src/boilerplate'),
        wrap: true,
        compress: {
          global_defs: {
            "TESTING": false
          },
          dead_code: true
        },
        mangle: {
          eval: true
        },
      },
      nonull: true,
      dest: 'web-animations-' + target + '.min.js',
      src: targetConfig[target].src.map(function(file) {return 'src/' + file;}),
    };
  }

  grunt.initConfig({
    uglify: uglifyConfig,
    gjslint: {
      options: {
        flags: [
          '--nojsdoc',
          '--strict',
          '--disable 7,121,110', //   7: Wrong blank line count
                                 // 121: Illegal comma at end of object literal
                                 // 110: Line too long
        ],
        reporter: {
          name: 'console'
        }
      },
      all: {
        src: [
          'src/*.js',
          'test/*.js',
          'test/js/*.js',
        ],
      }
    },
  });

  grunt.registerTask('default', ['uglify', 'gjslint']);
};
