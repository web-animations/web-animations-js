suite('group-constructors', function() {
  function simpleGroupEffect() {
    return new SequenceEffect([
      new KeyframeEffect(document.body, [], 2000),
      new GroupEffect([
        new KeyframeEffect(document.body, [], 2000),
        new KeyframeEffect(document.body, [], 1000)
      ])
    ]);
  }

  test('associated animations for children in groups are correct', function() {
    var anim = document.timeline.play(simpleGroupEffect());
    tick(0);
    assert.equal(anim.effect._animation, anim);
    assert.equal(anim._childAnimations[0].effect._animation, anim);
    assert.equal(anim._childAnimations[1].effect._animation, anim);
    tick(2100);
    assert.equal(anim._childAnimations[1]._childAnimations[0].effect._animation, anim);
    assert.equal(anim._childAnimations[1]._childAnimations[1].effect._animation, anim);
  });

  test('firstChild and lastChild getters work', function() {
    var child1 = new KeyframeEffect(null, [], 100);
    var child2 = new GroupEffect([]);

    var seqParent = new SequenceEffect([child1, child2]);
    assert.equal(seqParent.firstChild, child1, 'first child of a SequenceEffect');
    assert.equal(seqParent.lastChild, child2, 'last child of a SequenceEffect');

    var emptySeqParent = new SequenceEffect([]);
    assert.equal(emptySeqParent.firstChild, null, 'first child of an empty SequenceEffect');
    assert.equal(emptySeqParent.lastChild, null, 'last child of an empty SequenceEffect');

    var groupParent = new GroupEffect([child1, child2]);
    assert.equal(groupParent.firstChild, child1, 'first child of a GroupEffect');
    assert.equal(groupParent.lastChild, child2, 'last child of a GroupEffect');

    var emptyGroupParent = new GroupEffect([]);
    assert.equal(emptyGroupParent.firstChild, null, 'first child of an empty GroupEffect');
    assert.equal(emptyGroupParent.lastChild, null, 'last child of an empty GroupEffect');
  });

  test('Cloning a SequenceEffect works', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);

    var keyframeEffect1 = new KeyframeEffect(target1, [{opacity: 1}, {opacity: 0}], {duration: 100, fill: 'none'});
    var keyframeEffect2 = keyframeEffect1.clone();
    var sequenceEffect1 = new SequenceEffect([keyframeEffect1, keyframeEffect2]);
    var sequenceEffect2 = sequenceEffect1.clone();
    var sequenceEffectParent = new SequenceEffect([sequenceEffect1, sequenceEffect2]);

    assert.equal(sequenceEffectParent.activeDuration, 400);

    var animation = document.timeline.play(sequenceEffectParent);
    tick(0);
    tick(25);
    assert.equal(getComputedStyle(target1).opacity, 0.75);
    tick(75);
    assert.equal(getComputedStyle(target1).opacity, 0.25);

    tick(125);
    assert.equal(getComputedStyle(target1).opacity, 0.75);
    tick(175);
    assert.equal(getComputedStyle(target1).opacity, 0.25);

    tick(225);
    assert.equal(getComputedStyle(target1).opacity, 0.75);
    tick(275);
    assert.equal(getComputedStyle(target1).opacity, 0.25);

    tick(325);
    assert.equal(getComputedStyle(target1).opacity, 0.75);
    tick(375);
    assert.equal(getComputedStyle(target1).opacity, 0.25);
    tick(400);
    assert.equal(getComputedStyle(target1).opacity, 1);
    animation.cancel();
  });

  test('append and prepend work', function() {
    var child1 = new KeyframeEffect(null, [], 100);
    var child2 = new GroupEffect([]);

    var seqParentAp = new SequenceEffect([child1]);
    seqParentAp.append(child2);
    assert.equal(seqParentAp.firstChild, child1, 'first child of a SequenceEffect after appending 1 child');
    assert.equal(seqParentAp.lastChild, child2, 'last child of a SequenceEffect after appending 1 child');

    var emptyGroupParentAp = new GroupEffect([]);
    emptyGroupParentAp.append(child2, child1);
    assert.equal(emptyGroupParentAp.firstChild, child2, 'first child of a GroupEffect after appending 2 children');
    assert.equal(emptyGroupParentAp.lastChild, child1, 'last child of a GroupEffect after appending 2 children');

    var groupParentPre = new GroupEffect([child1]);
    groupParentPre.prepend(child2);
    assert.equal(groupParentPre.firstChild, child2, 'first child of a GroupEffect after prepending 1 child');
    assert.equal(groupParentPre.lastChild, child1, 'last child of a GroupEffect after prepending 1 child');

    var emptySeqParentPre = new SequenceEffect([]);
    emptySeqParentPre.prepend(child2, child1);
    assert.equal(emptySeqParentPre.firstChild, child1, 'first child of a SequenceEffect after prepending 2 children');
    assert.equal(emptySeqParentPre.lastChild, child2, 'last child of a SequenceEffect after prepending 2 children');

    var group = new GroupEffect([child1, child2]);
    var seqParent = new SequenceEffect([group]);
    var ex;
    try {
      group.append(seqParent);
    } catch (e) {
      ex = e;
    }
    assert.equal(ex.name, 'HierarchyRequestError', 'Appending an ancestor throws a HierarchyRequestError');

    var groupParent = new GroupEffect([]);
    ex = undefined;
    try {
      groupParent.prepend(groupParent);
    } catch (e) {
      ex = e;
    }
    assert.equal(ex.name, 'HierarchyRequestError', 'Prepending an self throws a HierarchyRequestError');
  });

  test('Playing a child reparents it.', function() {
    var target1 = document.createElement('div');
    var target2 = document.createElement('div');
    document.body.appendChild(target1);
    document.body.appendChild(target2);
    var effect1 = new KeyframeEffect(
        target1,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 8, fill: 'both'});
    var effect2 = new KeyframeEffect(
        target2,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 8, fill: 'both'});
    var group = new GroupEffect([effect1, effect2]);
    var groupAnimation = document.timeline.play(group);
    tick(0);
    assert.equal(getComputedStyle(target1).opacity, 0);
    assert.equal(getComputedStyle(target2).opacity, 0);
    var animation = document.timeline.play(effect1);
    assert.equal(group.children.length, 1);
    assert.equal(effect1._animation, animation);
    assert.equal(effect2._animation, groupAnimation);
    assert.equal(animation.effect, effect1);
    tick(1);
    assert.equal(getComputedStyle(target1).opacity, 0);
    assert.equal(getComputedStyle(target2).opacity, 0.125);
    tick(2);
    assert.equal(getComputedStyle(target1).opacity, 0.125);
    assert.equal(getComputedStyle(target2).opacity, 0.25);
    groupAnimation.cancel();
    tick(3);
    assert.equal(getComputedStyle(target1).opacity, 0.25);
    assert.equal(getComputedStyle(target2).opacity, 1);
    animation.cancel();
    tick(4);
    assert.equal(getComputedStyle(target1).opacity, 1);
    assert.equal(getComputedStyle(target2).opacity, 1);
  });

  test('Remove KeyframeEffect from SequenceEffect parent', function() {
    var target1 = document.createElement('div');
    var target2 = document.createElement('div');
    document.body.appendChild(target1);
    document.body.appendChild(target2);
    var effect1 = new KeyframeEffect(
        target1,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 2, fill: 'both'});
    var effect2 = new KeyframeEffect(
        target2,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 2, fill: 'both'});
    var sequence = new SequenceEffect([effect1, effect2]);
    var animation = document.timeline.play(sequence);
    tick(0);
    assert.equal(getComputedStyle(target1).opacity, 0);
    assert.equal(getComputedStyle(target2).opacity, 0);
    effect1.remove();
    tick(1);
    assert.equal(getComputedStyle(target1).opacity, 1);
    assert.equal(getComputedStyle(target2).opacity, 0.5);
    assert.equal(sequence.children.length, 1);
    assert.equal(sequence._animation, animation);
    assert.equal(effect1._animation, undefined);
    assert.equal(effect2._animation, animation);
    assert.equal(animation.effect, sequence);
    animation.cancel();
    tick(2);
    animation.play();
    tick(3);
    assert.equal(getComputedStyle(target1).opacity, 1);
    assert.equal(getComputedStyle(target2).opacity, 0);
    animation.cancel();
    tick(4);
  });

  test('Remove SequenceEffect from directly associated animation', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);
    var effect1 = new KeyframeEffect(
        target1,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 2, fill: 'both'});
    var sequence = new SequenceEffect([effect1]);
    var animation = document.timeline.play(sequence);
    tick(0);
    assert.equal(getComputedStyle(target1).opacity, 0);
    sequence.remove();
    tick(1);
    assert.equal(getComputedStyle(target1).opacity, 1);
    assert.equal(sequence.children.length, 1);
    assert.equal(sequence._animation, undefined);
    assert.equal(effect1._animation, undefined);
    assert.notEqual(animation.effect, sequence);
    animation.play();
    tick(2);
    assert.equal(getComputedStyle(target1).opacity, 1);
    animation.cancel();
    tick(3);
  });

  test('Remove SequenceEffect from GroupEffect parent', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);
    var effect1 = new KeyframeEffect(
        target1,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 2, fill: 'both'});
    var sequence = new SequenceEffect([effect1]);
    var group = new GroupEffect([sequence]);
    var animation = document.timeline.play(group);
    tick(0);
    assert.equal(getComputedStyle(target1).opacity, 0);
    assert.equal(group.children.length, 1);
    assert.equal(group._animation, animation);
    assert.equal(sequence._animation, animation);
    assert.equal(animation.effect, group);
    sequence.remove();
    tick(1);
    assert.equal(getComputedStyle(target1).opacity, 1);
    assert.equal(sequence.children.length, 1);
    assert.equal(group.children.length, 0);
    assert.equal(group._animation, animation);
    assert.equal(sequence._animation, undefined);
    assert.equal(effect1._animation, undefined);
    assert.equal(animation.effect, group);
    animation.cancel();
    tick(2);
    animation.play();
    tick(3);
    assert.equal(getComputedStyle(target1).opacity, 1);
    animation.cancel();
    tick(4);
  });

  test('Calling remove on reparented effect removes it from directly associated animation', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);
    var effect1 = new KeyframeEffect(
        target1,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 2, fill: 'both'});
    var group = new GroupEffect([effect1]);
    var animation = document.timeline.play(effect1);
    tick(0);
    assert.equal(getComputedStyle(target1).opacity, 0);
    effect1.remove();
    tick(1);
    assert.equal(getComputedStyle(target1).opacity, 1);
    assert.equal(effect1._animation, undefined);
    assert.notEqual(animation.effect, effect1);
    animation.cancel();
    tick(2);
  });

  test('Setting delay on child KeyframeEffect timing', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);
    var target2 = document.createElement('div');
    document.body.appendChild(target2);
    var child1 = new KeyframeEffect(
        target1,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 100});
    var child2 = new KeyframeEffect(
        target2,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 100});
    var sequence = new SequenceEffect([child1, child2]);
    var animation = document.timeline.play(sequence);
    tick(0);
    tick(150);
    assert.closeTo(Number(getComputedStyle(target2).opacity), 0.5, 0.001, 't=150 before setting delay');
    child1.timing.delay = 20;
    assert.closeTo(Number(getComputedStyle(target2).opacity), 0.3, 0.001, 't=150 after setting delay');
  });

  test('Setting endDelay on child KeyframeEffect timing', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);
    var target2 = document.createElement('div');
    document.body.appendChild(target2);
    var child1 = new KeyframeEffect(
        target1,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 100});
    var child2 = new KeyframeEffect(
        target2,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 100});
    var sequence = new SequenceEffect([child1, child2]);
    var animation = document.timeline.play(sequence);
    tick(0);
    tick(150);
    assert.closeTo(Number(getComputedStyle(target2).opacity), 0.5, 0.001, 't=150 before setting endDelay');
    child1.timing.endDelay = 20;
    assert.closeTo(Number(getComputedStyle(target2).opacity), 0.3, 0.001, 't=150 after setting endDelay');
  });

  test('Setting duration on child KeyframeEffect timing', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);
    var target2 = document.createElement('div');
    document.body.appendChild(target2);
    var child1 = new KeyframeEffect(
        target1,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 100, fill: 'both'});
    var child2 = new KeyframeEffect(
        target2,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 100, fill: 'both'});
    var sequence = new SequenceEffect([child1, child2]);
    var animation = document.timeline.play(sequence);
    tick(0);
    tick(125);
    assert.closeTo(Number(getComputedStyle(target1).opacity), 1, 0.001, 'target1 at t=125 before setting duration');
    assert.closeTo(Number(getComputedStyle(target2).opacity), 0.25, 0.001, 'target2 at t=125 before setting duration');
    child1.timing.duration = 50;
    assert.closeTo(Number(getComputedStyle(target1).opacity), 1, 0.001, 'target1 at t=125 after setting duration');
    assert.closeTo(Number(getComputedStyle(target2).opacity), 0.75, 0.001, 'target2 at t=125 after setting duration');
  });

  test('Setting iterations on child KeyframeEffect timing', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);
    var target2 = document.createElement('div');
    document.body.appendChild(target2);
    var child1 = new KeyframeEffect(
        target1,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 100, fill: 'both'});
    var child2 = new KeyframeEffect(
        target2,
        [
          {opacity: 0},
          {opacity: 1}
        ],
        {duration: 100, fill: 'both'});
    var sequence = new SequenceEffect([child1, child2]);
    var animation = document.timeline.play(sequence);
    tick(0);
    tick(125);
    assert.closeTo(Number(getComputedStyle(target1).opacity), 1, 0.001, 'target1 at t=125 before setting iterations');
    assert.closeTo(Number(getComputedStyle(target2).opacity), 0.25, 0.001, 'target2 at t=125 before setting iterations');
    child1.timing.iterations = 2;
    assert.closeTo(Number(getComputedStyle(target1).opacity), 0.25, 0.001, 'target1 at t=125 after setting iterations');
    assert.closeTo(Number(getComputedStyle(target2).opacity), 0, 0.001, 'target2 at t=125 after setting iterations');
  });

  test('Setting fill on SequenceEffect timing', function() {
    var target1 = document.createElement('div');
    document.body.appendChild(target1);
    var target2 = document.createElement('div');
    document.body.appendChild(target2);
    var child1 = new KeyframeEffect(
        target1,
        [
          {opacity: 1},
          {opacity: 0}
        ],
        {duration: 100, fill: 'both'});
    var child2 = new KeyframeEffect(
        target2,
        [
          {opacity: 1},
          {opacity: 0}
        ],
        {duration: 100, fill: 'both'});
    var sequence = new SequenceEffect([child1, child2], {fill: 'none'});
    var animation = document.timeline.play(sequence);
    tick(0);
    tick(250);
    assert.equal(Number(getComputedStyle(target1).opacity), 1, 'target1 at t=250 before setting fill');
    assert.equal(Number(getComputedStyle(target2).opacity), 1, 'target2 at t=250 before setting fill');
    sequence.timing.fill = 'both';
    assert.equal(Number(getComputedStyle(target1).opacity), 0, 'target1 at t=250 after setting fill');
    assert.equal(Number(getComputedStyle(target2).opacity), 0, 'target2 at t=250 after setting fill');
  });
});
