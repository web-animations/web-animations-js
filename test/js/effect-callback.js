suite('effect-callback', function() {
  setup(function() {
    document.timeline._players = [];
    webAnimationsMinifill.timeline._players = [];
  });

  test('animations starting in the future are not in effect', function() {
    var fractions = [];
    tick(100);
    var player = document.body.animate(function(fraction) { fractions.push(fraction); }, 1000);
    player.startTime = 1000;
    tick(200);
    tick(1000);
    tick(1100);
    assert.deepEqual(fractions, [null, 0, 0.1]);
  });

  test('duration 0 players get sampled at least once', function() {
    var timeFraction;
    tick(0);
    var player = document.body.animate(function(t) {
      timeFraction = t;
    }, {duration: 0, fill: 'both'});
    tick(100);
    assert.equal(timeFraction, 1);
    assert.equal(isTicking(), false);
  });

  test('players added during custom effect callbacks get updated in the same tick', function() {
    var player;
    var called = false;
    tick(0);
    document.body.animate(function() {
      player = document.body.animate(function() {
        called = true;
      }, 1);
    }, 2);
    tick(1);
    assert.isTrue(player.startTime >= 0);
    assert.isFalse(called);
  });

  test('custom effect should be called after cancel', function() {
    var fractions = [];
    var player = document.body.animate(function(fraction) { fractions.push(fraction); }, 1000);
    tick(0);
    tick(500);
    player.cancel();
    tick(501);
    assert.deepEqual(fractions, [0, 0.5, null]);
  });
});
