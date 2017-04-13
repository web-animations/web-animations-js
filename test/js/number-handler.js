suite('number-handler', function() {
  test('parse numbers', function() {
    var tests = {
      '0': 0,
      '1234': 1234,
      '-40': -40,
      '+40': 40,
      '   -40   ': -40,
      '4.0': 4,
      '0.4': 0.4,
      '.1234': 0.1234,
      '12.34': 12.34,
      '+.1234': 0.1234,
      '+12.34': 12.34,
      '-.1234': -0.1234,
      '-12.34': -12.34,
    };
    for (var string in tests) {
      assert.equal(webAnimations1.parseNumber(string), tests[string], 'Parsing "' + string + '"');
    }
  });
  test('number list interpolation', function() {
    assert.equal(webAnimations1.propertyInterpolation('strokeDasharray', '10', '20')(0.25), '12.5');
    assert.equal(webAnimations1.propertyInterpolation('strokeDasharray', '10 100', '20 200')(0.25), '12.5 125');
    assert.equal(webAnimations1.propertyInterpolation('strokeDasharray', '10, 100', '20, 200')(0.25), '12.5 125');
    assert.equal(webAnimations1.propertyInterpolation('strokeDasharray', '10,100', '20 200')(0.25), '12.5 125');
  });
  test('invalid numbers fail to parse', function() {
    assert.isUndefined(webAnimations1.parseNumber(''));
    assert.isUndefined(webAnimations1.parseNumber('nine'));
    assert.isUndefined(webAnimations1.parseNumber('1 2'));
    assert.isUndefined(webAnimations1.parseNumber('+-0'));
    assert.isUndefined(webAnimations1.parseNumber('50px'));
    assert.isUndefined(webAnimations1.parseNumber('1.2.3'));
    assert.isUndefined(webAnimations1.parseNumberList('10,,20'));
  });
  test('opacity clamping', function() {
    var interpolation = webAnimations1.propertyInterpolation('opacity', '0', '1');
    assert.equal(interpolation(-1), '0');
    assert.equal(interpolation(2), '1');
  });
});
