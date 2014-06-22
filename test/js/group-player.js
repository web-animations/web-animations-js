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

    this.sequenceSource_1 = sequenceEmpty();
    this.sequenceSource_2 = sequenceWithEffects();

    var sequenceTarget_3 = document.createElement('div');
    this.elements.push(sequenceTarget_3);
    this.sequenceSource_3 = new AnimationSequence(
        [
         animationMargin(sequenceTarget_3),
         animationColor(sequenceTarget_3),
         sequenceWithEffects(sequenceTarget_3)
        ]);

    var sequenceTarget_4 = document.createElement('div');
    this.elements.push(sequenceTarget_4);
    this.sequenceSource_4 = new AnimationSequence(
        [
         animationMargin(sequenceTarget_4),
         animationColor(sequenceTarget_4),
         groupWithEffects(sequenceTarget_4)
        ]);

    this.sequenceSource_5 = new AnimationSequence([groupEmpty()]);
    this.sequenceSource_6 = new AnimationSequence([sequenceEmpty()]);


    this.groupSource_1 = groupEmpty();
    this.groupSource_2 = groupWithEffects();

    var groupTarget_3 = document.createElement('div');
    this.elements.push(groupTarget_3);
    this.groupSource_3 = new AnimationGroup(
        [
         animationMargin(groupTarget_3),
         animationColor(groupTarget_3),
         sequenceWithEffects(groupTarget_3)
        ]);

    var groupTarget_4 = document.createElement('div');
    this.elements.push(groupTarget_4);
    this.groupSource_4 = new AnimationGroup(
        [
         animationMargin(groupTarget_4),
         animationColor(groupTarget_4),
         groupWithEffects(groupTarget_4)
        ]);

    this.groupSource_5 = new AnimationGroup([groupEmpty()]);
    this.groupSource_6 = new AnimationGroup([sequenceEmpty()]);
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

  function complexAnimationTree(createLeaf) {
    // The following animation structure looks like:
    // 44444
    // 11
    //   33
    //   2
    // 0
    return new AnimationGroup([
      createLeaf('4px', 5),
      new AnimationSequence([
        createLeaf('1px', 2),
        new AnimationGroup([
          createLeaf('3px', 2),
          createLeaf('2px', 1),
        ]),
      ]),
      createLeaf('0px', 1),
    ]);
  }

  test('complex animation tree timing while playing', function() {
    function createLeaf(value, duration) {
      return new Animation(document.body, [], duration);
    }
    tick(100);
    var player = document.timeline.play(complexAnimationTree(createLeaf));
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
    var target = document.createElement('div');
    document.documentElement.appendChild(target);
    function createLeaf(value, duration) {
      return new Animation(target, [{marginLeft: value}, {marginLeft: value}], duration);
    }
    tick(0);
    var player = document.timeline.play(complexAnimationTree(createLeaf));
    player.currentTime = 0;
    assert.equal(getComputedStyle(target).marginLeft, '0px');
    player.currentTime = 1;
    checkTimes(player, [-1, 1], [[-1, 1, 0], [[-1, 1, 0], [[1, -1, 0], [1, -1, 0]]], [-1, 1, 0]]);
    assert.equal(getComputedStyle(target).marginLeft, '1px');
    player.currentTime = 2;
    checkTimes(player, [-2, 2], [[-2, 2, 0], [[-2, 2, 0], [[0, 0, 0], [0, 0, 0]]], [-2, 1, 0]]);
    assert.equal(getComputedStyle(target).marginLeft, '2px');
    player.currentTime = 3;
    assert.equal(getComputedStyle(target).marginLeft, '3px');
    player.currentTime = 4;
    assert.equal(getComputedStyle(target).marginLeft, '4px');
    player.currentTime = 5;
    assert.equal(getComputedStyle(target).marginLeft, '0px');
    target.remove();
  });

});
