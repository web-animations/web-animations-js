(function() {

  function tweak(files, changes) {
    var newFiles = files.slice();
    if (changes.replace) {
      for (file in changes.replace) {
        var index = newFiles.indexOf(file);
        if (index === -1)
          throw 'targetConfig: Cannot find file ' + file + ' to replace with ' + changes.replace[file] + ' in config.';
        newFiles[index] = changes.replace[file];
      }
    }
    if (changes.remove) {
      changes.remove.forEach(function(file) {
        var index = newFiles.indexOf(file);
        if (index === -1)
          throw 'targetConfig: Cannot find file ' + file + ' to remove from config.';
        newFiles.splice(index, 1);
      });
    }
    if (changes.add)
      newFiles = newFiles.concat(changes.add);
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
        add: ['src/animation-constructor.js'],
      }),
      test: minifillTest,
    },

    // 'minifill-inline-style': {
    //   src: tweak(minifillSrc, {
    //     replace: {'src/apply.js': 'src/apply-preserving-inline-style.js'},
    //   }),
    //   test: tweak(minifillTest, {
    //     add: ['src/apply-preserving-inline-style.js'],
    //   }),
    // },

    // 'minifill-inline-style-methods': {
    //   src: tweak(minifillSrc, {
    //     replace: {'src/apply.js': 'src/apply-preserving-inline-style-methods.js'},
    //   }),
    //   test: tweak(minifillTest, {
    //     add: ['src/apply-preserving-inline-style-methods.js'],
    //   }),
    // },
  };

  if (typeof module != 'undefined')
    module.exports = targetConfig;
  else
    window.targetConfig = targetConfig;
})();
