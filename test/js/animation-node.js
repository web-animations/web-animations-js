suite('animation-node', function() {
  test('normalize timing input', function() {
    assert.equal(normalizeTimingInput(1).duration, 1);
    assert.equal(normalizeTimingInput(1).easing(0.2), 0.2);
    assert.equal(normalizeTimingInput(undefined).duration, 0);
  });
  test('calculating active duration', function() {
    assert.equal(calculateActiveDuration({duration: 1000, playbackRate: 4, iterations: 20}), 5000);
    assert.equal(calculateActiveDuration({duration: 500, playbackRate: 0.1, iterations: 300}), 1500000);
  });
  test('conversion of timing functions', function() {
    var f = toTimingFunction('ease');
    var g = toTimingFunction('cubic-bezier(.25, 0.1, 0.25, 1.)');
    for (var i = 0; i < 1; i += 0.1) {
      assert.equal(f(i), g(i));
    }
    assert.closeTo(f(0.1844), 0.2601, 0.01);
    assert.closeTo(g(0.1844), 0.2601, 0.01);

    f = toTimingFunction('cubic-bezier(0, 1, 1, 0)');
    assert.closeTo(f(0.104), 0.392, 0.01);

    function isLinear(f) {
      assert.equal(f(0.1), 0.1);
      assert.equal(f(0.4), 0.4);
      assert.equal(f(0.9), 0.9);
    }

    f = toTimingFunction('cubic-bezier(0, 1, -1, 1)');
    isLinear(f);

    f = toTimingFunction('an elephant');
    isLinear(f);

    f = toTimingFunction('cubic-bezier(-1, 1, 1, 1)');
    isLinear(f);

    f = toTimingFunction('cubic-bezier(1, 1, 1)');
    isLinear(f);

    f = toTimingFunction('step(10, end)');
    assert.equal(f(0), 0);
    assert.equal(f(0.09), 0);
    assert.equal(f(0.1), 0.1);
    assert.equal(f(0.25), 0.2);
  });
  test('calculating phase', function() {
    assert.equal(calculatePhase(1000, 100, {delay: 0}), PhaseActive);
    assert.equal(calculatePhase(1000, 100, {delay: 200}), PhaseBefore);
    assert.equal(calculatePhase(1000, 2000, {delay: 200}), PhaseAfter);
    assert.equal(calculatePhase(1000, null, {delay: 200}), PhaseNone);
  });
});
