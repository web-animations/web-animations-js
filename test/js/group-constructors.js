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
});
