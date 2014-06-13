suite('transform-interpolation', function() {
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
});

