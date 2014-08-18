(function() {

  var src = [
      'src/scope.js'];

  var minifillSrc = src.concat(
      'src/animation-node.js',
      'src/effect.js',
      'src/property-interpolation.js',
      'src/animation.js',
      'src/apply.js',
      'src/color-handler.js',
      'src/dimension-handler.js',
      'src/box-handler.js',
      'src/element-animatable.js',
      'src/interpolation.js',
      'src/number-handler.js',
      'src/player.js',
      'src/timeline.js',
      'src/transform-handler.js');

  var maxifillSrc = minifillSrc.concat(
      'src/maxifill-player.js',
      'src/animation-constructor.js',
      'src/effect-callback.js',
      'src/group-constructors.js');

  var minifillTest = [
      'test/js/animation-node.js',
      'test/js/color-handler.js',
      'test/js/dimension-handler.js',
      'test/js/effect.js',
      'test/js/element-animatable.js',
      'test/js/interpolation.js',
      'test/js/number-handler.js',
      'test/js/box-handler.js',
      'test/js/player-finish-event.js',
      'test/js/player.js',
      'test/js/property-interpolation.js',
      'test/js/transform-handler.js',
      'test/js/timeline.js'];

  var maxifillTest = minifillTest.concat(
      'test/js/animation-constructor.js',
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
