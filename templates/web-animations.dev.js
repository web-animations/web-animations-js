var global = this;
var TESTING = false;

(function() {
  function lastScriptElement() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  }

  var location = lastScriptElement().src.replace(/[^\/]+$/, '');
  document.write('<script src="' + location + 'target-config.js"></script>');
  lastScriptElement().addEventListener('load', function() {
    targetConfig['<%= target %>'].src.forEach(function(sourceFile) {
      document.write('<script src="' + location + sourceFile + '"></script>');
    });
  });
})();
