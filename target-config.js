(function() {

  function tweak(files, changes) {
    var newFiles = files.slice();
    if (changes.replace) {
      changes.add = changes.add || [];
      changes.remove = changes.remove || [];
      for (file in changes.replace) {
        changes.remove.push(file);
        changes.add.push(changes.replace[file]);
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
    'interpolation.js',
    'property-interpolation.js',
    'dimension-handler.js',
    'number-handler.js',
    'color-handler.js',
    'transform-handler.js',
    'element-animate.js',
    'animation-node.js',
    'animation.js',
    'effect.js',
    'apply.js',
    'player.js',
    'timeline.js',
  ];

  minifillTest = [
    'player-finish-event.js',
    'animation-node.js',
    'color-handler.js',
    'dimension-handler.js',
    'effect.js',
    'element-animate.js',
    'interpolation.js',
    'number-handler.js',
    'player.js',
    'property-interpolation.js',
    'transform-handler.js',
  ];

  var config = {
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
    module.exports = config;
  else
    window.targetConfig = config;
})();
