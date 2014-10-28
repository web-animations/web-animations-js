/*
 * Copyright (C) 2013 Google Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Google Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * This script is intended to be used for constructing layout tests which
 * exercise the interpolation functionaltiy of the animation system.
 * Tests which run using this script should be portable across browsers.
 *
 * The following functions are exported:
 *  * runAsRefTest - indicates that the test is a ref test and disables
 *    dumping of textual output.
 *  * testInterpolationAt([timeFractions], {property: x, from: y, to: z})
 *    Constructs a test case for the interpolation of property x from
 *    value y to value z at each of the times in timeFractions.
 *  * assertInterpolation({property: x, from: y, to: z}, [{at: fraction, is: value}])
 *    Constructs a test case which for each fraction will output a PASS
 *    or FAIL depending on whether the interpolated result matches
 *    'value'. Replica elements are constructed to aid eyeballing test
 *    results. This function may not be used in a ref test.
 *  * convertToReference - This is intended to be used interactively to
 *    construct a reference given the results of a test. To build a
 *    reference, run the test, open the inspector and trigger this
 *    function, then copy/paste the results.
 */
'use strict';
(function() {
  var webkitPrefix = 'webkitAnimation' in document.documentElement.style ? '-webkit-' : '';
  var isRefTest = false;
  var webAnimationsTest = typeof Element.prototype.animate === 'function';
  var startEvent = webkitPrefix ? 'webkitAnimationStart' : 'animationstart';
  var endEvent = webkitPrefix ? 'webkitAnimationEnd' : 'animationend';
  var testCount = 0;
  var animationEventCount = 0;
  // FIXME: This should be 0, but 0 duration animations are broken in at least
  // pre-Web-Animations Blink, WebKit and Gecko.
  var durationSeconds = 0.001;
  var iterationCount = 0.5;
  var delaySeconds = 0;
  var cssText = '.test:hover:before {\n' +
      '  content: attr(description);\n' +
      '  position: absolute;\n' +
      '  z-index: 1000;\n' +
      '  background: gold;\n' +
      '}\n';
  var fragment = document.createDocumentFragment();
  var fragmentAttachedListeners = [];
  var style = document.createElement('style');
  var cssTests = document.createElement('div');
  cssTests.id = 'css-tests';
  cssTests.textContent = 'CSS Animations:';
  var afterTestCallback = null;
  fragment.appendChild(style);
  fragment.appendChild(cssTests);

  if (webAnimationsTest) {
    var waTests = document.createElement('div');
    waTests.id = 'web-animations-tests';
    waTests.textContent = 'Web Animations API:';
    fragment.appendChild(waTests);
  }

  var updateScheduled = false;
  function maybeScheduleUpdate() {
    if (updateScheduled) {
      return;
    }
    updateScheduled = true;
    setTimeout(function() {
      updateScheduled = false;
      style.innerHTML = cssText;
      document.body.appendChild(fragment);
      fragmentAttachedListeners.forEach(function(listener) {listener();});
    }, 0);
  }

  function dumpResults() {
    var targets = document.querySelectorAll('.target.active');
    if (isRefTest) {
      // Convert back to reference to avoid cases where the computed style is
      // out of sync with the compositor.
      for (var i = 0; i < targets.length; i++) {
        targets[i].convertToReference();
      }
      style.parentNode.removeChild(style);
    } else {
      var cssResultString = 'CSS Animations:\n';
      var waResultString = 'Web Animations API:\n';
      for (var i = 0; i < targets.length; i++) {
        var resultString = [];
        if (targets[i].testType === 'css') {
          cssResultString += targets[i].getResultString() + '\n';
        } else {
          waResultString += targets[i].getResultString() + '\n';
        }
      }
      var results = document.createElement('pre');
      results.textContent = cssResultString + (webAnimationsTest ? '\n' + waResultString : '');
      results.id = 'results';
      document.body.appendChild(results);
    }
  }

  function convertToReference() {
    console.assert(isRefTest);
    var scripts = document.querySelectorAll('script');
    for (var i = 0; i < scripts.length; i++) {
      scripts[i].parentNode.removeChild(scripts[i]);
    }
    style.parentNode.removeChild(style);
    var html = document.documentElement.outerHTML;
    document.documentElement.style.whiteSpace = 'pre';
    document.documentElement.textContent = html;
  }

  function afterTest(callback) {
    afterTestCallback = callback;
  }

  function runAsRefTest() {
    console.assert(!isRefTest);
    isRefTest = true;
  }

  // Constructs a timing function which produces 'y' at x = 0.5
  function createEasing(y) {
    // FIXME: if 'y' is > 0 and < 1 use a linear timing function and allow
    // 'x' to vary. Use a bezier only for values < 0 or > 1.
    if (y == 0) {
      return 'steps(1, end)';
    }
    if (y == 1) {
      return 'steps(1, start)';
    }
    if (y == 0.5) {
      return 'steps(2, end)';
    }
    // Approximate using a bezier.
    var b = (8 * y - 1) / 6;
    return 'cubic-bezier(0, ' + b + ', 1, ' + b + ')';
  }

  function testInterpolationAt(fractions, params) {
    if (!Array.isArray(fractions)) {
      fractions = [fractions];
    }
    assertInterpolation(params, fractions.map(function(fraction) {
      return {at: fraction};
    }));
  }

  function createTestContainer(description, className) {
    var testContainer = document.createElement('div');
    testContainer.setAttribute('description', description);
    testContainer.classList.add('test');
    if (className) {
      testContainer.classList.add(className);
    }
    return testContainer;
  }

  function convertPropertyToCamelCase(property) {
    return property.replace(/^-/, '').replace(/-\w/g, function(m) {return m[1].toUpperCase();});
  }

  function describeCSSTest(params) {
    return 'CSS ' + params.property + ': from [' + params.from + '] to [' + params.to + ']';
  }

  function describeWATest(params) {
    return 'element.animate() ' + convertPropertyToCamelCase(params.property) + ': from [' + params.from + '] to [' + params.to + ']';
  }

  function assertInterpolation(params, expectations) {
    var testId = defineKeyframes(params);
    var nextCaseId = 0;
    if (webAnimationsTest) {
      var waTestContainer = createTestContainer(describeWATest(params), testId);
      waTests.appendChild(waTestContainer);
    }
    if (webAnimationsTest) {
      expectations.forEach(function(expectation) {
          waTestContainer.appendChild(makeInterpolationTest(
              'web-animations', expectation.at, testId, 'case-' + ++nextCaseId, params, expectation.is));
      });
    }
    maybeScheduleUpdate();
  }

  var nextKeyframeId = 0;
  function defineKeyframes(params) {
    var testId = 'test-' + ++nextKeyframeId;
    cssText += '@' + webkitPrefix + 'keyframes ' + testId + ' { \n' +
        '  0% { ' + params.property + ': ' + params.from + '; }\n' +
        '  100% { ' + params.property + ': ' + params.to + '; }\n' +
        '}\n';
    return testId;
  }

  function roundNumbers(value) {
    return value.
        // Round numbers to two decimal places.
        replace(/-?\d*\.\d+/g, function(n) {
          return (parseFloat(n).toFixed(2)).
              replace(/\.\d+/, function(m) {
                return m.replace(/0+$/, '');
              }).
              replace(/\.$/, '').
              replace(/^-0$/, '0');
        });
  }

  function normalizeValue(value) {
    return roundNumbers(value).
        // Place whitespace between tokens.
        replace(/([\w\d.]+|[^\s])/g, '$1 ').
        replace(/\s+/g, ' ');
  }

  function createTargetContainer(id) {
    var targetContainer = document.createElement('div');
    var template = document.querySelector('#target-template');
    if (template) {
      targetContainer.appendChild(template.content.cloneNode(true));
      // Remove whitespace text nodes at start / end.
      while (targetContainer.firstChild.nodeType != Node.ELEMENT_NODE && !/\S/.test(targetContainer.firstChild.nodeValue)) {
        targetContainer.removeChild(targetContainer.firstChild);
      }
      while (targetContainer.lastChild.nodeType != Node.ELEMENT_NODE && !/\S/.test(targetContainer.lastChild.nodeValue)) {
        targetContainer.removeChild(targetContainer.lastChild);
      }
      // If the template contains just one element, use that rather than a wrapper div.
      if (targetContainer.children.length == 1 && targetContainer.childNodes.length == 1) {
        targetContainer = targetContainer.firstChild;
        targetContainer.remove();
      }
    }
    var target = targetContainer.querySelector('.target') || targetContainer;
    target.classList.add('target');
    target.classList.add(id);
    return targetContainer;
  }

  function sanitizeUrls(value) {
    var matches = value.match(/url\([^\)]*\)/g);
    if (matches !== null) {
      for (var i = 0; i < matches.length; ++i) {
        var url = /url\(([^\)]*)\)/g.exec(matches[i])[1];
        var anchor = document.createElement('a');
        anchor.href = url;
        anchor.pathname = '...' + anchor.pathname.substring(anchor.pathname.lastIndexOf('/'));
        value = value.replace(matches[i], 'url(' + anchor.href + ')');
      }
    }
    return value;
  }

  function makeInterpolationTest(testType, fraction, testId, caseId, params, expectation) {
    var t = async_test(testId + ' ' + caseId + ', f = ' + fraction);
    console.assert(expectation === undefined || !isRefTest);
    var targetContainer = createTargetContainer(caseId);
    var target = targetContainer.querySelector('.target') || targetContainer;
    target.classList.add('active');
    var replicaContainer, replica;
    if (expectation !== undefined) {
      replicaContainer = createTargetContainer(caseId);
      replica = replicaContainer.querySelector('.target') || replicaContainer;
      replica.classList.add('replica');
      replica.style.setProperty(params.property, expectation);
    }
    target.testType = testType;
    target.getResultString = function() {
      if (!CSS.supports(params.property, expectation)) {
        return 'FAIL: [' + params.property + ': ' + expectation + '] is not supported';
      }
      var value = getComputedStyle(this).getPropertyValue(params.property);
      var originalValue = value;
      var result = '';
      var reason = '';
      var property = testType === 'css' ? params.property : convertPropertyToCamelCase(params.property);
      // FIXME: What happens if expectation === undefined?
      var parsedExpectation = getComputedStyle(replica).getPropertyValue(params.property);
      var pass = normalizeValue(value) === normalizeValue(parsedExpectation);
      result = pass ? 'PASS: ' : 'FAIL: ';
      reason = pass ? '' : ', expected [' + expectation + ']' +
          (expectation === parsedExpectation ? '' : ' (parsed as [' + sanitizeUrls(roundNumbers(parsedExpectation)) + '])');
      value = pass ? expectation : sanitizeUrls(value);
      t.step(function() {
        assert_equals(normalizeValue(originalValue), normalizeValue(parsedExpectation));
        t.done();
      });
      return result + property + ' from [' + params.from + '] to ' +
          '[' + params.to + '] was [' + value + ']' +
          ' at ' + fraction + reason;
    };
    target.convertToReference = function() {
      this.style[params.property] = getComputedStyle(this).getPropertyValue(params.property);
    };
    var easing = createEasing(fraction);
    testCount++;
    if (testType === 'css')
      return;
    var keyframes = [{}, {}];
    keyframes[0][convertPropertyToCamelCase(params.property)] = params.from;
    keyframes[1][convertPropertyToCamelCase(params.property)] = params.to;
    fragmentAttachedListeners.push(function() {
      target.animate(keyframes, {
          fill: 'forwards',
          duration: 1,
          easing: easing,
          delay: -0.5,
          iterations: 0.5,
        });
      animationEnded();
    });
    var testFragment = document.createDocumentFragment();
    testFragment.appendChild(targetContainer);
    replica && testFragment.appendChild(replicaContainer);
    testFragment.appendChild(document.createTextNode('\n'));
    return testFragment;
  }

  var finished = false;
  function finishTest() {
    finished = true;
    dumpResults();
    if (afterTestCallback) {
      afterTestCallback();
    }
    if (window.testRunner) {
      if (!isRefTest) {
        var results = document.querySelector('#results');
        document.documentElement.textContent = '';
        document.documentElement.appendChild(results);
        testRunner.dumpAsText();
      }
      testRunner.notifyDone();
    }
  }

  if (window.testRunner) {
    testRunner.waitUntilDone();
  }

  function isLastAnimationEvent() {
    return !finished && animationEventCount === testCount;
  }

  function animationEnded() {
    animationEventCount++;
    if (!isLastAnimationEvent()) {
      return;
    }
    finishTest();
  }

  if (window.internals) {
    durationSeconds = 0;
    document.documentElement.addEventListener(endEvent, animationEnded);
  } else if (webkitPrefix) {
    durationSeconds = 1e9;
    iterationCount = 1;
    delaySeconds = -durationSeconds / 2;
    document.documentElement.addEventListener(startEvent, function() {
      animationEventCount++;
      if (!isLastAnimationEvent()) {
        return;
      }
      setTimeout(finishTest, 0);
    });
  } else {
    document.documentElement.addEventListener(endEvent, animationEnded);
  }

  if (!window.testRunner) {
    setTimeout(function() {
      if (finished) {
        return;
      }
      finishTest();
    }, 10000);
  }

  function disableWebAnimationsTest() {
    if (webAnimationsTest) {
      fragment.querySelector('#web-animations-tests').remove();
      webAnimationsTest = false;
    }
  }

  window.runAsRefTest = runAsRefTest;
  window.testInterpolationAt = testInterpolationAt;
  window.assertInterpolation = assertInterpolation;
  window.convertToReference = convertToReference;
  window.afterTest = afterTest;
  window.disableWebAnimationsTest = disableWebAnimationsTest;
})();
