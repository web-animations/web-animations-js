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

  test('effects apply in the correct order', function() {
    var target = document.createElement('div');
    document.documentElement.appendChild(target);
    function createAnimation(value, duration) {
      return new Animation(target, [{marginLeft: value}, {marginLeft: value}], duration);
    }
    tick(0);
    // The following animation structure looks like:
    // 44444
    // 11   
    //   33 
    //   2  
    // 0    
    var player = document.timeline.play(
      new AnimationGroup([
        createAnimation('4px', 5),
        new AnimationSequence([
          createAnimation('1px', 2),
          new AnimationGroup([
            createAnimation('3px', 2),
            createAnimation('2px', 1),
          ]),
        ]),
        createAnimation('0px', 1)
      ])
    );
    player.currentTime = 0;
    assert.equal(getComputedStyle(target).marginLeft, '0px');
    player.currentTime = 1;
    assert.equal(getComputedStyle(target).marginLeft, '1px');
    player.currentTime = 2;
    assert.equal(getComputedStyle(target).marginLeft, '2px');
    player.currentTime = 3;
    assert.equal(getComputedStyle(target).marginLeft, '3px');
    player.currentTime = 4;
    assert.equal(getComputedStyle(target).marginLeft, '4px');
    player.currentTime = 5;
    assert.equal(getComputedStyle(target).marginLeft, '0px');
  });
});
