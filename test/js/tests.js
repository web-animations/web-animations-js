(function() {
  var sources = [
    'element-animate.js',
    'dimension-interpolation.js',
    'interpolation.js'
  ];

  var scripts = document.getElementsByTagName('script');
  var location = scripts[scripts.length - 1].src.replace(/[^\/]+$/, '');
  sources.forEach(function(src) {
    document.write('<script src="' + location + src + '"></script>');
  });
})();
