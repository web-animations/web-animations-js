(function() {
  var target = webAnimationsTargetConfig.defaultTarget;
  if (typeof webAnimationsSourceTarget != 'undefined')
    target = webAnimationsSourceTarget;

  // Native implementation detection.
  var player = document.body.animate([], 0);
  var load = true;

  if (player !== undefined) {
    load = false;
    "play|currentTime|pause|reverse|playbackRate|cancel|finish|startTime|playState".split('|').forEach(function(t) {
      if (player[t] === undefined) {
        load = true;
      }
    });
  }

  if (load) {
    var scripts = document.getElementsByTagName('script');
    var location = scripts[scripts.length - 1].src.replace(/[^\/]+$/, '');
    webAnimationsTargetConfig[target].src.forEach(function(sourceFile) {
      document.write('<script src="' + location + sourceFile + '"></script>');
    });
  }
})();
