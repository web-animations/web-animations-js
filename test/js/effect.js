suite('effect', function() {
  setup(function() {
    // var keyframes = [{left: '0px'}, {left: '100px'}];
    // this.effect = convertEffectInput(keyframes);
    this.element = document.createElement('div');
  });

  // Test normalize.
  test('Normalize keyframes with all offsets specified but not sorted by offset.',
    function() {
      var normalizedKeyframes;
      assert.doesNotThrow(function() {
        normalizedKeyframes = normalize(
          [
          {offset: 0},
          {offset: -1},
          {offset: 1},
          {offset: 0.5},
          {offset: 2}
          ]);
      });
      assert.equal(normalizedKeyframes.length, 3);
      assert.closeTo(normalizedKeyframes[0].offset, 0, 0.001);
      assert.closeTo(normalizedKeyframes[1].offset, 0.5, 0.001);
      assert.closeTo(normalizedKeyframes[2].offset, 1, 0.001);
    });

  test('Normalize keyframes with some offsets not specified, and not sorted by offset.',
    function() {
      assert.throws(function() {
        normalize(
          [
          {offset: 0.5},
          {offset: 0},
          {offset: 0.8},
          {},
          {offset: 1}
          ]);
      });
    });

  test('Normalize keyframes with some offsets not specified, and not sorted by offset. Out of order keyframes are out of [0, 1] range.',
    function() {
      assert.throws(function() {
        normalize(
          [
          {offset: 0},
          {offset: -1},
          {offset: 0.5},
          {},
          {offset: 1}
          ]);
      });
    });

  test('Normalize keyframes with some offsets not specified, but sorted by offset where specified. Some offsets are out of [0, 1] range.',
    function() {
      var normalizedKeyframes;
      assert.doesNotThrow(function() {
        normalizedKeyframes = normalize(
          [
          {offset: -1},
          {offset: 0},
          {offset: 0.5},
          {},
          {},
          {offset: 2}
          ]);
      });
      assert.equal(normalizedKeyframes.length, 4);
      assert.closeTo(normalizedKeyframes[0].offset, 0, 0.001);
      assert.closeTo(normalizedKeyframes[1].offset, 0.5, 0.001);
      assert.closeTo(normalizedKeyframes[2].offset, 0.75, 0.001);
      assert.closeTo(normalizedKeyframes[3].offset, 1, 0.001);
    });

  test('Normalize keyframes where a keyframe has an offset that is not a number.',
    function() {
      assert.throws(function() {
        normalize(
          [
          {offset: 0},
          {offset: 'one'},
          {offset: 1}
          ]);
      });
    });

  test('Normalize keyframes where a keyframe has an offset that is a numeric string.',
    function() {
      var normalizedKeyframes;
      assert.doesNotThrow(function() {
        normalizedKeyframes = normalize(
          [
          {offset: 0},
          {offset: '0.5'},
          {offset: 1}
          ]);
      });
      assert.equal(normalizedKeyframes.length, 3);
      assert.closeTo(normalizedKeyframes[0].offset, 0, 0.001);
      assert.closeTo(normalizedKeyframes[1].offset, 0.5, 0.001);
      assert.closeTo(normalizedKeyframes[2].offset, 1, 0.001);
    });

  test('Normalize keyframes with no offsets specified.',
    function() {
      var normalizedKeyframes;
      assert.doesNotThrow(function() {
        normalizedKeyframes = normalize(
          [
          {left: '0px'},
          {left: '10px'},
          {left: '20px'},
          {left: '30px'},
          {left: '40px'}
          ]);
      });
      assert.equal(normalizedKeyframes.length, 5);
      assert.closeTo(normalizedKeyframes[0].offset, 0, 0.001);
      assert.equal(normalizedKeyframes[0].left, '0px');
      assert.closeTo(normalizedKeyframes[1].offset, 0.25, 0.001);
      assert.equal(normalizedKeyframes[1].left, '10px');
      assert.closeTo(normalizedKeyframes[2].offset, 0.5, 0.001);
      assert.equal(normalizedKeyframes[2].left, '20px');
      assert.closeTo(normalizedKeyframes[3].offset, 0.75, 0.001);
      assert.equal(normalizedKeyframes[3].left, '30px');
      assert.closeTo(normalizedKeyframes[4].offset, 1, 0.001);
      assert.equal(normalizedKeyframes[4].left, '40px');
    });

  test('Normalize keyframes with some offsets not specified, but sorted by offset where specified. All specified offsets in [0, 1] range.',
    function() {
      var normalizedKeyframes;
      assert.doesNotThrow(function() {
        normalizedKeyframes = normalize(
          [
          {left: '0px', offset: 0},
          {left: '10px'},
          {left: '20px'},
          {left: '30px', offset: 0.6},
          {left: '40px'},
          {left: '50px'}
          ]);
      });
      assert.equal(normalizedKeyframes.length, 6);
      assert.closeTo(normalizedKeyframes[0].offset, 0, 0.001);
      assert.equal(normalizedKeyframes[0].left, '0px');
      assert.closeTo(normalizedKeyframes[1].offset, 0.2, 0.001);
      assert.equal(normalizedKeyframes[1].left, '10px');
      assert.closeTo(normalizedKeyframes[2].offset, 0.4, 0.001);
      assert.equal(normalizedKeyframes[2].left, '20px');
      assert.closeTo(normalizedKeyframes[3].offset, 0.6, 0.001);
      assert.equal(normalizedKeyframes[3].left, '30px');
      assert.closeTo(normalizedKeyframes[4].offset, 0.8, 0.001);
      assert.equal(normalizedKeyframes[4].left, '40px');
      assert.closeTo(normalizedKeyframes[5].offset, 1, 0.001);
      assert.equal(normalizedKeyframes[5].left, '50px');
    });

  test('Normalize keyframes where some properties are given non-string, non-number values.',
    function() {
      var normalizedKeyframes;
      assert.doesNotThrow(function() {
        normalizedKeyframes = normalize(
          [
          {left: {}},
          {left: '100px'},
          {left: []}
          ]);
      });
      assert(normalizedKeyframes.length, 3);
      assert.equal(normalizedKeyframes[0].left, '[object Object]');
      assert.equal(normalizedKeyframes[1].left, '100px');
      assert.equal(normalizedKeyframes[2].left, '');
    });

  test('Normalize input that is not an array.',
    function() {
      assert.throws(function() {
        normalize(10);
      });
    });

  test('Normalize an empty array.',
    function() {
      assert.doesNotThrow(function() {
        normalize([]);
      });
    });

  test('Normalize null.',
    function() {
      assert.doesNotThrow(function() {
        normalize(null);
      });
    });

  // Test makePropertySpecificKeyframeGroups.
  test('Make property specific keyframe groups for a simple effect with one property.',
    function() {
      var groups;
      assert.doesNotThrow(function() {
        groups = makePropertySpecificKeyframeGroups(normalize(
          [
          {left: '0px'},
          {left: '200px', offset: 0.3},
          {left: '0px'}
          ])
        );
      });
      assert.equal(Object.getOwnPropertyNames(groups).length, 1);
      assert.equal(groups.left.length, 3);
      assert.closeTo(groups.left[0].offset, 0, 0.001);
      assert.equal(groups.left[0].value, '0px');
      assert.closeTo(groups.left[1].offset, 0.3, 0.001);
      assert.equal(groups.left[1].value, '200px');
      assert.closeTo(groups.left[2].offset, 1, 0.001);
      assert.equal(groups.left[2].value, '0px');
    });

  test('Make property specific keyframe groups for an effect with three properties.',
    function() {
      var groups;
      assert.doesNotThrow(function() {
        groups = makePropertySpecificKeyframeGroups(normalize(
          [
          {left: '0px', top: '200px', opacity: 1},
          {left: '200px', top: "0px"},
          {left: "0px", top: "200px", opacity: 0},
          {top: "0px", opacity: 1},
          {left: "200px", top: '200px', opacity: 0}
          ])
        );
      });
      assert.equal(Object.getOwnPropertyNames(groups).length, 3);

      assert.equal(groups.left.length, 4);
      assert.closeTo(groups.left[0].offset, 0, 0.001);
      assert.equal(groups.left[0].value, '0px');
      assert.closeTo(groups.left[1].offset, 0.25, 0.001);
      assert.equal(groups.left[1].value, '200px');
      assert.closeTo(groups.left[2].offset, 0.5, 0.001);
      assert.equal(groups.left[2].value, '0px');
      assert.closeTo(groups.left[3].offset, 1, 0.001);
      assert.equal(groups.left[3].value, '200px');

      assert.equal(groups.top.length, 5);
      assert.closeTo(groups.top[0].offset, 0, 0.001);
      assert.equal(groups.top[0].value, '200px');
      assert.closeTo(groups.top[1].offset, 0.25, 0.001);
      assert.equal(groups.top[1].value, '0px');
      assert.closeTo(groups.top[2].offset, 0.5, 0.001);
      assert.equal(groups.top[2].value, '200px');
      assert.closeTo(groups.top[3].offset, 0.75, 0.001);
      assert.equal(groups.top[3].value, '0px');
      assert.closeTo(groups.top[4].offset, 1, 0.001);
      assert.equal(groups.top[4].value, '200px');

      assert.equal(groups.opacity.length, 4);
      assert.closeTo(groups.opacity[0].offset, 0, 0.001);
      assert.equal(groups.opacity[0].value, 1);
      assert.closeTo(groups.opacity[1].offset, 0.5, 0.001);
      assert.equal(groups.opacity[1].value, 0);
      assert.closeTo(groups.opacity[2].offset, 0.75, 0.001);
      assert.equal(groups.opacity[2].value, 1);
      assert.closeTo(groups.opacity[3].offset, 1, 0.001);
      assert.equal(groups.opacity[3].value, 0);
    });

  test('Make property specific keyframes when the offset of the last keyframe is specified but not equal to 1.',
    function() {
      assert.throws(function() {
        makePropertySpecificKeyframeGroups(normalize(
          [
          {left: '0px', offset: 0},
          {left: '20px'},
          {left: '30px', offset: 0.9}
          ])
        );
      });
    });

  test('Make property specific keyframes when no properties are animated, and the offset of the last keyframe is specified but not equal to 1.',
    function() {
      var groups;
      assert.doesNotThrow(function() {
        groups = makePropertySpecificKeyframeGroups(normalize(
          [
          {offset: 0},
          {},
          {offset: 0.9}
          ])
        );
      });
      assert.equal(Object.getOwnPropertyNames(groups).length, 0);
    });

  test('Make property specific keyframes when a property appears in some keyframes, but not in the last keyframe.',
    function() {
      assert.throws(function() {
        makePropertySpecificKeyframeGroups(normalize(
          [
          {left: '0px', top: '0px'},
          {left: '10px', top: '10px'},
          {top: '20px'}
          ])
        );
      });
    });

  test('Make property specific keyframes when a property appears in some keyframes, but not in the first keyframe.',
    function() {
      assert.throws(function() {
        makePropertySpecificKeyframeGroups(normalize(
          [
          {left: '0px'},
          {left: '10px', top: '10px'},
          {left: '20px', top: '20px'}
          ])
        );
      });
    });

  test('Make property specific keyframes where two properties are animated. One property in a keyframe with offset 1. One property in the last keyframe, with no offset.',
    function() {
      var groups;
      assert.doesNotThrow(function() {
        groups = makePropertySpecificKeyframeGroups(normalize(
          [
          {left: '0px', top: '0px', offset: 0},
          {left: '20px', offset: 1},
          {top: '20px'}
          ])
        );
      });
      assert.equal(Object.getOwnPropertyNames(groups).length, 2);
    });

  test('Make property specific keyframes where two properties are animated. One property in a keyframe with offset 0. One property in the first keyframe, with no offset.',
    function() {
      var groups;
      assert.doesNotThrow(function() {
        groups = makePropertySpecificKeyframeGroups(normalize(
          [
          {top: '0px'},
          {left: '0px', offset: 0},
          {left: '20px', top: '20px', offset: 1}
          ])
        );
      });
      assert.equal(Object.getOwnPropertyNames(groups).length, 2);
    });

  // TODO: Test this case for makeInterpolations.
  test('Make property specific keyframes where two properties are animated. Both properties in a keyframe with offset 1. One property in the last keyframe, with no offset.',
    function() {
      var groups;
      assert.doesNotThrow(function() {
        groups = makePropertySpecificKeyframeGroups(normalize(
          [
          {left: '0px', top: '0px', offset: 0},
          {left: '20px', top: '20px', offset: 1},
          {left: '30px'}
          ])
        );
      });
      assert.equal(Object.getOwnPropertyNames(groups).length, 2);

      assert.equal(groups.left.length, 3);
      assert.closeTo(groups.left[0].offset, 0, 0.001);
      assert.equal(groups.left[0].value, '0px');
      assert.closeTo(groups.left[1].offset, 1, 0.001);
      assert.equal(groups.left[1].value, '20px');
      assert.closeTo(groups.left[2].offset, 1, 0.001);
      assert.equal(groups.left[2].value, '30px')

      assert.equal(groups.top.length, 2);
      assert.closeTo(groups.top[0].offset, 0, 0.001);
      assert.equal(groups.top[0].value, '0px');
      assert.closeTo(groups.top[1].offset, 1, 0.001);
      assert.equal(groups.top[1].value, '20px');
    });

  // TODO: Test this case for makeInterpolations.
  test('Make property specific keyframes where two properties are animated. Both properties in the first keyframe, with no offset. One property in a keyframe with offset 0.',
    function() {
      var groups;
      assert.doesNotThrow(function() {
        groups = makePropertySpecificKeyframeGroups(normalize(
          [
          {left: '10px', top: '10px'},
          {left: '0px', offset: 0},
          {left: '20px', top: '20px', offset: 1}
          ])
        );
      });
      assert.equal(Object.getOwnPropertyNames(groups).length, 2);

      assert.equal(groups.left.length, 3);
      assert.closeTo(groups.left[0].offset, 0, 0.001);
      assert.equal(groups.left[0].value, '10px');
      assert.closeTo(groups.left[1].offset, 0, 0.001);
      assert.equal(groups.left[1].value, '0px');
      assert.closeTo(groups.left[2].offset, 1, 0.001);
      assert.equal(groups.left[2].value, '20px')

      assert.equal(groups.top.length, 2);
      assert.closeTo(groups.top[0].offset, 0, 0.001);
      assert.equal(groups.top[0].value, '10px');
      assert.closeTo(groups.top[1].offset, 1, 0.001);
      assert.equal(groups.top[1].value, '20px');
    });

  // 
  // test();

  // test('apply effect', function() {
  //   this.effect(this.element, 0.5);
  //   assert.equal(this.element.style.left, '50px');
  // });
  // test('apply and clear effect', function() {
  //   this.effect(this.element, 0.5);
  //   this.effect(this.element, null);
  //   assert.equal(this.element.style.left, '');
  // });
});
