(function() {

  function tweak(files, changes) {
    var newFiles = files.slice();
    if (changes.replace) {
      for (file in changes.replace) {
        var index = newFiles.indexOf(file);
        if (index == -1)
          throw file + ' not found when replacing ' + file + ' with ' + changes.replace[file];
        newFiles[index] = changes.replace[file];
      }
    }
    if (changes.remove) {
      changes.remove.forEach(function(file) {
        var index = newFiles.indexOf(file);
        if (index >= 0)
          newFiles.splice(index, 1);
      });
    }
    if (changes.add)
      newFiles = newFiles.concat(changes.add);
    if (changes.addTop)
      newFiles = changes.addTop.concat(newFiles);
    return newFiles;
  }

  minifillSrc = [
    'src/scope.js',
    'src/animation-node.js',
    'src/animation.js',
    'src/apply.js',
    'src/property-interpolation.js',
    'src/color-handler.js',
    'src/dimension-handler.js',
    'src/effect.js',
    'src/element-animate.js',
    'src/interpolation.js',
    'src/number-handler.js',
    'src/player.js',
    'src/timeline.js',
    'src/transform-handler.js',
  ];

  minifillTest = [
    'test/js/animation-node.js',
    'test/js/color-handler.js',
    'test/js/dimension-handler.js',
    'test/js/effect.js',
    'test/js/element-animate.js',
    'test/js/interpolation.js',
    'test/js/number-handler.js',
    'test/js/player-finish-event.js',
    'test/js/player.js',
    'test/js/property-interpolation.js',
    'test/js/transform-handler.js',
    'test/js/timeline.js'
  ];

  // This object specifies the source and test files for different Web Animation build targets.
  var targetConfig = {
    minifill: {
      src: minifillSrc,
      test: minifillTest,
      customSuffix: '',
    },

    maxifill: {
      src: tweak(minifillSrc, {
        add: [
          'src/animation-constructor.js',
          'src/group-constructors.js',
          'src/group-player.js',
        ],
      }),
      test: tweak(minifillTest, {
        addTop: [
          'test/js/group-constructors.js',
          'test/js/group-player.js',
          'test/js/group-player-finish-event.js',
        ],
      }),
    },
  };

  // The default target will be used for files without target suffixes:
  // - test/runner.html
  // - web-animations.js
  // - web-animations.min.js
  Object.defineProperty(targetConfig, 'defaultTarget', {
    configurable: true,
    enumerable: false,
    value: 'maxifill',
  });

  if (typeof module != 'undefined')
    module.exports = targetConfig;
  else
    window.targetConfig = targetConfig;
})();
