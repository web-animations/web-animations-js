suite('box-handler', function() {
  test('parse rectangle values', function() {
    assert.deepEqual(webAnimationsMinifill.parseBox(' rect(0px, 20px, 20px, 0px) '), [{px: 0}, {px: 20}, {px: 20}, {px: 0}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(0px, 20px, 20px, 0px)'), [{px: 0}, {px: 20}, {px: 20}, {px: 0}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(0px, 20px, 20px, 0)'), [{px: 0}, {px: 20}, {px: 20}, {px: 0}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(10px, 100%, 500px, 10%)'), [{px: 10}, {'%': 100}, {px: 500}, {'%': 10}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(10%, 100%, 500%, 10%)'), [{'%': 10}, {'%': 100}, {'%': 500}, {'%': 10}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(0px, calc(10px*3), 20px, 0%)'), [{px: 0}, {px: 30}, {px: 20}, {'%': 0}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(0px, 0%, 20px, calc(10px*3))'), [{px: 0}, {'%': 0}, {px: 20}, {px: 30}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(0px, 0%, 20px, calc((10px) + (3px)))'), [{px: 0}, {'%': 0}, {px: 20}, {px: 13}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(calc(10px + 5em), calc(10px + 5em), calc(10px + 5em), calc(10px + 5em))'),
      [{px: 10, em: 5}, {px: 10, em: 5}, {px: 10, em: 5}, {px: 10, em: 5}]);
  });
  test('invalid rectangles fail to parse', function() {
    assert.isUndefined(webAnimationsMinifill.parseBox('rect(0, 20, 20, 0)'));
    assert.isUndefined(webAnimationsMinifill.parseBox('rect(0px, 0px, 0px)'));
    assert.isUndefined(webAnimationsMinifill.parseBox('rect(0px, 0px, 0px, 0px, 0px)'));
    assert.isUndefined(webAnimationsMinifill.parseBox('rect()'));
    assert.isUndefined(webAnimationsMinifill.parseBox('rect(calc(10px + 5), 0px, 0px, 0px)'));
    assert.isUndefined(webAnimationsMinifill.parseBox('rect (0px, 0px, 0px, 0px)'));
    assert.isUndefined(webAnimationsMinifill.parseBox('Rect(0px, 0px, 0px, 0px)'));
  });
  // TODO: Negative values?
  test('interpolate lengths and percents in rectangles', function() {
    // Interpolate pixels
    assert.equal(
      webAnimationsMinifill.propertyInterpolation('clip', 'rect(10px, 10px, 10px, 10px)', 'rect(50px, 50px, 50px, 50px)')(0.25),
      'rect(20px, 20px, 20px, 20px)');
    // Interpolate percents
    assert.equal(
      webAnimationsMinifill.propertyInterpolation('clip', 'rect(10%, 10%, 10%, 10%)', 'rect(50%, 50%, 50%, 50%)')(0.25),
      'rect(20%, 20%, 20%, 20%)');
    // Interpolate mixed percents and pixels. Left and right units match.
    assert.equal(
      webAnimationsMinifill.propertyInterpolation('clip', 'rect(10px, 10%, 10px, 10%)', 'rect(50px, 50%, 50px, 50%)')(0.25),
      'rect(20px, 20%, 20px, 20%)');
    // Test rounding
    assert.equal(
      webAnimationsMinifill.propertyInterpolation('clip', 'rect(0px, 0px, 0px, 0px)', 'rect(0.001px, 0.001px, 0.001px, 0.001px)')(0.05),
      'rect(0px, 0px, 0px, 0px)');
    assert.equal(
      webAnimationsMinifill.propertyInterpolation('clip', 'rect(0px, 0px, 0px, 0px)', 'rect(0.001px, 0.001px, 0.001px, 0.001px)')(0.5),
      'rect(0.001px, 0.001px, 0.001px, 0.001px)');
    assert.equal(
      webAnimationsMinifill.propertyInterpolation('clip', 'rect(10px, 10px, 10px, 10px)', 'rect(20px, 20px, 20px, 20px)')(0.25),
      'rect(12.500px, 12.500px, 12.500px, 12.500px)');
    assert.equal(
      webAnimationsMinifill.propertyInterpolation('clip', 'rect(0px, 0px, 0px, 0px)', 'rect(10px, 10px, 10px, 10px)')(0.234),
      'rect(2.340px, 2.340px, 2.340px, 2.340px)');
    // Test calc interpolations in rectangles
    assert.equal(
      webAnimationsMinifill.propertyInterpolation('clip', 'rect(10px, 10%, 10px, 10%)', 'rect(10em, 10px, 10em, 10px)')(0.4),
      'rect(calc(6px + 4em), calc(6% + 4px), calc(6px + 4em), calc(6% + 4px))');
    assert.equal(
      webAnimationsMinifill.propertyInterpolation(
        'clip',
        'rect(calc(10px + 5em), calc(10px + 5em), calc(10px + 5em), calc(10px + 5em))',
        'rect(calc(20px + 35em), calc(20px + 35em), calc(20px + 35em), calc(20px + 35em))')(0.4),
      'rect(calc(14px + 17em), calc(14px + 17em), calc(14px + 17em), calc(14px + 17em))');
    assert.equal(
      webAnimationsMinifill.propertyInterpolation(
        'clip',
        'rect(calc(10px + (5em)), calc(10px + (5em)), calc(10px + (5em)), calc(10px + (5em)))',
        'rect(calc(20px + 35em), calc(20px + 35em), calc(20% + 35em), calc(20% + 35em))')(0.5),
      'rect(calc(15px + 20em), calc(15px + 20em), calc(5px + 20em + 10%), calc(5px + 20em + 10%))');
  });
});
