(function() {
  var sources = [
    'element-animate.js',
    'effect.js',
    'dimension-interpolation.js',
    'interpolation.js',
    'property-interpolation.js',
    'animation-node.js',
    'player.js',
    'transform-interpolation.js',
  ];

  var scripts = document.getElementsByTagName('script');
  var location = scripts[scripts.length - 1].src.replace(/[^\/]+$/, '');
  sources.forEach(function(src) {
    document.write('<script src="' + location + src + '"></script>');
  });
})();
