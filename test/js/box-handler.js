suite('box-handler', function() {
  test('parse rectangle values', function() {
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(0px, 20px, 20px, 0px)'), [{px: 0}, {px: 20}, {px: 20}, {px: 0}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(0px, 20px, 20px, 0)'), [{px: 0}, {px: 20}, {px: 20}, {px: 0}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(10px, 100%, 500px, 10%)'), [{px: 10}, {'%': 100}, {px: 500}, {'%': 10}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(10%, 100%, 500%, 10%)'), [{'%': 10}, {'%': 100}, {'%': 500}, {'%': 10}]);
    assert.deepEqual(webAnimationsMinifill.parseBox('rect(0px, calc(10px*3), 20px, 0%)'), [{px: 0}, {px: 30}, {px: 20}, {'%': 0}]);
    assert.deepEqual(webAnimationsMinifill.parseBox(' rect(0px, 20px, 20px, 0px) '), [{px: 0}, {px: 20}, {px: 20}, {px: 0}]);
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
  // test('interpolate lengths and percents', function() {
  //   assert.equal(webAnimationsMinifill.propertyInterpolation('left', '10px', '50px')(0.25), '20px');
  //   assert.equal(webAnimationsMinifill.propertyInterpolation('left', '10%', '50%')(0.25), '20%');
  //   assert.equal(webAnimationsMinifill.propertyInterpolation('left', '0px', '0.001px')(0.05), '0px');
  //   assert.equal(webAnimationsMinifill.propertyInterpolation('left', '0px', '10px')(0.234), '2.340px');
  //   assert.equal(webAnimationsMinifill.propertyInterpolation('left', '10px', '10em')(0.4), 'calc(6px + 4em)');
  //   assert.equal(webAnimationsMinifill.propertyInterpolation('left', '10px', '10%')(0.4), 'calc(6px + 4%)');
  //   assert.equal(webAnimationsMinifill.propertyInterpolation('left', 'calc(10px + 5em)', 'calc(20px + 35em)')(0.4), 'calc(14px + 17em)');
  //   assert.equal(webAnimationsMinifill.propertyInterpolation('left', 'calc(10px + 5em)', 'calc(20% + 35em)')(0.4), 'calc(6px + 17em + 8%)');
  //   assert.equal(webAnimationsMinifill.propertyInterpolation('left', 'calc(10px + 5vw)', 'calc(20% + 35em)')(0.4), 'calc(6px + 3vw + 8% + 14em)');
  // });
});