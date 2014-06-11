suite('animation-node', function() {
  test('normalize timing input', function() {
    assert.equal(normalizeTimingInput(1).duration, 1);
    assert.equal(normalizeTimingInput(1).easing, 'linear');
    assert.equal(normalizeTimingInput(undefined).duration, 'auto');
    assert.equal(normalizeTimingInput({easing: 'ease'}).easing, 'ease');
  });
});
