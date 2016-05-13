(function() {
  var karma = window.__karma__;

  function checkExpectations(testURL, passes, failures, expectedFailures) {
    expectedFailures = expectedFailures || {};

    var failedDifferently = false;
    var differentFailures = {};

    var failedUnexpectedly = false;
    var unexpectedFailures = {};

    var passedUnexpectedly = false;
    var unexpectedPasses = [];

    var hasStaleFailureExpectations = false;
    var staleFailureExpectations = [];

    for (var name in failures) {
      var message = failures[name];
      if (name in expectedFailures) {
        if (expectedFailures[name] !== testharnessFlakyFailure && message != expectedFailures[name]) {
          failedDifferently = true;
          differentFailures[name] = message;
        }
      } else {
        failedUnexpectedly = true;
        unexpectedFailures[name] = message;
      }
    }
    for (var name in expectedFailures) {
      if (name in passes) {
        passedUnexpectedly = true;
        unexpectedPasses.push(name);
      } else if (!(name in failures)) {
        hasStaleFailureExpectations = true;
        staleFailureExpectations.push(name);
      }
    }

    var message = '';
    if (hasStaleFailureExpectations) {
      message += 'Stale failure expectations, test no longer exists:\n';
      message += staleFailureExpectations.map(function(name) { return '  ' + name + '\n'; }).join('');
      message += '\n';
    }
    if (passedUnexpectedly) {
      message += 'Passed unexpectedly:\n';
      message += unexpectedPasses.map(function(name) { return '  ' + name + '\n'; }).join('');
      message += '\n';
    }
    if (failedDifferently) {
      message += 'Failed differently:\n';
      for (var name in differentFailures) {
        message += '  Test: ' + JSON.stringify(name) + '\n';
        message += '  Expected: ' + JSON.stringify(expectedFailures[name]) + '\n';
        message += '  Actual:   ' + JSON.stringify(differentFailures[name]) + '\n\n';
      }
      message += '\n';
    }
    if (failedUnexpectedly) {
      message += 'Failed unexpectedly:\n';
      for (var name in unexpectedFailures) {
        message += '  Test: ' + JSON.stringify(name) + '\n';
        message += '  Failure: ' + JSON.stringify(unexpectedFailures[name]) + '\n\n';
      }
      message += '\n';
    }

    return {
      suite: [testURL],
      description: '',
      success: message == '',
      log: message ? [message] : [],
    };
  }

  karma.start = function() {
    var testURLs = karma.config.testList;
    if (!testURLs) {
      karma.error('testList not set on karma config.client');
      return;
    }
    if (typeof window.skippedTestharnessTests == 'undefined') {
      karma.error('skippedTestharnessTests data not set on window.');
      return;
    }
    if (typeof window.expectedTestharnessFailures == 'undefined') {
      karma.error('expectedTestharnessFailures data not set on window.');
      return;
    }

    karma.info({total: testURLs.length});

    var iframe = document.createElement('iframe');
    document.body.appendChild(iframe);

    function runRemainingTests() {
      if (testURLs.length == 0) {
        karma.complete();
        return;
      }

      var testURL = testURLs.shift();
      if (testURL in skippedTestharnessTests) {
        console.log('Skipping: ' + testURL + ' because: ' + skippedTestharnessTests[testURL]);
        karma.result({
          suite: [testURL],
          description: '',
          skipped: true,
        });
        runRemainingTests();
        return;
      }

      window.initTestHarness = function(innerWindow) {
        innerWindow.add_completion_callback(function(results) {
          var failures = {};
          var passes = {};
          results.forEach(function(result) {
            if (result.status == 0) {
              passes[result.name] = true;
            } else {
              if (result.name in failures) {
                console.warn(testURL + ' has duplicate test name: ' + result.name);
              }
              failures[result.name] = result.message;
            }
          });

          karma.result(checkExpectations(testURL, passes, failures, expectedTestharnessFailures[testURL]));
          runRemainingTests();
        });
      }
      iframe.src = testURL;
    }

    runRemainingTests();
  };
})();
