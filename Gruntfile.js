module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-gjslint');

  var sources = require('./web-animations.js');
  grunt.log.write(sources);
  grunt.initConfig({
    uglify: {
      webanim: {
        options: {
          sourceMap: true,
          sourceMapName: 'web-animations.min.js.map',
          banner: grunt.file.read('src/boilerplate'),
          wrap: true,
          compress: {
            global_defs: {
              "TESTING": false
            },
            dead_code: true
          },
        },
        nonull: true,
        dest: 'web-animations.min.js',
        src: sources,
      }
    },
    gjslint: {
      options: {
        flags: [
          '--nojsdoc',
          '--nostrict',
          '--disable 121,110', // 121: Illegal comma at end of object literal
                               // 110: Line too long
        ],
        reporter: {
          name: 'console'
        }
      },
      all: {
        src: [
          'web-animations.js',
          'src/*.js',
          'test/js/*.js'
        ],
      }
    },
  });

  grunt.registerTask('default', ['uglify', 'gjslint']);
};
