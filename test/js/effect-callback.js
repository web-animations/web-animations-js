suite('effect-callback', function() {
  setup(function() {
    document.timeline._animations = [];
    webAnimations1.timeline._animations = [];
  });

  test('animations starting in the future are not in effect', function() {
    var fractions = [];
    tick(100);
    var effect = new KeyframeEffect(null, [], 1000);
    effect.onsample = function(fraction) {
      fractions.push(fraction);
    };
    var animation = document.timeline.play(effect);
    animation.startTime = 1000;
    tick(200);
    tick(1000);
    tick(1100);
    assert.deepEqual(fractions, [0, 0.1]);
  });

  test('duration 0 animations get sampled at least once', function() {
    var timeFraction;
    tick(0);
    var effect = new KeyframeEffect(null, [], {duration: 0, fill: 'both'});
    effect.onsample = function(t) {
      timeFraction = t;
    };
    var animation = document.timeline.play(effect);
    tick(100);
    assert.equal(timeFraction, 1);
    assert.equal(isTicking(), false);
  });

  test('animations added during custom effect callbacks get updated in the same tick', function() {
    var animation;
    var called = false;
    tick(0);
    var effect = new KeyframeEffect(null, [], 2);
    var effect2 = new KeyframeEffect(null, [], 1);
    effect.onsample = function() {
      animation = document.timeline.play(effect2);
    };
    effect2.onsample = function() {
      called = true;
    };
    document.timeline.play(effect);
    tick(1);
    assert.isTrue(animation.startTime >= 0);
    assert.isFalse(called);
  });

  test('custom effect should be called after cancel', function() {
    var fractions = [];
    var effect = new KeyframeEffect(null, [], 1000);
    effect.onsample = function(fraction) {
      fractions.push(fraction);
    };
    var animation = document.timeline.play(effect);
    tick(0);
    tick(500);
    animation.cancel();
    tick(501);
    assert.deepEqual(fractions, [0, 0.5, null]);
  });

  test('Custom callback is given effect and animation', function() {
    var callbackEffect;
    var callbackAnim;
    var effect = new KeyframeEffect(document.body, [], 100);
    effect.onsample = function(t, e, a) {
      callbackEffect = e;
      callbackAnim = a;
    };
    var animation = document.timeline.play(effect);
    tick(50);
    tick(150);
    assert.equal(isTicking(), false);
    assert.equal(callbackAnim, animation);
    assert.equal(callbackEffect.target, document.body);
  });

  test('animations starting in the future are not in effect (old version)', function() {
    var fractions = [];
    tick(100);
    var animation = document.body.animate(function(fraction) { fractions.push(fraction); }, 1000);
    animation.startTime = 1000;
    tick(200);
    tick(1000);
    tick(1100);
    assert.deepEqual(fractions, [0, 0.1]);
  });

  test('duration 0 animations get sampled at least once (old version)', function() {
    var timeFraction;
    tick(0);
    var animation = document.body.animate(function(t) {
      timeFraction = t;
    }, {duration: 0, fill: 'both'});
    tick(100);
    assert.equal(timeFraction, 1);
    assert.equal(isTicking(), false);
  });

  test('animations added during custom effect callbacks get updated in the same tick (old version)', function() {
    var animation;
    var called = false;
    tick(0);
    document.body.animate(function() {
      animation = document.body.animate(function() {
        called = true;
      }, 1);
    }, 2);
    tick(1);
    assert.isTrue(animation.startTime >= 0);
    assert.isFalse(called);
  });

  test('custom effect should be called after cancel (old version)', function() {
    var fractions = [];
    var animation = document.body.animate(function(fraction) { fractions.push(fraction); }, 1000);
    tick(0);
    tick(500);
    animation.cancel();
    tick(501);
    assert.deepEqual(fractions, [0, 0.5, null]);
  });

  test('element.animate is given effect (old version)', function() {
    var callbackAnim;
    var animation = document.body.animate(function(t, target, a) {
      callbackAnim = a;
    }, 100);
    tick(50);
    tick(150);
    assert.equal(isTicking(), false);
    assert(callbackAnim, 'callback should be set');
    assert.equal(callbackAnim.target, document.body);
  });

  test('custom callback on effect is given source effect (old version)', function() {
    var callbackAnim;
    var effect = new KeyframeEffect(document.body, function(t, target, a) {
      callbackAnim = a;
    }, 1000);
    var animation = document.timeline.play(effect);
    tick(50);
    tick(550);
    assert.equal(animation.currentTime, 500);
    assert.equal(callbackAnim, effect);
  });
});
