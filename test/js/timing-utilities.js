suite('timing-utilities', function() {
  test('normalize timing input', function() {
    assert.equal(normalizeTimingInput(1).duration, 1);
    assert.equal(normalizeTimingInput(1)._easingFunction(0.2), 0.2);
    assert.equal(normalizeTimingInput(undefined).duration, 0);
  });
  test('calculating active duration', function() {
    assert.equal(calculateActiveDuration({duration: 1000, playbackRate: 4, iterations: 20}), 5000);
    assert.equal(calculateActiveDuration({duration: 500, playbackRate: 0.1, iterations: 300}), 1500000);
  });

  function convertEasing(easing) {
    return parseEasingFunction(normalizeEasing(easing));
  }

  test('conversion of timing functions', function() {
    function assertTimingFunctionsEqual(tf1, tf2, message) {
      for (var i = 0; i <= 1; i += 0.1) {
        assert.closeTo(tf1(i), tf2(i), 0.01, message);
      }
    }

    assertTimingFunctionsEqual(
        convertEasing('ease-in-out'),
        convertEasing('eAse\\2d iN-ouT'),
        'Should accept arbitrary casing and escape chararcters');

    var f = convertEasing('ease');
    var g = convertEasing('cubic-bezier(.25, 0.1, 0.25, 1.0)');
    assertTimingFunctionsEqual(f, g, 'ease should map onto preset cubic-bezier');
    assert.closeTo(f(0.1844), 0.2599, 0.001);
    assert.closeTo(g(0.1844), 0.2599, 0.001);
    assert.equal(f(0), 0);
    assert.equal(f(1), 1);
    assert.equal(g(0), 0);
    assert.equal(g(1), 1);

    f = convertEasing('cubic-bezier(0, 1, 1, 0)');
    assert.closeTo(f(0.104), 0.3920, 0.001);

    function assertInvalidEasingThrows(easing) {
      assert.throws(function() {
        convertEasing(easing);
      }, easing);
    }

    assertInvalidEasingThrows('cubic-bezier(.25, 0.1, 0.25, 1.)');
    assertInvalidEasingThrows('cubic-bezier(0, 1, -1, 1)');
    assertInvalidEasingThrows('an elephant');
    assertInvalidEasingThrows('cubic-bezier(-1, 1, 1, 1)');
    assertInvalidEasingThrows('cubic-bezier(1, 1, 1)');

    f = convertEasing('steps(10, end)');
    assert.equal(f(0), 0);
    assert.equal(f(0.09), 0);
    assert.equal(f(0.1), 0.1);
    assert.equal(f(0.25), 0.2);
  });
  test('EffectTime', function() {
    var timing = normalizeTimingInput({duration: 1000, iterations: 4, iterationStart: 0.5, easing: 'linear', direction: 'alternate', delay: 100, fill: 'forwards'});
    var timing2 = normalizeTimingInput({duration: 1000, iterations: 4, iterationStart: 0.5, easing: 'ease', direction: 'alternate', delay: 100, fill: 'forwards'});
    var effectTF = effectTime(timing);
    var effectTF2 = effectTime(timing2);
    var epsilon = 0.005;
    assert.equal(effectTF(0), null);
    assert.equal(effectTF(100), 0.5);
    assert.closeTo(effectTF2(100), 0.8, epsilon);
    assert.equal(effectTF(600), 1);
    assert.closeTo(effectTF2(600), 1, epsilon);
    assert.closeTo(effectTF(700), 0.9, epsilon);
    assert.closeTo(effectTF2(700), 0.99, epsilon);
    assert.equal(effectTF(1600), 0);
    assert.closeTo(effectTF2(1600), 0, epsilon);
    assert.closeTo(effectTF(4000), 0.4, epsilon);
    assert.closeTo(effectTF2(4000), 0.68, epsilon);
    assert.equal(effectTF(4100), 0.5);
    assert.closeTo(effectTF2(4100), 0.8, epsilon);
    assert.equal(effectTF(6000), 0.5);
    assert.closeTo(effectTF2(6000), 0.8, epsilon);
  });
  test('TypeErrors', function() {
    var timing = normalizeTimingInput({
      iterationStart: 123,
      iterations: 456,
      duration: 789,
      easing: 'ease',
    });

    assert.throws(function() { timing.iterationStart = -1; });
    assert.throws(function() { timing.iterationStart = 'ponies'; });
    assert.equal(timing.iterationStart, 123);

    assert.throws(function() { timing.iterations = -1; });
    assert.throws(function() { timing.iterations = 'pidgeons'; });
    assert.equal(timing.iterations, 456);

    assert.throws(function() { timing.duration = -1; });
    assert.throws(function() { timing.duration = 'pawprints'; });
    assert.equal(timing.duration, 789);

    assert.throws(function() { timing.easing = 'invalid timing function'; });
    assert.equal(timing.easing, 'ease');
  });
});
