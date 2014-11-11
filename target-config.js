(function() {

  var scopeSrc = [
      'src/scope.js'];

  var minifillSrc = [
      'src/animation-node.js',
      'src/effect.js',
      'src/property-interpolation.js',
      'src/animation.js',
      'src/apply.js',
      'src/element-animatable.js',
      'src/interpolation.js',
      'src/matrix-interpolation.js',
      'src/player.js',
      'src/tick.js',
      'src/matrix-decomposition.js',
      'src/handler-utils.js',
      'src/shadow-handler.js',
      'src/number-handler.js',
      'src/visibility-handler.js',
      'src/color-handler.js',
      'src/dimension-handler.js',
      'src/box-handler.js',
      'src/transform-handler.js',
      'src/font-weight-handler.js',
      'src/position-handler.js',
      'src/shape-handler.js'];

  var sharedSrc = [
      'src/timing-utilities.js',
      'src/normalize-keyframes.js'];

  var maxifillSrc = [
      'src/timeline.js',
      'src/maxifill-player.js',
      'src/animation-constructor.js',
      'src/effect-callback.js',
      'src/group-constructors.js'];

  var minifillTest = [
      'test/js/animation-node.js',
      'test/js/box-handler.js',
      'test/js/color-handler.js',
      'test/js/dimension-handler.js',
      'test/js/effect.js',
      'test/js/interpolation.js',
      'test/js/matrix-interpolation.js',
      'test/js/number-handler.js',
      'test/js/player.js',
      'test/js/player-finish-event.js',
      'test/js/property-interpolation.js',
      'test/js/tick.js',
      'test/js/transform-handler.js'];

  var maxifillTest = minifillTest.concat(
      'test/js/animation-constructor.js',
      'test/js/effect-callback.js',
      'test/js/group-constructors.js',
      'test/js/group-player.js',
      'test/js/group-player-finish-event.js',
      'test/js/timeline.js');

  // This object specifies the source and test files for different Web Animation build targets.
  var targetConfig = {
    minifill: {
      src: scopeSrc.concat(sharedSrc).concat(minifillSrc),
      test: minifillTest,
    },
    maxifill: {
      src: scopeSrc.concat(sharedSrc).concat(minifillSrc).concat(maxifillSrc),
      test: maxifillTest,
    },
    scopeSrc: scopeSrc,
    sharedSrc: sharedSrc,
    minifillSrc: minifillSrc,
    maxifillSrc: maxifillSrc
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
