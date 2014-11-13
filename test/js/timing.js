suite('timing-tests', function() {
  setup(function() {
    document.timeline._players = [];
  });

  test('pause and scrub', function() {
    // note that this functions natively. However, note that AnimationGroup
    // is not native on M41, so it still fails there.
    var animation = new Animation(document.body, [], { duration: 1000 });
    var player = document.timeline.play(animation);
    player.pause();

    player.currentTime = 500;
    assert.equal(player.currentTime, 500);
  });

  test('pause, scrub and play', function() {
    var target = document.createElement('div');
    document.body.appendChild(target);

    var animation = new Animation(target, [
      { background: 'blue' },
      { background: 'red' }
    ], { duration: 1000 });
    var player = document.timeline.play(animation);
    tick(100);
    player.pause();

    player.currentTime = 200;
    // http://www.w3.org/TR/web-animations/#the-current-time-of-a-player
    // currentTime should now mean 'hold time' - this allows scrubbing.
    assert.equal(player.currentTime, 200);
    player.play();

    tick(200);
    assert.equal(player.currentTime, 300);
    assert.equal(player.startTime, -100);
  });
});
