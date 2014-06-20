var global = this;
if (this.TESTING === undefined) {
  var TESTING = false;
}

(function() {
  var sources = [
<% _.forEach(sources, function(source) { print('    \'' + source + '\',\n'); }); %>  ];

  if (typeof module != 'undefined') {
    module.exports = sources;
    return;
  }

  var scripts = document.getElementsByTagName('script');
  var location = scripts[scripts.length - 1].src.replace(/[^\/]+$/, '');
  sources.forEach(function(src) {
    document.write('<script src="' + location + src + '"></script>');
  });
})();
