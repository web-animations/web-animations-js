suite('timing-tests', function() {
  setup(function() {
    document.timeline._players = [];
  });

  test('changing timing iterations mid-animation', function() {
    var animation = new Animation(document.body, [], { duration: 1000 });

    // TODO: access internal _timing for now, until .timing is properly generated
    var timing = animation._timing;

    assert.equal(timing.duration, 1000);
    assert.equal(timing.iterations, 1.0);

    var player = document.timeline.play(animation);
    tick(50);
    assert.equal(player.currentTime, 0);

    tick(350);
    assert.equal(player.currentTime, 300);

    timing.iterations = 0.5;
    animation.timing.iterations = 0.5;
    tick(850);
    assert.equal(player.currentTime, 500);
  });

  test('immediate pause iteration', function() {
    var animation = new Animation(document.body, [], { duration: 1000 });
    var player = document.timeline.play(animation);
    player.pause();

    tick(50);
    assert(!player.currentTime);
    assert(!player.startTime);

    tick(150);
    assert(!player.currentTime);
    assert(!player.startTime);

    player.play();

    tick(250);
    assert.equal(player.currentTime, 100);
    assert.equal(player.startTime, 150);
  });

  test('pause and scrub', function() {
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
    // currentTime should now mean 'hold time'?
    assert.equal(player.currentTime, 500);
    player.play();

    tick(200);
    assert.equal(player.currentTime, 300);
    assert.equal(player.startTime, -100);
  });
});
