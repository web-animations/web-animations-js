suite('web-animations-next-animation-tests', function() {

  test('Newly constructed animation has a resolved ready promise', function() {
    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = new webAnimationsNextAnimation(effect);
    animation.ready;
    animation.finished;
    assert.equal(animation._readyPromiseState, 'resolved');
    assert.equal(animation._finishedPromiseState, 'pending');

    animation.play();
    assert.equal(animation._readyPromiseState, 'pending');
    assert.equal(animation._finishedPromiseState, 'pending');
    tick(1);
    assert.equal(animation._readyPromiseState, 'resolved');
    assert.equal(animation._finishedPromiseState, 'pending');
    tick(11);
    assert.equal(animation._readyPromiseState, 'resolved');
    assert.equal(animation._finishedPromiseState, 'resolved');
    animation.cancel();
    tick(12);
  });

  test('New animation has pending ready promise after playing', function() {
    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = document.timeline.play(effect);
    animation.ready;
    animation.finished;
    assert.equal(animation._readyPromiseState, 'pending');
    assert.equal(animation._finishedPromiseState, 'pending');
    animation.finish();
    animation.cancel();
    tick(1);
  });

  test('Playing animation has resolved ready promise after first tick', function() {
    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = document.timeline.play(effect);
    tick(1);
    animation.ready;
    animation.finished;
    assert.equal(animation._readyPromiseState, 'resolved');
    assert.equal(animation._finishedPromiseState, 'pending');
    animation.finish();
    animation.cancel();
    tick(2);
  });

  test('Finishing an animation resolves the finished and ready promises', function() {
    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = document.timeline.play(effect);
    animation.ready;
    animation.finished;
    animation.finish();
    assert.equal(animation._readyPromiseState, 'resolved');
    assert.equal(animation._finishedPromiseState, 'resolved');
    animation.cancel();
    tick(1);
  });
});
