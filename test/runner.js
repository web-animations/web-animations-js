var TESTING = true;
var testing = window;
var assert = chai.assert;
mocha.setup({ ui: 'tdd' });

function loadWebAnimationsBuildTarget(target) {
  var config = targetConfig[target];
  config.src.concat(config.test).forEach(function(file) {
    document.write('<script src="../' + file + '"></script>\n');
  });
}

addEventListener('load', function() { mocha.run(); });
