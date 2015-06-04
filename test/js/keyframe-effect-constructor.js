suite('keyframe-effect-constructor', function() {
  setup(function() {
    document.timeline.getAnimations().forEach(function(animation) {
      animation.cancel();
    });
    tick(100000);
  });

  test('Playing a KeyframeEffect makes an Animation', function() {
    var keyframeEffect = new KeyframeEffect(document.body, [], 1000);
    assert.equal(document.body.getAnimations().length, 0);

    var animation = document.timeline.play(keyframeEffect);
    tick(200);
    assert.equal(document.body.getAnimations().length, 1);

    tick(1600);
    assert.equal(document.body.getAnimations().length, 0);
  });

  test('Setting the timing function on a KeyframeEffect works', function() {
    function leftAsNumber(target) {
      left = getComputedStyle(target).left;
      return Number(left.substring(0, left.length - 2));
    }

    var target1 = document.createElement('div');
    var target2 = document.createElement('div');
    target1.style.position = 'absolute';
    target2.style.position = 'absolute';
    document.body.appendChild(target1);
    document.body.appendChild(target2);

    var keyframeEffect1 = new KeyframeEffect(target1, [{left: '0px'}, {left: '50px'}], 1000);
    var keyframeEffect2 = new KeyframeEffect(target2, [{left: '0px'}, {left: '50px'}], {duration: 1000, easing: 'ease-in'});

    var animation1 = document.timeline.play(keyframeEffect1);
    var animation2 = document.timeline.play(keyframeEffect2);

    tick(0);
    assert.equal(leftAsNumber(target1), 0);
    assert.equal(leftAsNumber(target2), 0);

    tick(250);
    assert.closeTo(leftAsNumber(target1), 12.5, 1);
    assert.closeTo(leftAsNumber(target2), 4.65, 1);

    tick(500);
    assert.closeTo(leftAsNumber(target1), 25, 1);
    assert.closeTo(leftAsNumber(target2), 15.25, 1);
  });

  test('Cloning a KeyframeEffect works', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);

    var keyframeEffect1 = new KeyframeEffect(target1, [{opacity: 1}, {opacity: 0}], {duration: 100, fill: 'none'});
    var keyframeEffect2 = keyframeEffect1.clone();

    assert.equal(keyframeEffect1.target, keyframeEffect2.target);
    assert.equal(keyframeEffect1._keyframes, keyframeEffect2._keyframes);
    assert.equal(keyframeEffect1.getFrames(), keyframeEffect2.getFrames());
    assert.notEqual(keyframeEffect1._timingInput, keyframeEffect2._timingInput);
    assert.equal(Object.getOwnPropertyNames(keyframeEffect1._timingInput).length, 2);
    assert.equal(Object.getOwnPropertyNames(keyframeEffect2._timingInput).length, 2);
    for (var i = 0; i < Object.getOwnPropertyNames(keyframeEffect1._timingInput).length; i++) {
      var timingProperty1 = Object.getOwnPropertyNames(keyframeEffect1._timingInput)[i];
      var timingProperty2 = Object.getOwnPropertyNames(keyframeEffect2._timingInput)[i];
      assert.equal(timingProperty1, timingProperty2);
      assert.equal(keyframeEffect1._timingInput[timingProperty1], keyframeEffect2._timingInput[timingProperty2]);
    }

    var animation = document.timeline.play(keyframeEffect1);
    tick(0);
    assert.equal(getComputedStyle(target1).opacity, 1);
    tick(25);
    assert.equal(getComputedStyle(target1).opacity, 0.75);
    tick(50);
    assert.equal(getComputedStyle(target1).opacity, 0.5);
    tick(75);
    assert.equal(getComputedStyle(target1).opacity, 0.25);
    tick(100);
    assert.equal(getComputedStyle(target1).opacity, 1);
    animation.cancel();

    animation = document.timeline.play(keyframeEffect2);
    tick(101);
    assert.equal(getComputedStyle(target1).opacity, 1);
    tick(126);
    assert.equal(getComputedStyle(target1).opacity, 0.75);
    tick(151);
    assert.equal(getComputedStyle(target1).opacity, 0.5);
    tick(176);
    assert.equal(getComputedStyle(target1).opacity, 0.25);
    tick(201);
    assert.equal(getComputedStyle(target1).opacity, 1);
    animation.cancel();
  });

  test('Timing is always converted to an AnimationEffectTiming', function() {
    var target = document.createElement('div');
    document.body.appendChild(target);

    var keyframes = [{background: 'blue'}, {background: 'red'}];

    var keyframeEffect = new KeyframeEffect(target, keyframes, 200);
    assert.equal(keyframeEffect.timing.duration, 200);

    keyframeEffect = new KeyframeEffect(target, keyframes);
    assert.isDefined(keyframeEffect.timing);

    keyframeEffect = new KeyframeEffect(target, keyframes, {duration: 200});
    var group = new GroupEffect([keyframeEffect]);
    assert.equal(group.timing.duration, 'auto');
  });

  test('Handle null target for KeyframeEffect', function() {
    var keyframeEffect = new KeyframeEffect(null, function(tf) {
      // noop
    }, 200);

    var animation = document.timeline.play(keyframeEffect);
    assert.isNotNull(animation);
    tick(50);
    tick(150);
    assert.equal(animation.currentTime, 100);
  });

  test('Remove custom effect from directly associated animation', function() {
    var target = document.createElement('div');
    document.body.appendChild(target);
    var custom = new KeyframeEffect(null, function(x) {target.style.opacity = x;}, 10);
    var animation = document.timeline.play(custom);
    tick(0);
    assert.equal(getComputedStyle(target).opacity, 0);
    assert.equal(custom._animation, animation);
    assert.equal(animation.effect, custom);
    custom.remove();
    tick(1);
    assert.equal(getComputedStyle(target).opacity, 1);
    assert.equal(custom._animation, undefined);
    assert.notEqual(animation.effect, custom);
    animation.play();
    tick(2);
    assert.equal(getComputedStyle(target).opacity, 1);
    assert.equal(custom._animation, undefined);
    animation.cancel();
    tick(3);
  });

  test('Remove KeyframeEffect from directly associated animation', function() {
    var target = document.createElement('div');
    document.body.appendChild(target);
    var effect = new KeyframeEffect(
        target,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        10);
    var animation = document.timeline.play(effect);
    tick(0);
    assert.equal(getComputedStyle(target).opacity, 0);
    assert.equal(effect._animation, animation);
    assert.equal(animation.effect, effect);
    effect.remove();
    tick(1);
    assert.equal(getComputedStyle(target).opacity, 1);
    assert.equal(effect._animation, undefined);
    assert.notEqual(animation.effect, effect);
    animation.play();
    tick(2);
    assert.equal(getComputedStyle(target).opacity, 1);
    assert.equal(effect._animation, undefined);
    animation.cancel();
    tick(3);
  });
});
