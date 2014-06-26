(function() {
  var target = webAnimationsTargetConfig.defaultTarget;
  if (typeof webAnimationsSourceTarget != 'undefined')
    target = webAnimationsSourceTarget;

  var scripts = document.getElementsByTagName('script');
  var location = scripts[scripts.length - 1].src.replace(/[^\/]+$/, '');
  targetConfig[target].src.forEach(function(sourceFile) {
    document.write('<script src="' + location + sourceFile + '"></script>');
  });
})();
