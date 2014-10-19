module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-gjslint');
  grunt.loadNpmTasks('grunt-checkrepo');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-saucelabs');
  grunt.loadNpmTasks('grunt-git-status');
  grunt.loadNpmTasks('grunt-template');

  var targetConfig = require('./target-config.js');

  var sourceMap = require('source-map');

  var config = {
    uglify: {},
    template: {},
    wrap: {}
  };

  function uglify(sources, target, options) {
    config.uglify[target] = {
      options: {
        sourceMap: true,
        sourceMapName: target + '.map',
        banner: grunt.file.read('templates/boilerplate'),
        wrap: true,
        compress: {
          global_defs: options,
          dead_code: true
        },
        mangle: {
          eval: true
        },
      },
      nonull: true,
      dest: target,
      src: sources
    };
    return target;
  }

  function gen(sources, target) {
    var suffix = target == targetConfig.defaultTarget ? '' : '-' + target
    generateFromTemplate('templates/web-animations.js', {target: target}, 'web-animations' + suffix + '.js');
    generateFromTemplate('templates/web-animations.html', {src: sources}, 'web-animations' + suffix + '.html');
    generateFromTemplate('templates/runner.html', {target: target}, 'test/runner' + suffix + '.html');
  }

  function generateFromTemplate(source, data, target) {
    var targetSpec = {};
    targetSpec[target] = [source];
    config.template[target] = {
      options: {
        data: data
      },
      files: targetSpec
    }
    return target;
  }

  function guard(source, target) {
    config.wrap[target] = {
      source: source,
      preamble: '(function() { if (false) { return; } ',
      postamble: '})();'
    };
  }

  var uglifyConfig = {
    WEB_ANIMATIONS_TESTING: false
  };

  uglify(targetConfig.minifill.src, 'web-animations-minifill.min.js', uglifyConfig);
  uglify(targetConfig.maxifill.src, 'web-animations.min.js', uglifyConfig);

  uglify(targetConfig.minifillSrc, 'component-minifill.js', uglifyConfig);
  guard('component-minifill.js', 'guarded-component-minifill.js');

  gen(targetConfig.minifill.src, 'minifill');
  gen(targetConfig.maxifill.src, 'maxifill');

  var testTargets = {'minifill': {}, 'maxifill': {}};

  grunt.initConfig({
    uglify: config.uglify,
    template: config.template,
    wrap: config.wrap,
    checkrepo: {
      all: {
        clean: true,
      },
    },
    'git-status': {
      all: {
      },
    },
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
    test: testTargets,
    sauce: testTargets,
  });


  grunt.task.registerMultiTask('test', 'Run <target> tests under Karma', function() {
    var done = this.async();
    var karmaConfig = require('karma/lib/config').parseConfig(require('path').resolve('test/karma-config.js'), {});
    var config = targetConfig[this.target];
    karmaConfig.files = ['test/runner.js'].concat(config.src, config.test);
    var karmaServer = require('karma').server;
    karmaServer.start(karmaConfig, function(exitCode) {
      done(exitCode === 0);
    });
  });

  grunt.task.registerMultiTask('sauce', 'Run <target> tests under Karma on Saucelabs', function() {
    var done = this.async();
    var karmaConfig = require('karma/lib/config').parseConfig(require('path').resolve('test/karma-config-ci.js'), {});
    var config = targetConfig[this.target];
    karmaConfig.files = ['test/runner.js'].concat(config.src, config.test);
    karmaConfig.sauceLabs.testName = 'web-animation-next ' + this.target + ' Unit tests';
    var karmaServer = require('karma').server;
    karmaServer.start(karmaConfig, function(exitCode) {
      done(exitCode === 0);
    });
  });

  grunt.task.registerMultiTask('wrap', 'Wrap <target> source file and update source map',
    function() {
      var inFile = grunt.file.read(this.data.source);
      var inMap = grunt.file.read(this.data.source + '.map');
      var inLines = inFile.split('\n');
      var i = 0;
      
      // Discover copyright header
      while (inLines[i].length < 2 || inLines[i].substring(0, 2) == '//') {
        i++;
      }
     
      // Fix mapping footer
      var postamble = this.data.postamble;
      if (inLines[inLines.length - 1].substring(0, 21) == '//# sourceMappingURL=') {
        postamble += '\n//# sourceMappingURL=' + this.target + '.map';
      }

      grunt.file.write(
          this.target, inLines.slice(0, i).join('\n') + 
          this.data.preamble + 
          inLines.slice(i, inLines.length - 1).join('\n') + 
          postamble
      );
      var preLines = this.data.preamble.split('\n');
      var lineDelta = preLines.length;
      if (this.data.preamble[this.data.preamble.length - 1] == '\n') {
        var charDelta = 0;
      } else {
        var charDelta = preLines[lineDelta - 1].length;
        lineDelta -= 1;
      }
      console.log(lineDelta, charDelta);
      var inMapConsumer = new sourceMap.SourceMapConsumer(inMap);
      var outMapGenerator = new sourceMap.SourceMapGenerator({file: this.target});
      inMapConsumer.eachMapping(function(mapping) {
        if (mapping.generatedLine == i + 1) {
          mapping.generatedColumn += charDelta;
        }
        mapping.generatedLine += lineDelta;
        outMapGenerator.addMapping(
          {generated: {line: mapping.generatedLine, column: mapping.generatedColumn},
          original: {line: mapping.originalLine, column: mapping.originalColumn},
          source: mapping.source, name: mapping.name});
      });
      grunt.file.write(this.target + '.map', outMapGenerator.toString());
    });

  grunt.task.registerTask('clean', 'Remove files generated by grunt', function() {
    grunt.file.expand('web-animations-*').concat(grunt.file.expand('test/runner-*.html')).forEach(function(file) {
      grunt.file.delete(file);
      grunt.log.writeln('File ' + file + ' removed');
    });
  });

  grunt.task.registerTask('default', ['uglify', 'template', 'wrap', 'gjslint']);
};
