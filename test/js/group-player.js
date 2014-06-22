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
    var animationColor = function(target) {
      return new Animation(
          target,
          [
           {backgroundColor: 'black'},
           {backgroundColor: 'white'}
          ],
          500);
    };
    var staticAnimation = function(target, value, duration) {
      return new Animation(target, [{marginLeft: value}, {marginLeft: value}], duration);
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

    this.seqEmpty_source = sequenceEmpty();

    var seqSimple_target = document.createElement('div');
    this.seqSimple_source = sequenceWithEffects(seqSimple_target);

    var seqWithSeq_target = document.createElement('div');
    this.elements.push(seqWithSeq_target);
    this.seqWithSeq_source = new AnimationSequence(
        [
         animationMargin(seqWithSeq_target),
         animationColor(seqWithSeq_target),
         sequenceWithEffects(seqWithSeq_target)
        ]);

    var seqWithGroup_target = document.createElement('div');
    this.elements.push(seqWithGroup_target);
    this.seqWithGroup_source = new AnimationSequence(
        [
         animationMargin(seqWithGroup_target),
         animationColor(seqWithGroup_target),
         groupWithEffects(seqWithGroup_target)
        ]);

    this.seqWithEmptyGroup_source = new AnimationSequence([groupEmpty()]);
    this.seqWithEmptySeq_source = new AnimationSequence([sequenceEmpty()]);


    this.groupEmpty_source = groupEmpty();

    var groupSimple_target = document.createElement('div');
    this.groupSimple_source = groupWithEffects(groupSimple_target);

    var groupWithSeq_target = document.createElement('div');
    this.elements.push(groupWithSeq_target);
    this.groupWithSeq_source = new AnimationGroup(
        [
         animationMargin(groupWithSeq_target),
         animationColor(groupWithSeq_target),
         sequenceWithEffects(groupWithSeq_target)
        ]);

    var groupWithGroup_target = document.createElement('div');
    this.elements.push(groupWithGroup_target);
    this.groupWithGroup_source = new AnimationGroup(
        [
         animationMargin(groupWithGroup_target),
         animationColor(groupWithGroup_target),
         groupWithEffects(groupWithGroup_target)
        ]);

    this.groupWithEmptyGroup_source = new AnimationGroup([groupEmpty()]);
    this.groupWithEmptySeq_source = new AnimationGroup([sequenceEmpty()]);

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

  // topTimes and restOfTimes contain duplets (startTime, currentTime)
  // and triplets (startTime, currentTime, startOffset)
  function checkTimes(player, topTimes, restOfTimes, description) {
    description = description ? (description + ' ') : '';
    _checkTimes(player, topTimes, 0, description + 'toplevel');
    _checkTimes(player, restOfTimes, 0, description + 'internals');
  }

  function _checkTimes(player, timingList, index, trace) {
    if (timingList.length == 0) {
      return;
    }
    if (timingList[0] == null || typeof timingList[0] == 'number') {
      assert.equal(player._startTime, timingList[0], trace + ' startTime');
      assert.equal(player.currentTime, timingList[1], trace + ' currentTime');
      if (timingList.length == 3)
        assert.equal(player._startOffset, timingList[2], trace + ' startOffset');
    } else {
      _checkTimes(player.childPlayers[index], timingList[0], 0, trace + ' ' + index);
      _checkTimes(player, timingList.slice(1), index + 1, trace);
    }
  }

  test('playing an animationGroup works as expected', function() {
    tick(100);
    var p = document.timeline.play(simpleAnimationGroup());
    checkTimes(p, [100, 0], [[100, 0, 0], [100, 0, 0], [100, 0, 0]]);
    tick(300);
    checkTimes(p, [100, 200], [[100, 200], [100, 200], [100, 200]]);
    tick(1200);
    checkTimes(p, [100, 1100], [[100, 1100], [100, 1000], [100, 1100]]);
    tick(2200);
    checkTimes(p, [100, 2100], [[100, 2000], [100, 1000], [100, 2100]]);
    tick(3200);
    // TODO Limit toplevel currentTime
    checkTimes(p, [100, 3100], [[100, 2000], [100, 1000], [100, 3000]]);
  });

  test('playing an animationSequence works as expected', function() {
    tick(110);
    var p = document.timeline.play(simpleAnimationSequence());
    checkTimes(p, [110, 0], [[110, 0], [2110, -2000, 2000], [3110, -3000, 3000]]);
    tick(210);
    checkTimes(p, [110, 100], [[110, 100], [2110, -1900, 2000], [3110, -2900, 3000]]);
  });

  test('complex animation tree timing while playing', function() {
    tick(100);
    var player = document.timeline.play(this.complexSource);
    checkTimes(player, [100, 0], [
      [100, 0, 0], [ // 4
        [100, 0, 0], [ // 1
          [102, -2, 0], // 3
          [102, -2, 0]]], // 2
      [100, 0, 0], // 0
    ], 't = 100');
    tick(101);
    checkTimes(player, [100, 1], [
      [100, 1, 0], [ // 4
        [100, 1, 0], [ // 1
          [102, -1, 0], // 3
          [102, -1, 0]]], // 2
      [100, 1, 0], // 0
    ], 't = 101');
    tick(102);
    checkTimes(player, [100, 2], [
      [100, 2, 0], [ // 4
        [100, 2, 0], [ // 1
          [102, 0, 0], // 3
          [102, 0, 0]]], // 2
      [100, 1, 0], // 0
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
    checkTimes(player, [-2, 2], [[-2, 2, 0], [[-2, 2, 0], [[0, 0, 0], [0, 0, 0]]], [-2, 1, 0]]);
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
    tick(3);
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '3px');
    player.cancel();
    assert.equal(player.currentTime, 0);
    assert.equal(getComputedStyle(this.complexTarget).marginLeft, '0px');
  });

});
