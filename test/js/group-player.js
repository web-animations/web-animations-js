suite('group-player', function() {
  setup(function() {
    document.timeline.players = [];
  });

  function simpleAnimationGroup() {
    return new AnimationGroup([new Animation(document.body, [], 2000), new Animation(document.body, [], 1000), new Animation(document.body, [], 3000)]);
  }

  test('playing works as expected', function() {
    tick(100);
    var p = document.timeline.play(simpleAnimationGroup());
    assert.equal(p.startTime, 100);
    assert.equal(p.currentTime, 0);
    tick(300);
    assert.equal(p.startTime, 100);
    assert.equal(p.currentTime, 200);
  });
});
