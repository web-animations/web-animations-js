suite('transform-interpolation parsing', function() {
  test('parse skew values', function() {
    assert.deepEqual(parseTransform('skew(10deg) skew(12deg,45deg) skewX(0) skewY(1.5rad)'),
        [['skew', [{deg: 10}, {deg: 0}]],
        ['skew', [{deg: 12}, {deg: 45}]],
        ['skewx', [{deg: 0}]],
        ['skewy', [{rad: 1.5}]]]);
  });

  test('parse scale values', function() {
    assert.deepEqual(parseTransform('scale(-2) scale(3,-4) scaleX(5) scaleY(-1) scaleZ(-3)'),
        [['scale', [-2, -2]],
        ['scale', [3, -4]],
        ['scalex', [5]],
        ['scaley', [-1]],
        ['scalez', [-3]]]);
    assert.deepEqual(parseTransform('scale3d(-2, 0, 7)'),
        [['scale3d', [-2, 0, 7]]]);
  });

  test('parse rotate values', function() {
    assert.deepEqual(parseTransform('rotate(10deg) rotateX(0) rotateY(1.5rad) rotateZ(50grad)'),
        [['rotate', [{deg: 10}]],
        ['rotatex', [{deg: 0}]],
        ['rotatey', [{rad: 1.5}]],
        ['rotatez', [{grad: 50}]]]);
  });

  test('parse translate values', function() {
    assert.deepEqual(parseTransform('translate(20%, 30px) translate(30em, 40%) translate(50vw) translate(0)'),
        [['translate', [{'%': 20}, {px: 30}]],
        ['translate', [{em: 30}, {'%': 40}]],
        ['translate', [{vw: 50}, {px: 0}]],
        ['translate', [{px: 0}, {px: 0}]]]);
    assert.deepEqual(parseTransform('translateX(10px) translateX(20%) translateX(0)'),
        [['translatex', [{px: 10}]],
        ['translatex', [{'%': 20}]],
        ['translatex', [{px: 0}]]]);
    assert.deepEqual(parseTransform('translateY(10px) translateY(20%) translateY(0)'),
        [['translatey', [{px: 10}]],
        ['translatey', [{'%': 20}]],
        ['translatey', [{px: 0}]]]);
    assert.deepEqual(parseTransform('translateZ(10px) translateZ(0)'),
        [['translatez', [{px: 10}]],
        ['translatez', [{px: 0}]]]);
    assert.deepEqual(parseTransform('translate3d(10px, 20px, 30px) translate3d(0, 40%, 0) translate3d(50%, 0, 60px)'),
        [['translate3d', [{px: 10}, {px: 20}, {px: 30}]],
        ['translate3d', [{px: 0}, {'%': 40}, {px: 0}]],
        ['translate3d', [{'%': 50}, {px: 0}, {px: 60}]]]);
  });

  test('invalid transforms fail to parse', function() {
    assert.isUndefined(parseTransform('translate(10px'));
    assert.isUndefined(parseTransform('translate()'));
    assert.isUndefined(parseTransform('translatex()'));
    assert.isUndefined(parseTransform('translatex(5)'));
    assert.isUndefined(parseTransform('rotate(5)'));
    assert.isUndefined(parseTransform('skew(5)'));
    assert.isUndefined(parseTransform('scale(5px)'));
    assert.isUndefined(parseTransform('rotatex(5px)'));
  });
});

suite('transform-interpolation interpolation', function() {
  test('simple transform interpolations', function() {
    assert.equal(propertyInterpolation('transform', 'translateX(10px)', 'translateX(20px)')(0.2), 'translatex(12px)');
    assert.equal(propertyInterpolation('transform', 'rotateY(1000deg)', 'rotateY(3000deg)')(0.4), 'rotatey(1800deg)');
    assert.equal(propertyInterpolation('transform', 'scale(6)', 'scale(1,-4)')(0.2), 'scale(5,4)');
    assert.equal(propertyInterpolation('transform', 'skewX(5deg) translateY(5px)', 'skewX(-35deg) translateY(45px)')(0.25), 'skewx(-5deg) translatey(15px)');
  });

  test('transform interpolations with conversion to primitives', function() {
    assert.equal(propertyInterpolation('transform', 'translateX(10px)', 'translate(20px, 10px)')(0.2), 'translate(12px,2px)');
    assert.equal(propertyInterpolation('transform', 'translateX(10px)', 'translateY(10px)')(0.2), 'translate(8px,2px)');
    assert.equal(propertyInterpolation('transform', 'translateX(10px)', 'translateZ(10px)')(0.2), 'translate3d(8px,0px,2px)');
    assert.equal(propertyInterpolation('transform', 'scalex(6)', 'scale(1,6)')(0.2), 'scale(5,2)');
    assert.equal(propertyInterpolation('transform', 'skew(10deg)', 'skewy(30deg)')(0.2), 'skew(8deg,6deg)');
  });

  test('transform interpolations with none', function() {
    assert.equal(propertyInterpolation('transform', 'none', 'scale(5) translateX(100px) rotate(1000deg)')(0.25), 'scale(2,2) translatex(25px) rotate(250deg)');
    assert.equal(propertyInterpolation('transform', 'scale(5) translateX(100px) rotate(1000deg)', 'none')(0.75), 'scale(2,2) translatex(25px) rotate(250deg)');
    assert.equal(propertyInterpolation('transform', 'none', 'scaleX(5) skewY(100grad)')(0.25), 'scalex(2) skewy(25grad)');
    assert.equal(propertyInterpolation('transform', 'none', 'none')(0.4), 'none');
  });

  test('currently unsupported transform interpolations', function() {
    assert.equal(propertyInterpolation('transform', 'translate(10px)', 'scale(2)')(0.4), 'translate(10px)');
    assert.equal(propertyInterpolation('transform', 'rotateX(10deg)', 'rotateY(20deg)')(0.4), 'rotateX(10deg)');
  });
});
