// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

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
    wrap: {},
    sourceMapConcat: {},
  };

  function concat(sources, target, defines) {
    config.uglify[target] = {
      options: {
        sourceMap: true,
        sourceMapName: target + '.map',
        wrap: false,
        compress: {
          global_defs: defines,
          dead_code: false
        },
        mangle: false
      },
      nonull: true,
      dest: target,
      src: sources
    };
    return 'uglify:' + target;
  }

  function compress(source, target, defines) {
    var name = concat([source], target, defines);
    var record = config.uglify[target];
    record.options.sourceMapIn = source + '.map';
    record.options.banner = grunt.file.read('templates/boilerplate');
    record.options.wrap = true;
    record.options.compress.dead_code = true;
    record.options.mangle = { eval: true };
    return name;
  }

  function genTarget(target) {
    var config = targetConfig[target];
    var newGens = [
      generateFromTemplate('templates/web-animations.js', {target: target}, target + '.dev.js'),
      generateFromTemplate('templates/web-animations.html', {src: config.src}, target + '.dev.html'),
      generateFromTemplate('templates/runner.html', {target: target}, 'test/runner-' + target + '.html')];
    return newGens;
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
    return 'template:' + target;
  }

  function guard(source, target) {
    config.wrap[target] = {
      source: source,
      preamble: '(function() {\n' +
                '  if (document.documentElement.animate) {\n' +
                '    var player = document.documentElement.animate([], 0);\n' +
                '    var load = true;\n' +
                '    if (player) {\n' +
                '      load = false;\n' +
                '      "play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState".split("|").forEach(function(t) {\n' +
                '        if (player[t] === undefined) {\n' +
                '          load = true;\n' +
                '        }\n' +
                '      });\n' +
                '    }\n' +
                '    if (!load) { return; }' +
                '  }\n',
      postamble: '})();'
    };
    return 'wrap:' + target;
  }

  function concatWithMaps(sources, target) {
    config.sourceMapConcat[target] = {
      sources: sources
    }
    return 'sourceMapConcat:' + target;
  };

  var concatDefines = {
    WEB_ANIMATIONS_TESTING: false
  };

  function build(target) {
    var config = targetConfig[target];
    var steps = [
      concat(config.scopeSrc.concat(config.sharedSrc), 'inter-' + target + '-preamble.js', concatDefines),
      concat(config.webAnimations1Src, 'inter-component-' + target + '-web-animations-1.js', concatDefines),
      guard('inter-component-' + target + '-web-animations-1.js', 'inter-guarded-' + target + '-web-animations-1.js'),
      concat(config.webAnimations1BonusSrc, 'inter-bonus-' + target + '.js', concatDefines),
    ];
    var filenames = [
      'inter-' + target + '-preamble.js',
      'inter-guarded-' + target + '-web-animations-1.js',
      'inter-bonus-' + target + '.js',
    ];
    if (config.webAnimationsNextSrc.length > 0) {
      steps.push(concat(config.webAnimationsNextSrc, 'inter-component-' + target + '.js', concatDefines));
      filenames.push('inter-component-' + target + '.js');
    }
    steps.push(
      concatWithMaps(filenames, 'inter-' + target + '.js'),
      compress('inter-' + target + '.js', target + '.min.js', concatDefines)
    );
    return genTarget(target).concat(steps);
  }

  grunt.registerTask('web-animations', build('web-animations'));
  grunt.registerTask('web-animations-next', build('web-animations-next'));
  grunt.registerTask('web-animations-next-lite', build('web-animations-next-lite'));

  var testTargets = {'web-animations': {}, 'web-animations-next': {}};

  grunt.initConfig({
    uglify: config.uglify,
    template: config.template,
    wrap: config.wrap,
    sourceMapConcat: config.sourceMapConcat,
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
    debug: testTargets,
    sauce: testTargets,
  });


  function runKarma(configCallback) {
    return new Promise(function(resolve) {
      var karmaConfig = require('karma/lib/config').parseConfig(require('path').resolve('test/karma-config.js'), {});
      configCallback(karmaConfig);
      var karmaServer = require('karma').server;
      karmaServer.start(karmaConfig, function(exitCode) {
        resolve(exitCode == 0);
      });
    });
  }

  function runTests(task, configCallback, testFilter) {
    var done = task.async();
    var config = targetConfig[task.target];
    if (testFilter) {
      testFilter = new Set(testFilter.split(','));
    }

    function filterTests(testFiles) {
      console.assert(testFiles.length > 0);
      if (!testFilter) {
        return testFiles;
      }
      return testFiles.filter(file => testFilter.has(file));
    }

    function runPolyfillTests() {
      var testFiles = filterTests(config.polyfillTests);
      if (testFiles.length == 0) {
        return Promise.resolve(true);
      }

      console.info('Running polyfill tests...');
      return runKarma(function(karmaConfig) {
        configCallback(karmaConfig);
        karmaConfig.plugins.push('karma-mocha', 'karma-chai');
        karmaConfig.frameworks.push('mocha', 'chai');
        karmaConfig.files = ['test/karma-mocha-setup.js'].concat(config.src, testFiles);
      });
    }
    function runWebPlatformTests(withNativeFallback) {
      var testFiles = filterTests(grunt.file.expand(config.webPlatformTests));
      if (testFiles.length == 0) {
        return Promise.resolve(true);
      }

      var withOrWithout = withNativeFallback ? 'with' : 'without';
      console.info('Running web-platform-tests/web-animations tests for target ' + task.target + ' ' + withOrWithout + ' native fallback...');
      return runKarma(function(karmaConfig) {
        configCallback(karmaConfig);
        karmaConfig.client.testharnessTests = require('./test/web-platform-tests-expectations.js');
        karmaConfig.client.testharnessTests.testURLList = testFiles;
        karmaConfig.client.testharnessTests.target = task.target;
        karmaConfig.client.testharnessTests.withNativeFallback = withNativeFallback;
        karmaConfig.files.push('test/karma-testharness-adapter.js');
        var servedFiles = [
          'test/web-platform-tests/resources/**',
          'test/web-platform-tests/web-animations/**',
          'test/resources/*',
          'src/**',
          '*.js*',

          // TODO(alancutter): Make a separate grunt task for serving these imported Blink tests.
          'test/blink/**',
        ];
        for (var pattern of servedFiles) {
          karmaConfig.files.push({pattern, included: false, served: true, nocache: true});
        }
      });
    }

    var polyfillTestsPassed = false;
    var webPlatformTestsWithFallbackPassed = false;
    var webPlatformTestsWithoutFallbackPassed = false;
    runPolyfillTests().then(success => {
      polyfillTestsPassed = success;
    }).then(() => runWebPlatformTests(true)).then(success => {
      webPlatformTestsWithFallbackPassed = success;
    }).then(() => runWebPlatformTests(false)).then(success => {
      webPlatformTestsWithoutFallbackPassed = success;
      done(polyfillTestsPassed && webPlatformTestsWithFallbackPassed && webPlatformTestsWithoutFallbackPassed);
    }).catch(function(error) {
      console.error(error);
      done(false);
    });
  }

  grunt.task.registerMultiTask('test', 'Run <target> tests under Karma', function(testFilter) {
    runTests(this, function(karmaConfig) {
      karmaConfig.singleRun = true;
    }, testFilter);
  });

  grunt.task.registerMultiTask('debug', 'Debug <target> tests under Karma', function(testFilter) {
    if (testFilter) {
      console.log('Test file URLs:');
      for (var testFile of testFilter.split(',')) {
        console.log('http://localhost:9876/base/' + testFile);
      }
    } else {
      console.log('Test runner URL: http://localhost:9876/debug.html');
    }
    runTests(this, function(karmaConfig) {
      karmaConfig.browsers = [];
      karmaConfig.singleRun = false;
    }, testFilter);
  });

  grunt.task.registerMultiTask('sauce', 'Run <target> tests under Karma on Saucelabs', function() {
    var target = this.target;
    runTests(this, function(karmaConfig) {
      karmaConfig.singleRun = true;
      karmaConfig.plugins.push('karma-saucelabs-launcher');
      karmaConfig.sauceLabs = {testName: 'web-animation-next ' + target + ' Unit tests'};
    });
  });

  grunt.task.registerMultiTask('sourceMapConcat', 'concat source files and produce combined source map',
    function() {
      var sources = this.data.sources.map(grunt.file.read);
      var sourceMaps = this.data.sources.map(function(f) { return grunt.file.read(f + '.map'); });
      var out = "";
      var outMapGenerator = new sourceMap.SourceMapGenerator({file: this.target});
      var lineDelta = 0;
      for (var i = 0; i < sources.length; i++) {
        out += sources[i];
        new sourceMap.SourceMapConsumer(sourceMaps[i]).eachMapping(function(mapping) {
          outMapGenerator.addMapping({
            generated: {line: mapping.generatedLine + lineDelta, column: mapping.generatedColumn},
            original: {line: mapping.originalLine, column: mapping.originalColumn},
            source: mapping.source, name: mapping.name});
        });
        var sourceLines = sources[i].split('\n');
        lineDelta += sourceLines.length;
        if (sources[i][sources[i].length - 1] !== '\n') {
          out += '\n';
        }
      }
      grunt.file.write(this.target, out);
      grunt.file.write(this.target + '.map', outMapGenerator.toString());
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

      if (i > 0) {
        var banner = inLines.slice(0, i).join('\n') + '\n';
      } else {
        var banner = '';
      }

      var source = inLines.slice(i, inLines.length - 1).join('\n');

      grunt.file.write(this.target, banner + this.data.preamble + source + postamble);
      var preLines = this.data.preamble.split('\n');
      var lineDelta = preLines.length;
      if (this.data.preamble[this.data.preamble.length - 1] == '\n') {
        var charDelta = 0;
      } else {
        var charDelta = preLines[lineDelta - 1].length;
        lineDelta -= 1;
      }
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

  grunt.task.registerTask('clean', 'Remove files generated by grunt', function(arg) {
    var filePatterns = ['inter-*'];
    if (arg != 'inter') {
      filePatterns.push('*min.js*');
    }
    filePatterns.forEach(function(filePattern) {
      grunt.file.expand(filePattern).forEach(function(file) {
        grunt.file.delete(file);
        grunt.log.writeln('File ' + file + ' removed');
      });
    });
  });

  grunt.task.registerTask('default', ['web-animations', 'web-animations-next', 'web-animations-next-lite', 'gjslint', 'clean:inter']);
};
