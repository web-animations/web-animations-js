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
    return newFiles;
  }

  minifillSrc = [
    'scope.js',
    'animation-node.js',
    'animation.js',
    'apply.js',
    'property-interpolation.js',
    'color-handler.js',
    'dimension-handler.js',
    'effect.js',
    'element-animate.js',
    'interpolation.js',
    'number-handler.js',
    'player.js',
    'timeline.js',
    'transform-handler.js',
  ];

  minifillTest = [
    'animation-node.js',
    'color-handler.js',
    'dimension-handler.js',
    'effect.js',
    'element-animate.js',
    'interpolation.js',
    'number-handler.js',
    'player-finish-event.js',
    'player.js',
    'property-interpolation.js',
    'transform-handler.js',
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
        add: ['animation-constructor.js'],
      }),
      test: minifillTest,
    },

    // 'minifill-inline-style': {
    //   src: tweak(minifillSrc, {
    //     replace: {'apply.js': 'apply-preserving-inline-style.js'},
    //   }),
    //   test: tweak(minifillTest, {
    //     add: ['apply-preserving-inline-style.js'],
    //   }),
    // },

    // 'minifill-inline-style-methods': {
    //   src: tweak(minifillSrc, {
    //     replace: {'apply.js': 'apply-preserving-inline-style-methods.js'},
    //   }),
    //   test: tweak(minifillTest, {
    //     add: ['apply-preserving-inline-style-methods.js'],
    //   }),
    // },
  };

  if (typeof module != 'undefined')
    module.exports = targetConfig;
  else
    window.targetConfig = targetConfig;
})();
