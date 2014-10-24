suite('matrix interpolation', function() {
  function compareMatrices(actual, expected, expectedLength) {
    var actualElements = actual.slice(
        actual.indexOf('(') + 1, actual.lastIndexOf(')')).split(',');
    assert.equal(actualElements.length, expectedLength);
    for (var i = 0; i < expectedLength; i++)
      assert.closeTo(Number(actualElements[i]), expected[i], 0.01);
  }

  function compareInterpolatedTransforms(actual, expected, timeFraction) {
    var actualInterp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        actual[0],
        actual[1]);
    var expectedInterp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        expected[0],
        expected[1]);
    var evaluatedActualInterp = actualInterp(timeFraction);
    var evaluatedExpectedInterp = expectedInterp(timeFraction);
    var actualElements = evaluatedActualInterp.slice(
    		evaluatedActualInterp.indexOf('(') + 1,
    		evaluatedActualInterp.lastIndexOf(')')
    		).split(',');
    var expectedElements = evaluatedExpectedInterp.slice(
        evaluatedExpectedInterp.indexOf('(') + 1,
        evaluatedExpectedInterp.lastIndexOf(')')
        ).split(',');
    console.log(actualElements);
    console.log(expectedElements);
    assert.equal(actualElements.length, expectedElements.length);
    for (var i = 0; i < expectedElements.length; i++)
      assert.closeTo(Number(actualElements[i]), Number(expectedElements[i]), 0.01);
  }

  test('transform interpolations with matrices only', function() {
    var interpolatedMatrix = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)',
        'matrix(1, -0.2, 0, 1, 0, 0)');
    var evaluatedInterp = interpolatedMatrix(0.5);
    compareMatrices(evaluatedInterp, [1, -0.1, 0, 1, 0, 0], 6);

    interpolatedMatrix = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)',
        'matrix3d(1, 1, 0, 0, -2, 1, 0, 0, 0, 0, 1, 0, 10, 10, 0, 1)');
    evaluatedInterp = interpolatedMatrix(0.5);
    compareMatrices(evaluatedInterp, [1.12, 0.46, -0.84, 1.34, 5, 5], 6);

    interpolatedMatrix = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)',
        'matrix3d(1, 1, 3, 0, -2, 1, 0, 0, 0, 0, 1, 0, 10, 10, 0, 1)');
    evaluatedInterp = interpolatedMatrix(0.5);
    // FIXME: Values at 8, 9, 10 are different from Blink and FireFox, which give 0.31, 0.04, 1.01.
    // Result looks the same.
    compareMatrices(
        evaluatedInterp,
        [1.73, 0.67, 1.10, 0, -0.85, 1.34, 0.29, 0, -0.35, -0.22, 0.58, 0, 5, 5, 0, 1],
        16);

    interpolatedMatrix = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)',
        'matrix3d(1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 10, 10, 1)');
    evaluatedInterp = interpolatedMatrix(0.5);
    compareMatrices(
        evaluatedInterp,
        [1.38, 0.85, 0, 0, 0.24, 1.00, 0, 0, 0, 0, 1, 0, 0, 5, 5, 1],
        16);

    interpolatedMatrix = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)',
        'matrix3d(1, 1, 0, 0, -2, 1, 0, 0, 0, 0, 1, 0, 10, 10, 0, 1)');
    evaluatedInterp = interpolatedMatrix(0.5);
    compareMatrices(evaluatedInterp, [1.12, 0.46, -0.84, 1.34, 5, 5], 6);

    // Test matrices with [3][3] != 1
    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'matrix(1, 0, 0, 1, 0, 0)',
        'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2)');
    evaluatedInterp = interp(0.4);
    compareMatrices(
        evaluatedInterp,
        [1, 0, 0, 1, 0, 0],
        6);
    evaluatedInterp = interp(0.6);
    compareMatrices(
        evaluatedInterp,
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
        16);
  });

  test('transform interpolations with matrices and other functions', function() {
    var interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'translate(100px) matrix(1, 0, 0, 1, 0, 0)',
        'translate(10px) matrix(1, -0.2, 0, 1, 0, 0)');
    var evaluatedInterp = interp(0.5);
    var functions = evaluatedInterp.split(' ');
    assert.equal(functions.length, 2);
    assert.equal(functions[0], 'translate(55px,0px)');
    compareMatrices(functions[1], [1, -0.1, 0, 1, 0, 0], 6);

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'translate(100px) matrix(1, 0, 0, 1, 0, 0) rotate(10deg)',
        'translate(10px) matrix(1, -0.2, 0, 1, 0, 0) rotate(100deg)');
    evaluatedInterp = interp(0.5);
    functions = evaluatedInterp.split(' ');
    assert.equal(functions.length, 3);
    assert.equal(functions[0], 'translate(55px,0px)');
    compareMatrices(functions[1], [1, -0.1, 0, 1, 0, 0], 6);
    assert.equal(functions[2], 'rotate(55deg)');

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'translate(100px) matrix(1, 0, 0, 1, 0, 0) rotate(10deg)',
        'translate(10px) matrix3d(1, 2, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 10, 10, 1) rotate(100deg)');
    evaluatedInterp = interp(0.5);
    functions = evaluatedInterp.split(' ');
    assert.equal(functions.length, 3);
    assert.equal(functions[0], 'translate(55px,0px)');
    compareMatrices(
        functions[1],
        [1.38, 0.85, 0, 0, 0.24, 1.00, 0, 0, 0, 0, 1, 0, 0, 5, 5, 1],
        16);
    assert.equal(functions[2], 'rotate(55deg)');

    // Contains matrices and requires matrix decomposition.
    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'matrix(1, 0, 0, 1, 0, 0) translate(100px)',
        'translate(10px) matrix(1, -0.2, 0, 1, 0, 0)');
    evaluatedInterp = interp(0.5);
    compareMatrices(evaluatedInterp, [1, -0.1, 0, 1, 55, 0], 6);

    // Test matrices with [3][3] != 1
    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'translate(100px) matrix(1, 0, 0, 1, 0, 0) rotate(10deg)',
        'translate(10px) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2) rotate(100deg)');
    evaluatedInterp = interp(0.4);
    functions = evaluatedInterp.split(' ');
    assert.equal(functions.length, 3);
    assert.equal(functions[0], 'translate(64px,0px)');
    compareMatrices(
        functions[1],
        [1, 0, 0, 1, 0, 0],
        6);
    assert.equal(functions[2], 'rotate(46deg)');
    evaluatedInterp = interp(0.6);
    functions = evaluatedInterp.split(' ');
    assert.equal(functions.length, 3);
    assert.equal(functions[0], 'translate(46px,0px)');
    compareMatrices(
        functions[1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
        16);
    assert.equal(functions[2], 'rotate(64deg)');

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'translate(10px) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2) rotate(100deg)',
        'translate(100px) matrix(1, 0, 0, 1, 0, 0) rotate(10deg)');
    evaluatedInterp = interp(0.4);
    functions = evaluatedInterp.split(' ');
    assert.equal(functions.length, 3);
    assert.equal(functions[0], 'translate(46px,0px)');
    compareMatrices(
        functions[1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2],
        16);
    assert.equal(functions[2], 'rotate(64deg)');
    evaluatedInterp = interp(0.6);
    functions = evaluatedInterp.split(' ');
    assert.equal(functions.length, 3);
    assert.equal(functions[0], 'translate(64px,0px)');
    compareMatrices(
        functions[1],
        [1, 0, 0, 1, 0, 0],
        6);
    assert.equal(functions[2], 'rotate(46deg)');
  });

  test('transform interpolations that require matrix decomposition', function() {
    var interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'translate(10px)',
        'scale(2)');
    var evaluatedInterp = interp(0.4);
    compareMatrices(evaluatedInterp, [1.4, 0, 0, 1.4, 6, 0], 6);

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'rotateX(10deg)',
        'rotateY(20deg)');
    evaluatedInterp = interp(0.4);
    compareMatrices(
        evaluatedInterp,
        [0.99, 0.01, -0.14, 0, 0.01, 1.00, 0.10, 0, 0.14, -0.10, 0.98, 0, 0, 0, 0, 1],
        16);

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'rotate(0rad) translate(0px)',
        'translate(800px) rotate(9rad)');
    evaluatedInterp = interp(0.4);
    compareMatrices(evaluatedInterp, [0.47, 0.89, -0.89, 0.47, 320, 0], 6);

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'rotateX(10deg)',
        'translate(10px) rotateX(200deg)');
    evaluatedInterp = interp(0.4);
    compareMatrices(
        evaluatedInterp,
        [1, 0, 0, 0, 0, 0.53, -0.85, 0, 0, 0.85, 0.53, 0, 4, 0, 0, 1],
        16);

    // This case agrees with FireFox and the spec, but not with the old polyfill or Blink. The old
    // polyfill only does matrix decomposition on the rotate section of the function
    // lists.
    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'translate(0px)',
        'translate(800px) rotate(9rad)');
    evaluatedInterp = interp(0.4);
    compareMatrices(evaluatedInterp, [0.47, 0.89, -0.89, 0.47, 320, 0], 6);

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'translate(0px, 0px) rotate(0deg) scale(1)',
        'translate(900px, 190px) scale(3) rotate(9rad)');
    evaluatedInterp = interp(0.4);
    compareMatrices(evaluatedInterp, [0.84, 1.59, -1.59, 0.84, 360, 76], 6);

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'perspective(1000px)',
        'perspective(200px)');
    evaluatedInterp = interp(0.2);
    compareMatrices(evaluatedInterp, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -0.0018, 0, 0, 0, 1], 16);
  });

	// rotatex, rotatey, rotate, rotatez, rotate3d, scale, scalex, scaley, scalez, scale3d, skew,
	// skewx, skewy, translate, translate3d, perspective, matrix, matrix3d
  test('decompose various CSS properties', function() {
    var interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'rotateX(110deg)',
        'rotateX(10deg) matrix(1, 0, 0, 1, 0, 0)');
    var evaluatedInterp = interp(0.5);
    compareMatrices(evaluatedInterp, [1, 0, 0, 0, 0, 0.500, 0.866, 0, 0, -0.866, 0.500, 0, 0, 0, 0, 1], 16);

    // FIXME: This test case differs from blink transitions which gives -1(this)
    // This case agrees with FireFox transitions.
    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'rotateY(10rad)',
        'rotateY(2rad) matrix(1, 0, 0, 1, 0, 0)');
    evaluatedInterp = interp(0.5);
    compareMatrices(evaluatedInterp, [0.960, 0, 0.279, 0, 0, 1, 0, 0, -0.279, 0, 0.960, 0, 0, 0, 0, 1], 16);

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'rotate(320deg)',
        'rotate(10deg) matrix(1, 0, 0, 1, 0, 0)');
    evaluatedInterp = interp(0.5);
    compareMatrices(evaluatedInterp, [0.966, -0.259, 0.259, 0.966, 0, 0], 6);

    // FIXME: This test case differs from blink transitions which gives -1(this)
    // This case agrees with FireFox transitions.
    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'rotateZ(10rad)',
        'rotateZ(2rad) matrix(1, 0, 0, 1, 0, 0)');
    evaluatedInterp = interp(0.5);
    compareMatrices(evaluatedInterp, [0.960, -0.279, 0.279, 0.960, 0, 0], 6);

    // FIXME: This test case differs from blink transitions
    // which gives matrix3d(-0.24, +0.91, +0.33, +0, +0.33, -0.24, +0.91, +0, +0.91, +0.33, -0.24, +0, +0, +0, +0, +1)
    // versus our  matrix3d(+0.91, -0.24, +0.33, +0, +0.33, +0.91, -0.24, +0, -0.24, +0.33, +0.91, +0, +0, +0, +0, +1)
    // This case agrees with FireFox transitions.
    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'rotate3d(1, 1, 1, 100deg)',
        'rotate3d(1, 1, 1, 200deg) matrix(1, 0, 0, 1, 0, 0)');
    evaluatedInterp = interp(0.5);
    console.log(evaluatedInterp);
    compareMatrices(evaluatedInterp, [0.911, -0.244, 0.333, 0, 0.333, 0.911, -0.244, 0, -0.244, 0.333, 0.911, 0, 0, 0, 0, 1], 16);

    interp = webAnimationsMinifill.propertyInterpolation(
        'transform',
        'skew(30deg)',
        'skew(0deg) matrix(1, 0, 0, 1, 0, 0)');
    evaluatedInterp = interp(0.5);
    compareMatrices(evaluatedInterp, [1, 0, 0.289, 1, 0, 0], 6);
  });

	// rotatex, rotatey, rotate, rotatez, rotate3d, scale, scalex, scaley, scalez, scale3d, skew,
	// skewx, skewy, translate, translate3d, perspective, matrix, matrix3d
  test('decompose various CSS properties with unsupported units', function() {
		compareInterpolatedTransforms(
				['rotateX(110grad)', 'rotateX(10deg) matrix(1, 0, 0, 1, 0, 0)'],
				['rotateX(0deg)', 'rotateX(10deg) matrix(1, 0, 0, 1, 0, 0)'],
				0.5);

		compareInterpolatedTransforms(
				['rotateY(10grad)', 'rotateY(2rad) matrix(1, 0, 0, 1, 0, 0)'],
				['rotateY(0rad)', 'rotateY(2rad) matrix(1, 0, 0, 1, 0, 0)'],
				0.5);

		compareInterpolatedTransforms(
				['rotate(320deg)', 'rotateY(10grad) matrix(1, 0, 0, 1, 0, 0)'],
				['rotate(320deg)', 'rotateY(0deg) matrix(1, 0, 0, 1, 0, 0)'],
				0.5);

		compareInterpolatedTransforms(
				['rotateZ(10grad)', 'rotateZ(2rad) matrix(1, 0, 0, 1, 0, 0)'],
				['rotateZ(0rad)', 'rotateZ(2rad) matrix(1, 0, 0, 1, 0, 0)'],
				0.5);

		compareInterpolatedTransforms(
				['rotate3d(1, 1, 1, 100deg)', 'rotate3d(1, 1, 1, 200grad) matrix(1, 0, 0, 1, 0, 0)'],
				['rotate3d(1, 1, 1, 100deg)', 'rotate3d(1, 1, 1, 0deg) matrix(1, 0, 0, 1, 0, 0)'],
				0.5);

		compareInterpolatedTransforms(
				['skew(30grad)', 'skew(10deg) matrix(1, 0, 0, 1, 0, 0)'],
				['skew(0deg)', 'skew(10deg) matrix(1, 0, 0, 1, 0, 0)'],
				0.5);
  });

  test('transform interpolations involving matrices when matrix code is not available', function() {
    // FIXME: This is vulnerable to module interface changes. Can we disable modules?
    var composeMatrix = webAnimationsMinifill.composeMatrix;
    var quat = webAnimationsMinifill.quat;
    var dot = webAnimationsMinifill.dot;
    var makeMatrixDecomposition = webAnimationsMinifill.makeMatrixDecomposition;
    webAnimationsMinifill.composeMatrix = undefined;
    webAnimationsMinifill.quat = undefined;
    webAnimationsMinifill.dot = undefined;
    webAnimationsMinifill.makeMatrixDecomposition = undefined;

    var testFlipTransformLists = function(keyframeFrom, keyframeTo) {
      var interp = webAnimationsMinifill.propertyInterpolation(
          'transform',
          keyframeFrom,
          keyframeTo);
      var evaluatedInterp = interp(0.49);
      assert.equal(evaluatedInterp, keyframeFrom);
      evaluatedInterp = interp(0.51);
      assert.equal(evaluatedInterp, keyframeTo);
    };

    try {
      // Function lists with just matrices.
      testFlipTransformLists('matrix(1, 0, 0, 1, 0, 0)', 'matrix(1, -0.2, 0, 1, 0, 0)');
      // Function lists with matrices and other functions.
      testFlipTransformLists(
          'translate(100px) matrix(1, 0, 0, 1, 0, 0) rotate(10deg)',
          'translate(10px) matrix(1, -0.2, 0, 1, 0, 0) rotate(100deg)');
      // Function lists that require matrix decomposition to be interpolated.
      testFlipTransformLists('translate(10px)', 'scale(2)');
      testFlipTransformLists('scale(2)', 'translate(10px)');
      testFlipTransformLists('rotateX(10deg)', 'rotateY(20deg)');
      testFlipTransformLists('rotateX(10deg)', 'translate(10px) rotateX(200deg)');
      testFlipTransformLists(
          'rotate(0rad) translate(0px)',
          'translate(800px) rotate(9rad)');
      testFlipTransformLists(
          'translate(0px, 0px) rotate(0deg) scale(1)',
          'scale(3) translate(300px, 90px) rotate(9rad)');
      testFlipTransformLists(
          'translate(0px, 0px) skew(30deg)',
          'skew(0deg) translate(300px, 90px)');
      testFlipTransformLists(
          'matrix(1, 0, 0, 1, 0, 0) translate(100px)',
          'translate(10px) matrix(1, -0.2, 0, 1, 0, 0)');
    } finally {
      webAnimationsMinifill.composeMatrix = composeMatrix;
      webAnimationsMinifill.quat = quat;
      webAnimationsMinifill.dot = dot;
      webAnimationsMinifill.makeMatrixDecomposition = makeMatrixDecomposition;
    }
  });
});