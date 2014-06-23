var global = this;
var TESTING = false;
var webAnimationsSourceTarget = null;

(function() {
  var scripts = document.getElementsByTagName('script');
  var location = scripts[scripts.length - 1].src.replace(/[^\/]+$/, '');
  document.write('<script src="' + location + 'target-config.js"></script>');
  document.write('<script src="' + location + 'target-loader.js"></script>');
})();
