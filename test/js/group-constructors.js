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

  test('animation getter for children in groups works as expected', function() {
    var anim = document.timeline.play(simpleGroupEffect());
    tick(0);
    assert.equal(anim.effect.animation, anim);
    assert.equal(anim._childAnimations[0].effect.animation, anim);
    assert.equal(anim._childAnimations[1].effect.animation, anim);
    tick(2100);
    assert.equal(anim._childAnimations[1]._childAnimations[0].effect.animation, anim);
    assert.equal(anim._childAnimations[1]._childAnimations[1].effect.animation, anim);
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
  });
});
