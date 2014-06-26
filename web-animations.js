var WEB_ANIMATIONS_TESTING = false;
(function() {
  var scripts = document.getElementsByTagName('script');
  var location = scripts[scripts.length - 1].src.replace(/[^\/]+$/, '');
  var webAnimationsSourceTarget = 'maxifill';
  document.write('<script src="' + location + 'target-config.js"></script>');
  document.write('<script src="' + location + 'target-loader.js"></script>');
})();
