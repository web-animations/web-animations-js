(function() {

  var src = [
      'src/scope.js', // Must be first.
      'src/shared/animation-node.js',
      'src/shared/effect.js'];

  var minifillSrc = src.concat(
      // FIXME: Currently property-interpolation must come before handlers.
      'src/minifill/property-interpolation.js',
      'src/minifill/animation.js',
      'src/minifill/apply.js',
      'src/minifill/color-handler.js',
      'src/minifill/dimension-handler.js',
      'src/minifill/element-animate.js',
      'src/minifill/interpolation.js',
      'src/minifill/number-handler.js',
      'src/minifill/player.js',
      'src/minifill/timeline.js',
      'src/minifill/transform-handler.js');

  var maxifillSrc = minifillSrc.concat(
      'src/maxifill/animation-constructor.js',
      'src/maxifill/effect-callback.js',
      'src/maxifill/group-constructors.js');

  var minifillTest = [
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
      'test/js/timeline.js'];

  var maxifillTest = minifillTest.concat(
      'test/js/group-constructors.js',
      'test/js/group-player.js',
      'test/js/group-player-finish-event.js',
      'test/js/effect-callback.js');

  // This object specifies the source and test files for different Web Animation build targets.
  var targetConfig = {
    minifill: {
      src: minifillSrc,
      test: minifillTest,
    },
    maxifill: {
      src: maxifillSrc,
      test: maxifillTest,
    },
  };

  // The default target will be used for files without target suffixes, eg. web-animations.js
  Object.defineProperty(targetConfig, 'defaultTarget', {
    configurable: true,
    enumerable: false,
    value: 'maxifill',
  });

  if (typeof module != 'undefined')
    module.exports = targetConfig;
  else
    window.webAnimationsTargetConfig = targetConfig;
})();
