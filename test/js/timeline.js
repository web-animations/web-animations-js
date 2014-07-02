suite('timeline-tests', function() {
  setup(function() { document.timeline._players = []; });

  test('players are in effect but ticking stops once forward fill is reached', function() {
    tick(90);
    var player = document.body.animate([], {duration: 1000, fill: 'forwards'});
    tick(100);
    tick(600);
    assert.equal(document.timeline._players.length, 1);
    assert.equal(isTicking(), true);
    tick(1100);
    assert.equal(player.finished, true);
    assert.equal(document.timeline._players.length, 1);
    assert.equal(isTicking(), false);
  });

  test('no current players', function() {
    assert.equal(document.timeline.getAnimationPlayers().length, 0);
  });

  test('getAnimationPlayers', function() {
    tick(90);
    assert.equal(document.timeline.getAnimationPlayers().length, 0);
    var player = document.body.animate([], {duration: 500, iterations: 1});
    tick(300);
    assert.equal(document.timeline.getAnimationPlayers().length, 1);

    var player2 = document.body.animate([], {duration: 1000});
    assert.equal(document.timeline.getAnimationPlayers().length, 2);
    tick(800);
    assert.equal(player.finished, true);
    assert.equal(document.timeline.getAnimationPlayers().length, 1);
    tick(2000);
    assert.equal(document.timeline.getAnimationPlayers().length, 0);
  });

  test('getAnimationPlayers checks cancelled animation', function() {
    tick(90);
    assert.equal(document.timeline.getAnimationPlayers().length, 0);
    var player = document.body.animate([], {duration: 500, iterations: 1});
    tick(300);
    assert.equal(document.timeline.getAnimationPlayers().length, 1);
    player.cancel();
    assert.equal(document.timeline.getAnimationPlayers().length, 0);
  });
});
