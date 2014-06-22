suite('group-player', function() {
  setup(function() {
    document.timeline.players = [];
    this.elements = [];

    var animationMargin = function(target) {
      return new Animation(
          target,
          [
           {marginLeft: '0px'},
           {marginLeft: '100px'}
          ],
          500);
    };

    // FIXME: Remove. Used for testing pause on simple Animations during dev of this test.
    this.animationMargin = animationMargin;

    var animationColor = function(target) {
      return new Animation(
          target,
          [
           {backgroundColor: 'black'},
           {backgroundColor: 'white'}
          ],
          500);
    };
    var sequenceEmpty = function() {
      return new AnimationSequence();
    };
    var groupEmpty = function() {
      return new AnimationGroup();
    };
    var sequenceWithEffects = function(target) {
      return new AnimationSequence(
          [
           animationMargin(target),
           animationColor(target)
          ]);
    };
    var groupWithEffects = function(target) {
      return new AnimationGroup(
          [
           animationMargin(target),
           animationColor(target)
          ]);
    };

    var seqEmpty_source = sequenceEmpty();

    var seqSimple_target = document.createElement('div');
    var seqSimple_source = sequenceWithEffects(seqSimple_target);

    var seqWithSeq_target = document.createElement('div');
    this.elements.push(seqWithSeq_target);
    var seqWithSeq_source = new AnimationSequence(
        [
         animationMargin(seqWithSeq_target),
         animationColor(seqWithSeq_target),
         sequenceWithEffects(seqWithSeq_target)
        ]);

    var seqWithGroup_target = document.createElement('div');
    this.elements.push(seqWithGroup_target);
    var seqWithGroup_source = new AnimationSequence(
        [
         animationMargin(seqWithGroup_target),
         animationColor(seqWithGroup_target),
         groupWithEffects(seqWithGroup_target)
        ]);

    var seqWithEmptyGroup_source = new AnimationSequence([groupEmpty()]);
    var seqWithEmptySeq_source = new AnimationSequence([sequenceEmpty()]);

    var groupEmpty_source = groupEmpty();

    var groupSimple_target = document.createElement('div');
    var groupSimple_source = groupWithEffects(groupSimple_target);

    var groupWithSeq_target = document.createElement('div');
    this.elements.push(groupWithSeq_target);
    var groupWithSeq_source = new AnimationGroup(
        [
         animationMargin(groupWithSeq_target),
         animationColor(groupWithSeq_target),
         sequenceWithEffects(groupWithSeq_target)
        ]);

    var groupWithGroup_target = document.createElement('div');
    this.elements.push(groupWithGroup_target);
    var groupWithGroup_source = new AnimationGroup(
        [
         animationMargin(groupWithGroup_target),
         animationColor(groupWithGroup_target),
         groupWithEffects(groupWithGroup_target)
        ]);

    var groupWithEmptyGroup_source = new AnimationGroup([groupEmpty()]);
    var groupWithEmptySeq_source = new AnimationGroup([sequenceEmpty()]);

    this.seqEmpty_source = seqEmpty_source;
    this.seqSimple_source = seqSimple_source;
    this.seqWithSeq_source = seqWithSeq_source;
    this.seqWithGroup_source = seqWithGroup_source;
    this.seqWithEmptyGroup_source = seqWithEmptyGroup_source;
    this.seqWithEmptySeq_source = seqWithEmptySeq_source;

    this.groupEmpty_source = groupEmpty_source;
    this.groupSimple_source = groupSimple_source;
    this.groupWithSeq_source = groupWithSeq_source;
    this.groupWithGroup_source = groupWithGroup_source;
    this.groupWithEmptyGroup_source = groupWithEmptyGroup_source;
    this.groupWithEmptySeq_source = groupWithEmptySeq_source;

    var staticAnimation = function(target, value, duration) {
      return new Animation(target, [{marginLeft: value}, {marginLeft: value}], duration);
    };
    // The following animation structure looks like:
    // 44444
    // 11
    //   33
    //   2
    // 0
    this.complexTarget = document.createElement('div');
    this.elements.push(this.complexTarget);
    this.complexSource = new AnimationGroup([
      staticAnimation(this.complexTarget, '4px', 5),
      new AnimationSequence([
        staticAnimation(this.complexTarget, '1px', 2),
        new AnimationGroup([
          staticAnimation(this.complexTarget, '3px', 2),
          staticAnimation(this.complexTarget, '2px', 1),
        ]),
      ]),
      staticAnimation(this.complexTarget, '0px', 1),
    ]);

    for (var i = 0; i < this.elements.length; i++)
      document.documentElement.appendChild(this.elements[i]);
  });

  teardown(function() {
    for (var i = 0; i < this.elements.length; i++)
      this.elements[i].remove();
  });

  function simpleAnimationGroup() {
    return new AnimationGroup([new Animation(document.body, [], 2000), new Animation(document.body, [], 1000), new Animation(document.body, [], 3000)]);
  }

  function simpleAnimationSequence() {
    return new AnimationSequence([new Animation(document.body, [], 2000), new Animation(document.body, [], 1000), new Animation(document.body, [], 3000)]);
  }

  // FIXME: Remove _startOffset.
  // playerState is [startTime, currentTime, _startOffset?, offset?]
  // innerPlayerStates is a nested array tree of playerStates e.g. [[0, 0], [[1, -1], [2, -2]]]
  function checkTimes(player, playerState, innerPlayerStates, description) {
    description = description ? (description + ' ') : '';
    _checkTimes(player, playerState, 0, description + 'top player');
    _checkTimes(player, innerPlayerStates, 0, description + 'inner player');
  }

  function _checkTimes(player, timingList, index, trace) {
    assert.isDefined(player, trace + ' exists');
    if (timingList.length == 0) {
      assert.equal(player._childPlayers.length, index, trace + ' no remaining players');
      return;
    }
    if (typeof timingList[0] == 'number') {
      if (isNaN(player._startTime))
        assert.ok(isNaN(timingList[0]));
      else
        assert.equal(player._startTime, timingList[0], trace + ' startTime');
      assert.equal(player.currentTime, timingList[1], trace + ' currentTime');
    } else {
      _checkTimes(player._childPlayers[index], timingList[0], 0, trace + ' ' + index);
      _checkTimes(player, timingList.slice(1), index + 1, trace);
    }
  }

  test('playing an animationGroup works as expected', function() {
    tick(90);
    var p = document.timeline.play(simpleAnimationGroup());
    checkTimes(p, [NaN, 0], []);
    tick(100);
    checkTimes(p, [100, 0], [[100, 0], [100, 0], [100, 0]]);
    tick(300);
    checkTimes(p, [100, 200], [[100, 200], [100, 200], [100, 200]]);
    tick(1200);
    checkTimes(p, [100, 1100], [[100, 1100], [100, 1000], [100, 1100]]);
    tick(2200);
    checkTimes(p, [100, 2100], [[100, 2000], [100, 1000], [100, 2100]]);
    tick(3200);
    checkTimes(p, [100, 3000], [[100, 2000], [100, 1000], [100, 3000]]);
  });

  test('playing an animationSequence works as expected', function() {
    tick(100);
    var p = document.timeline.play(simpleAnimationSequence());
    tick(110);
    checkTimes(p, [110, 0], [[110, 0], [2110, -2000], [3110, -3000]]);
    tick(210);
    checkTimes(p, [110, 100], [[110, 100], [2110, -1900], [3110, -2900]]);
  });

  test('complex animation tree timing while playing', function() {
    tick(90);
    var player = document.timeline.play(this.complexSource);
    tick(100);
    checkTimes(player, [100, 0], [
      [100, 0], [ // 4
        [100, 0], [ // 1
          [102, -2], // 3
          [102, -2]]], // 2
      [100, 0], // 0
    ], 't = 100');
    tick(101);
    checkTimes(player, [100, 1], [
      [100, 1], [ // 4
        [100, 1], [ // 1
          [102, -1], // 3
          [102, -1]]], // 2
      [100, 1], // 0
    ], 't = 101');
    tick(102);
    checkTimes(player, [100, 2], [
      [100, 2], [ // 4
        [100, 2], [ // 1
          [102, 0], // 3
          [102, 0]]], // 2
      [100, 1], // 0
    ], 't = 102');
  });

  test('effects apply in the correct order', function() {
    tick(0);
    var player = document.timeline.play(this.complexSource);
    player.currentTime = 0;
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '0px');
    player.currentTime = 1;
    checkTimes(player, [-1, 1], [[-1, 1, 0], [[-1, 1, 0], [[1, -1, 0], [1, -1, 0]]], [-1, 1, 0]]);
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '1px');
    player.currentTime = 2;
    // TODO: When we seek we don't limit. Is this OK?
    checkTimes(player, [-2, 2], [[-2, 2, 0], [[-2, 2, 0], [[0, 0, 0], [0, 0, 0]]], [-2, 2, 0]]);
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '2px');
    player.currentTime = 3;
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '3px');
    player.currentTime = 4;
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '4px');
    player.currentTime = 5;
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '0px');
  });

  test('cancelling group players', function() {
    tick(0);
    var player = document.timeline.play(this.complexSource);
    tick(1);
    tick(4);
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '3px');
    player.cancel();
    assert.equal(player.currentTime, 0);
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '0px');
  });

  test('redundant animation node wrapping', function() {
    var target = document.createElement('div');
    document.documentElement.appendChild(target);
    function createAnimation(value, duration) {
      return new Animation(target, [{marginLeft: value}, {marginLeft: value}], duration);
    }
    tick(100);
    var animation = new AnimationSequence([
      createAnimation('0px', 1),
      new AnimationGroup([
        new AnimationSequence([
          createAnimation('1px', 1),
          createAnimation('2px', 1),
        ]),
      ]),
    ]);
    var player = document.timeline.play(animation);
    assert.equal(getComputedStyle(target).marginLeft, '0px');
    checkTimes(player, [100, 0], [
      [100, 0, 0, 0], [[ // 0
        [101, -1, 0, 1], // 1
        [102, -2, 1, 2]]] // 2
    ], 't = 100');
    tick(101);
    assert.equal(getComputedStyle(target).marginLeft, '1px');
    checkTimes(player, [100, 1], [
      [100, 1, 0, 0], [[ // 0
        [101, 0, 0, 1], // 1
        [102, -1, 1, 2]]] // 2
    ], 't = 101');
    tick(102);
    assert.equal(getComputedStyle(target).marginLeft, '2px');
    assert.equal(document.timeline.currentTime, 102);
    checkTimes(player, [100, 2], [ // FIXME: Implement limiting on group players
      [100, 1, 0, 0], [[ // 0
        [101, 1, 0, 1], // 1
        [102, 0, 1, 2]]] // 2
    ], 't = 102');
    tick(103);
    assert.equal(getComputedStyle(target).marginLeft, '0px');
    checkTimes(player, [100, 3], [ // FIXME: Implement limiting on group players
      [100, 1, 0, 0], [[ // 0
        [101, 1, 0, 1], // 1
        [102, 1, 1, 2]]] // 2
    ], 't = 103');
    target.remove();
  });

  // FIXME: This test can be removed when this suite is finished.
  test('sources are working for basic operations', function() {
    var players = [];
    players.push(document.timeline.play(this.seqEmpty_source));
    players.push(document.timeline.play(this.seqSimple_source));
    players.push(document.timeline.play(this.seqWithSeq_source));
    players.push(document.timeline.play(this.seqWithGroup_source));
    players.push(document.timeline.play(this.seqWithEmptyGroup_source));
    players.push(document.timeline.play(this.seqWithEmptySeq_source));

    players.push(document.timeline.play(this.groupEmpty_source));
    players.push(document.timeline.play(this.groupSimple_source));
    players.push(document.timeline.play(this.groupWithSeq_source));
    players.push(document.timeline.play(this.groupWithGroup_source));
    players.push(document.timeline.play(this.groupWithEmptyGroup_source));
    players.push(document.timeline.play(this.groupWithEmptySeq_source));

    var length = players.length;

    tick(50);
    for (var i = 0; i < length; i++)
      players[i].pause();

    tick(100);
    for (var i = 0; i < length; i++)
      players[i].play();

    tick(200);
    for (var i = 0; i < length; i++)
      players[i].currentTime += 1;

    tick(300);
    for (var i = 0; i < length; i++)
      players[i].startTime += 1;

    tick(350);
    for (var i = 0; i < length; i++)
      players[i].reverse();

    var readOffsets = function(player) {
      player.offset;
      if (player.hasOwnProperty('childPlayers'))
        for (var i = 0; i < player.childPlayers.length; i++)
          readOffsets(player.childPlayers[i]);
    };
    tick(380);
    for (var i = 0; i < length; i++)
      readOffsets(players[i]);

    tick(400);
    for (var i = 0; i < length; i++)
      players[i].finish();

    tick(500);
    tick(600);
    for (var i = 0; i < length; i++)
      players[i].cancel();

    for (var i = 0; i < length; i++)
      players[i].play();
  });

  test('pausing works as expected with an empty AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqEmpty_source);
    // check: player
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    player.pause();
    // check
  });

  test('pausing works as expected with a simple AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqSimple_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.pause();
    // check
    tick(300);
    // check
    player.play();
    tick(300);
    // check
    tick(700);
    // check
  });

  test('pausing works as expected with an AnimationSequence inside an AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqWithSeq_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1],
    //        player.childPlayers[2],
    //        player.childPlayers[2].childPlayers[0],
    //        player.childPlayers[2].childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    // assert.equal(player.childPlayers[2].startTime, X);
    // assert.equal(player.childPlayers[2].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.pause();
    // check
    tick(300);
    // check
    player.play();
    tick(300);
    // check
    tick(1300);
    // check
    player.pause();
    // check
    tick(1400);
    // check
    player.play();
    tick(1400);
    // check
    tick(1600);
    // check
    player.pause();
    // check
    tick(1700);
    // check
    player.play();
    tick(1700);
    // check
  });

  test('pausing works as expected with an AnimationGroup inside an AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqWithGroup_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1],
    //        player.childPlayers[2],
    //        player.childPlayers[2].childPlayers[0],
    //        player.childPlayers[2].childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    // assert.equal(player.childPlayers[2].startTime, X);
    // assert.equal(player.childPlayers[2].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.pause();
    // check
    tick(300);
    // check
    player.play();
    tick(300);
    // check
    tick(1300);
    // check
    player.pause();
    // check
    tick(1400);
    // check
    player.play();
    tick(1400);
    // check
  });

  test('pausing works as expected with an empty AnimationSequence inside an AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqWithEmptySeq_source);
    // check: player,
    //        player.childPlayers[0]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    player.pause();
    // check
  });

  test('pausing works as expected with an empty AnimationGroup inside an AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqWithEmptyGroup_source);
    // check: player,
    //        player.childPlayers[0]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    player.pause();
    // check
  });

  test('pausing works as expected with an empty AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupEmpty_source);
    // check: player
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    player.pause();
    // check
  });

  test('pausing works as expected with a simple AnimationGroup', function() {
    tick(0);
    console.log(this.groupSimple_source);
    var player = document.timeline.play(this.groupSimple_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.pause();
    // check
    tick(300);
    // check
    player.play();
    tick(300);
    // check
  });

  test('pausing works as expected with an AnimationSequence inside an AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupWithSeq_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1],
    //        player.childPlayers[2],
    //        player.childPlayers[2].childPlayers[0],
    //        player.childPlayers[2].childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    // assert.equal(player.childPlayers[2].startTime, X);
    // assert.equal(player.childPlayers[2].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.pause();
    // check
    tick(300);
    // check
    player.play();
    tick(300);
    // check
    tick(800);
    // check
    player.pause();
    // check
    tick(900);
    // check
    player.play();
    tick(900);
    // check
    tick(1300);
    // check
    player.pause();
    // check
    tick(1300);
    // check
    player.play();
    tick(1400);
    // check
  });

  test('pausing works as expected with an AnimationGroup inside an AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupWithGroup_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1],
    //        player.childPlayers[2],
    //        player.childPlayers[2].childPlayers[0],
    //        player.childPlayers[2].childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    // assert.equal(player.childPlayers[2].startTime, X);
    // assert.equal(player.childPlayers[2].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.pause();
    // check
    tick(300);
    // check
    player.play();
    tick(300);
    // check
  });

  test('pausing works as expected with an empty AnimationSequence inside an AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupWithEmptySeq_source);
    // check: player,
    //        player.childPlayers[0]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    player.pause();
    // check
  });

  test('pausing works as expected with an empty AnimationGroup inside an AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupWithEmptyGroup_source);
    // check: player,
    //        player.childPlayers[0]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    player.pause();
    // check
  });

  // FIXME: This is just here as a baseline during development. REMOVE.
  test('pausing works as expected with a simple Animation', function() {
    tick(0);
    var target = document.createElement('div');
    var player = document.timeline.play(this.animationMargin(target));
    assert.equal(player.startTime, 0);
    assert.equal(player.currentTime, 0);
    tick(200);
    assert.equal(player.startTime, 0);
    assert.equal(player.currentTime, 200);
    player.pause();
    assert.equal(player.startTime, null);
    assert.equal(player.currentTime, 200);
    tick(300);
    assert.equal(player.startTime, null);
    assert.equal(player.currentTime, 200);
    player.play();
    tick(300);
    assert.equal(player.startTime, 100);
    assert.equal(player.currentTime, 200);
    tick(600);
    setTicking(true);
    assert.equal(player.startTime, 100);
    assert.equal(player.currentTime, 500);
  });

