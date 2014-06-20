var TESTING = true;
var testing = window;
var assert = chai.assert;
mocha.setup({ ui: 'tdd' });

function loadWebAnimationsBuildTarget(target) {
  var config = targetConfig[target];
  config.src.forEach(function(sourceFile) {
    document.write('<script src="../src/' + sourceFile + '"></script>\n');
  });
  config.test.forEach(function(testFile) {
    document.write('<script src="js/' + testFile + '"></script>\n');
  });
}

addEventListener('load', function() { mocha.run(); });
