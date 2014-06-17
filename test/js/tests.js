(function() {
  var sources = [
    'animation-node.js',
    'dimension-interpolation.js',
    'effect.js',
    'element-animate.js',
    'interpolation.js',
    'number-interpolation.js',
    'player.js',
    'property-interpolation.js',
    'transform-interpolation.js',
  ];

  var scripts = document.getElementsByTagName('script');
  var location = scripts[scripts.length - 1].src.replace(/[^\/]+$/, '');
  sources.forEach(function(src) {
    document.write('<script src="' + location + src + '"></script>');
  });
})();
