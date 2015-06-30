'use strict';
suite('animation-promises-tests', function() {
  test('Newly constructed animation has a resolved ready promise', function(done) {
    var readyResolved = false;
    var readyRejected = false;
    var finishedResolved = false;
    var finishedRejected = false;
    function onReadyResolution() { readyResolved = true; }
    function onReadyRejection() { readyRejected = true; }
    function onFinishedResolution() { finishedResolved = true; }
    function onFinishedRejection() { finishedRejected = true; }

    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = new webAnimationsNextAnimation(effect, document.timeline);
    animation.ready.then(onReadyResolution, onReadyRejection);
    animation.finished.then(onFinishedResolution, onFinishedRejection);

    var message;
    var testDone = false;
    setTimeout(function() {
      try {
        message = 'newly constructed animation has resolved ready promise';
        assert.isTrue(readyResolved, message);
        message = 'newly constructed animation has pending finished promise';
        assert.isFalse(finishedResolved, message);
        assert.isFalse(finishedRejected, message);
        readyResolved = false;
        animation.play();
        animation.ready.then(onReadyResolution, onReadyRejection);
      } catch (assertion) {
        animation.cancel();
        tick(1);
        testDone = true;
        done(assertion);
      }
    }, 100);

    setTimeout(function() {
      try {
        if (testDone) {
          return;
        }
        message = 'promises are pending after play and before tick';
        assert.isFalse(readyResolved, message);
        assert.isFalse(readyRejected, message);
        assert.isFalse(finishedResolved, message);
        assert.isFalse(finishedRejected, message);
        animation.cancel();
        tick(1);
        done();
      } catch (assertion) {
        animation.cancel();
        tick(1);
        done(assertion);
      }
    }, 200);
  });

  test('Animation timeline getter', function() {
    var effect = new KeyframeEffect(null, [], 10);
    var animation = new webAnimationsNextAnimation(effect, document.timeline);
    assert.equal(animation.timeline, document.timeline);
  });

  test('New animation has pending promises after playing', function(done) {
    var readyResolved = false;
    var readyRejected = false;
    var finishedResolved = false;
    var finishedRejected = false;
    function onReadyResolution() { readyResolved = true; }
    function onReadyRejection() { readyRejected = true; }
    function onFinishedResolution() { finishedResolved = true; }
    function onFinishedRejection() { finishedRejected = true; }

    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = document.timeline.play(effect);
    animation.ready.then(onReadyResolution, onReadyRejection);
    animation.finished.then(onFinishedResolution, onFinishedRejection);

    var message;
    setTimeout(function() {
      try {
        message = 'promises are pending after play and before tick';
        assert.isFalse(readyResolved, message);
        assert.isFalse(readyRejected, message);
        assert.isFalse(finishedResolved, message);
        assert.isFalse(finishedRejected, message);
        animation.cancel();
        tick(1);
        done();
      } catch (assertion) {
        animation.cancel();
        tick(1);
        done(assertion);
      }
    }, 100);
  });

  test('First tick after play resolves ready promise', function(done) {
    var readyResolved = false;
    var readyRejected = false;
    var finishedResolved = false;
    var finishedRejected = false;
    function onReadyResolution() { readyResolved = true; }
    function onReadyRejection() { readyRejected = true; }
    function onFinishedResolution() { finishedResolved = true; }
    function onFinishedRejection() { finishedRejected = true; }

    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = document.timeline.play(effect);
    tick(1);
    animation.ready.then(onReadyResolution, onReadyRejection);
    animation.finished.then(onFinishedResolution, onFinishedRejection);

    var message;
    setTimeout(function() {
      try {
        message = 'ready promise is resolved after first tick';
        assert.isTrue(readyResolved, message);
        message = 'finished promise is pending after first tick';
        assert.isFalse(finishedResolved, message);
        assert.isFalse(finishedRejected, message);
        animation.cancel();
        tick(2);
        done();
      } catch (assertion) {
        animation.cancel();
        tick(2);
        done(assertion);
      }
    }, 100);
  });

  test('Finished animation has resolved finished promise', function(done) {
    var readyResolved = false;
    var readyRejected = false;
    var finishedResolved = false;
    var finishedRejected = false;
    function onReadyResolution() { readyResolved = true; }
    function onReadyRejection() { readyRejected = true; }
    function onFinishedResolution() { finishedResolved = true; }
    function onFinishedRejection() { finishedRejected = true; }

    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = document.timeline.play(effect);
    tick(1);
    animation.ready.then(onReadyResolution, onReadyRejection);
    animation.finished.then(onFinishedResolution, onFinishedRejection);
    tick(11);

    var message;
    setTimeout(function() {
      try {
        message = 'finished animation has resolved finished promise';
        assert.isTrue(finishedResolved, message);
        animation.cancel();
        tick(12);
        done();
      } catch (assertion) {
        animation.cancel();
        tick(12);
        done(assertion);
      }
    }, 100);
  });

  test('Animation.cancel rejects ready and pending promises and resolves new ready promise', function(done) {
    var readyResolved = false;
    var readyRejected = false;
    var finishedResolved = false;
    var finishedRejected = false;
    function onReadyResolution() { readyResolved = true; }
    function onReadyRejection() { readyRejected = true; }
    function onFinishedResolution() { finishedResolved = true; }
    function onFinishedRejection() { finishedRejected = true; }

    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = document.timeline.play(effect);
    animation.ready.then(onReadyResolution, onReadyRejection);
    animation.finished.then(onFinishedResolution, onFinishedRejection);
    animation.cancel();

    var message;
    var testDone = false;
    setTimeout(function() {
      try {
        message = 'cancelling pending animation rejects promises';
        assert.isTrue(readyRejected, message);
        assert.isTrue(finishedRejected, message);
        readyRejected = false;
        finishedRejected = false;
        animation.ready.then(onReadyResolution, onReadyRejection);
        animation.finished.then(onFinishedResolution, onFinishedRejection);
      } catch (assertion) {
        tick(1);
        testDone = true;
        done(assertion);
      }
    }, 100);

    setTimeout(function() {
      if (testDone) {
        return;
      }
      try {
        message = 'ready promise is resolved after cancel';
        assert.isTrue(readyResolved, message);
        message = 'finished promise is pending after cancel';
        assert.isFalse(finishedResolved, message);
        assert.isFalse(finishedRejected, message);
        tick(1);
        done();
      } catch (assertion) {
        tick(1);
        done(assertion);
      }
    }, 200);
  });

  test('Animation.finish resolves the finished and ready promises', function(done) {
    var readyResolved = false;
    var readyRejected = false;
    var finishedResolved = false;
    var finishedRejected = false;
    function onReadyResolution() { readyResolved = true; }
    function onReadyRejection() { readyRejected = true; }
    function onFinishedResolution() { finishedResolved = true; }
    function onFinishedRejection() { finishedRejected = true; }

    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = document.timeline.play(effect);
    animation.ready.then(onReadyResolution, onReadyRejection);
    animation.finished.then(onFinishedResolution, onFinishedRejection);
    animation.finish();

    var message;
    setTimeout(function() {
      try {
        message = 'finished animation has resolved ready promise';
        assert.isTrue(readyResolved, message);
        message = 'finished animation has resolved finished promise';
        assert.isTrue(finishedResolved, message);
        animation.cancel();
        tick(1);
        done();
      } catch (assertion) {
        animation.cancel();
        tick(1);
        done(assertion);
      }
    }, 100);
  });

  test('Playing a finished animation resets promises', function(done) {
    var readyResolved = false;
    var readyRejected = false;
    var finishedResolved = false;
    var finishedRejected = false;
    function onReadyResolution() { readyResolved = true; }
    function onReadyRejection() { readyRejected = true; }
    function onFinishedResolution() { finishedResolved = true; }
    function onFinishedRejection() { finishedRejected = true; }

    tick(0);
    var effect = new KeyframeEffect(null, [], 10);
    var animation = document.timeline.play(effect);
    animation.ready.then(onReadyResolution, onReadyRejection);
    animation.finished.then(onFinishedResolution, onFinishedRejection);
    animation.finish();

    var message;
    var testDone = false;
    setTimeout(function() {
      try {
        message = 'finished animation has resolved ready promise';
        assert.isTrue(readyResolved, message);
        message = 'finished animation has resolved finished promise';
        assert.isTrue(finishedResolved, message);
        readyResolved = false;
        finishedResolved = false;
        animation.play();
        animation.ready.then(onReadyResolution, onReadyRejection);
        animation.finished.then(onFinishedResolution, onFinishedRejection);
      } catch (assertion) {
        animation.cancel();
        tick(1);
        testDone = true;
        done(assertion);
      }
    }, 100);

    setTimeout(function() {
      try {
        if (testDone) {
          return;
        }
        message = 'playing a finished animation makes promises pending';
        assert.isFalse(readyResolved, message);
        assert.isFalse(readyRejected, message);
        assert.isFalse(finishedResolved, message);
        assert.isFalse(finishedRejected, message);
        animation.cancel();
        tick(1);
        done();
      } catch (assertion) {
        animation.cancel();
        tick(1);
        done(assertion);
      }
    }, 200);
  });
});
