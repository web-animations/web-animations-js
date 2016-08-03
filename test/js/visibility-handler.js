suite('visibility-handler', function() {
  test('visibility interpolation', function() {
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'visible', 'hidden')(-1), 'visible');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'visible', 'hidden')(0), 'visible');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'visible', 'hidden')(0.9), 'visible');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'visible', 'hidden')(1), 'hidden');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'visible', 'hidden')(2), 'hidden');

    assert.equal(webAnimations1.propertyInterpolation('visibility', 'hidden', 'collapse')(-1), 'hidden');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'hidden', 'collapse')(0), 'hidden');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'hidden', 'collapse')(0.4), 'hidden');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'hidden', 'collapse')(0.6), 'collapse');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'hidden', 'collapse')(1), 'collapse');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'hidden', 'collapse')(2), 'collapse');

    assert.equal(webAnimations1.propertyInterpolation('visibility', 'collapse', 'visible')(-1), 'collapse');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'collapse', 'visible')(0), 'collapse');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'collapse', 'visible')(0.1), 'visible');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'collapse', 'visible')(1), 'visible');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'collapse', 'visible')(2), 'visible');
  });
  test('interpolation to/from initial', function() {
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'initial', 'collapse')(0.9), 'visible');
    assert.equal(webAnimations1.propertyInterpolation('visibility', 'hidden', 'initial')(0.1), 'visible');
  });
});