// Test reverse
  test('reversing works as expected with an empty AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqEmpty_source);
    // check: player
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    player.reverse();
    // check
  });

  test('reversing works as expected with a simple AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqSimple_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.reverse(); // 200 <-
    // check
    tick(300);
    // check
    player.reverse(); // 100 ->
    // check
    tick(1000);
    // check
    player.reverse(); // 800 <-
    // check
    tick(1400);
    // check
    player.reverse(); // 400 ->
    // check
    tick(2200);
    // check
    player.reverse(); // 1000 (finished) <-
    // check
    tick(3300);
    // check
    player.reverse(); // 0 (finished) ->
    // check
  });

  test('reversing works as expected with an AnimationSequence inside an AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqSimple_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1],
    //        player.childPlayers[2],
    //        player.childPlayers[2].childPlayers[0],
    //        player.childPlayers[2].childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    // assert.equal(player.childPlayers[2].startTime, X);
    // assert.equal(player.childPlayers[2].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.reverse(); // 200 <-
    // check
    tick(300);
    // check
    player.reverse(); // 100 ->
    // check
    tick(1000);
    // check
    player.reverse(); // 800 <-
    // check
    tick(1400);
    // check
    player.reverse(); // 400 ->
    // check
    tick(2400);
    // check
    player.reverse(); // 1400 <-
    // check
    tick(2500);
    // check
    player.reverse(); // 1300 ->
    // check
    tick(3000);
    // check
    player.reverse(); // 1800 <-
    // check
    tick(3100);
    // check
    player.reverse(); // 1700 ->
    // check
    tick(3500);
    // check
    player.reverse(); // 2000 (finished) <-
    // check
    tick(5600);
    // check
    player.reverse(); // 0 (finished) ->
    // check
  });

  test('reversing works as expected with an AnimationGroup inside an AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqWithGroup_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1],
    //        player.childPlayers[2],
    //        player.childPlayers[2].childPlayers[0],
    //        player.childPlayers[2].childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    // assert.equal(player.childPlayers[2].startTime, X);
    // assert.equal(player.childPlayers[2].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.reverse(); // 200 <-
    // check
    tick(300);
    // check
    player.reverse(); // 100 ->
    // check
    tick(1000);
    // check
    player.reverse(); // 800 <-
    // check
    tick(1400);
    // check
    player.reverse(); // 400 ->
    // check
    tick(2400);
    // check
    player.reverse(); // 1400 <-
    // check
    tick(2500);
    // check
    player.reverse(); // 1300 ->
    // check
    tick(3000);
    // check
    player.reverse(); // 1500 (finished) <-
    // check
    tick(4600);
    // check
    player.reverse(); // 0 (finished) ->
    // check
  });

  test('reversing works as expected with an empty AnimationSequence inside an AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqWithEmptySeq_source);
    // check: player,
    //        player.childPlayers[0]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    player.reverse();
    // check
  });

  test('reversing works as expected with an empty AnimationGroup inside an AnimationSequence', function() {
    tick(0);
    var player = document.timeline.play(this.seqWithEmptyGroup_source);
    // check: player,
    //        player.childPlayers[0]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    player.reverse();
    // check
  });

  test('reversing works as expected with an empty AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupEmpty_source);
    // check: player
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    player.reverse();
    // check
  });

  test('reversing works as expected with a simple AnimationGroup', function() {
    tick(0);
    console.log(this.groupSimple_source);
    var player = document.timeline.play(this.groupSimple_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.reverse(); // 200 <-
    // check
    tick(300);
    // check
    player.reverse(); // 100 ->
    // check
    tick(1000);
    // check
    player.reverse(); // 500 (finished) <-
    // check
    tick(1600);
    // check
    player.reverse(); // 0 (finished) ->
    // check
  });

  test('reversing works as expected with an AnimationSequence inside an AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupWithSeq_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1],
    //        player.childPlayers[2],
    //        player.childPlayers[2].childPlayers[0],
    //        player.childPlayers[2].childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    // assert.equal(player.childPlayers[2].startTime, X);
    // assert.equal(player.childPlayers[2].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.reverse(); // 200 <-
    // check
    tick(300);
    // check
    player.reverse(); // 100 ->
    // check
    tick(1000);
    // check
    player.reverse(); // 800 <-
    // check
    tick(1400);
    // check
    player.reverse(); // 400 ->
    // check
    tick(2200);
    // check
    player.reverse(); // 1000 (finished) <-
    // check
    tick(3300);
    // check
    player.reverse(); // 0 (finished) ->
    // check
  });

  test('reversing works as expected with an AnimationGroup inside an AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupWithGroup_source);
    // check: player,
    //        player.childPlayers[0],
    //        player.childPlayers[1],
    //        player.childPlayers[2],
    //        player.childPlayers[2].childPlayers[0],
    //        player.childPlayers[2].childPlayers[1]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[1].currentTime, X);
    // assert.equal(player.childPlayers[2].startTime, X);
    // assert.equal(player.childPlayers[2].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[0].currentTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].startTime, X);
    // assert.equal(player.childPlayers[2].childPlayers[1].currentTime, X);
    tick(200);
    // check
    player.reverse(); // 200 <-
    // check
    tick(300);
    // check
    player.reverse(); // 100 ->
    // check
    tick(1000);
    // check
    player.reverse(); // 500 (finished) <-
    // check
    tick(1600);
    // check
    player.reverse(); // 0 (finished) ->
    // check
  });

  test('reversing works as expected with an empty AnimationSequence inside an AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupWithEmptySeq_source);
    // check: player,
    //        player.childPlayers[0]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    player.reverse();
    // check
  });

  test('reversing works as expected with an empty AnimationGroup inside an AnimationGroup', function() {
    tick(0);
    var player = document.timeline.play(this.groupWithEmptyGroup_source);
    // check: player,
    //        player.childPlayers[0]
    // assert.equal(player.startTime, X);
    // assert.equal(player.currentTime, X);
    // assert.equal(player.childPlayers[0].startTime, X);
    // assert.equal(player.childPlayers[0].currentTime, X);
    player.reverse();
    // check
  });
  // FIXME: Also test reversing while paused?
});
