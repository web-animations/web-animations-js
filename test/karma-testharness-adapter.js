// Copyright 2016 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function() {
  var karma = window.__karma__;

  function stringify(string) {
    return '\'' + string.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/'/g, '\\\'') + '\'';
  }

  function checkExpectations(testURL, passes, failures, expectedFailures, flakyFailureIndicator) {
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
        if (expectedFailures[name] != flakyFailureIndicator && message != expectedFailures[name]) {
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
        message += '  Test: ' + stringify(name) + '\n';
        message += '  Expected: ' + stringify(expectedFailures[name]) + '\n';
        message += '  Actual:   ' + stringify(differentFailures[name]) + '\n\n';
      }
      message += '\n';
    }
    if (failedUnexpectedly) {
      message += 'Failed unexpectedly:\n';
      for (var name in unexpectedFailures) {
        message += '  Test: ' + stringify(name) + '\n';
        message += '  Failure: ' + stringify(unexpectedFailures[name]) + '\n\n';
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

  function checkConfig(config) {
    var requiredProperties = {
      testURLList: '<Array of test URLs>',
      skip: '<Object mapping skipped test URLs to the reason for skipping>',
      expectedFailures: '<Object mapping test URLs to expected inner test failures>',
      flakyFailureIndicator: '<String used in expectedFailures to indicate non deterministic failure messages>',
    };
    var errorMessage = '';
    if (!config) {
      errorMessage = 'Missing testharnessTests config options on Karma\'s config.client.\n';
    } else {
      for (var property in requiredProperties) {
        if (!(property in config)) {
          errorMessage += 'Missing property ' + property + ' from testharnessTests.\n';
        }
      }
    }
    if (errorMessage) {
      karma.error('testharnessTests config options must be defined in Karma\'s config.client with the following properties:\n' +
          Object.keys(requiredProperties).map(function(property) {
            return '  ' + property + ': ' + requiredProperties[property] + '\n';
          }).join('') +
          '\n' +
          errorMessage);
      return false;
    }
    return true;
  }

  karma.start = function() {
    // Karma's config.client object appears as karma.config here.
    var config = karma.config.testharnessTests;
    if (!checkConfig(config)) {
      return;
    }

    karma.info({total: config.testURLList.length});

    var testName = document.createElement('div');
    document.body.appendChild(testName);
    var iframe = document.createElement('iframe');
    iframe.style.width = 'calc(100vw - 30px)';
    iframe.style.height = 'calc(100vh - 60px)';
    document.body.appendChild(iframe);

    function runRemainingTests() {
      if (config.testURLList.length == 0) {
        karma.complete();
        return;
      }

      var testURL = config.testURLList.shift();
      if (testURL in config.skip) {
        console.log('Skipping: ' + testURL + ' because: ' + config.skip[testURL]);
        karma.result({
          suite: [testURL],
          description: '',
          skipped: true,
        });
        runRemainingTests();
        return;
      }

      // This expects testharnessreport.js in the iframe to look for this function on the
      // parent window and call it once testharness.js has loaded.
      window.onTestharnessLoaded = function(innerWindow) {
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

          karma.result(checkExpectations(testURL, passes, failures, config.expectedFailures[testURL], config.flakyFailureIndicator));
          runRemainingTests();
        });
      };
      testName.textContent = testURL;
      iframe.src = testURL;
    }

    runRemainingTests();
  };
})();
