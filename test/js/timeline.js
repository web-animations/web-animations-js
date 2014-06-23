suite('timeline-tests', function() {
  setup(function() { document.timeline.players = []; });

  test('players are in effect but ticking stops once forward fill is reached', function() {
    tick(100);
    var player = document.body.animate([], {duration: 1000, fill: 'forwards'});
    tick(600);
    assert.equal(document.timeline.players.length, 1);
    assert.equal(isTicking(), true);
    tick(1100);
    assert.equal(player.finished, true);
    assert.equal(document.timeline.players.length, 1);
    assert.equal(isTicking(), false);
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
    var pass = false;
    tick(0);
    document.body.animate(function() {
      document.body.animate(function() {
        pass = true;
      }, 1);
    }, 2);
    tick(1);
    assert.equal(pass, true);
  });
});
