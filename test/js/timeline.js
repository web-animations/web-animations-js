suite('timeline-tests', function() {
  setup(function() {
    document.timeline._animations = [];
    webAnimations1.timeline._animation = [];
  });

  test('no current players', function() {
    assert.equal(document.timeline.getAnimations().length, 0);
  });

  test('getAnimations', function() {
    tick(90);
    assert.equal(document.timeline.getAnimations().length, 0);
    var player = document.body.animate([], {duration: 500, iterations: 1});
    tick(300);
    assert.equal(document.timeline.getAnimations().length, 1);

    var player2 = document.body.animate([], {duration: 1000});
    assert.equal(document.timeline.getAnimations().length, 2);
    tick(800);
    assert.equal(player.finished, true);
    assert.equal(document.timeline.getAnimations().length, 1);
    tick(2000);
    assert.equal(document.timeline.getAnimations().length, 0);
  });

  test('getAnimations checks cancelled animation', function() {
    tick(90);
    assert.equal(document.timeline.getAnimations().length, 0);
    var player = document.body.animate([], {duration: 500, iterations: 1});
    tick(300);
    assert.equal(document.timeline.getAnimations().length, 1);
    player.cancel();
    assert.equal(document.timeline.getAnimations().length, 0);
  });
});
