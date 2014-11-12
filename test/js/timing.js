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
    assert(!player.paused);
    assert.equal(player.currentTime, 0);
    tick(300);
    assert.equal(player.startTime, 300);  // why does this pass? the anim is running?
    assert.equal(player.currentTime, 300, 'after 300ms tick, currentTime should be 300ms');  // this fails -- what, what?

    timing.iterations = 0.5;
    animation.timing.iterations = 0.5;
    tick(300);
    assert.equal(player.currentTime, 500);
  });
});
