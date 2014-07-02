suite('element.animate', function() {
  test('element.getAnimationPlayers', function() {
    assert.equal(document.body.getAnimationPlayers().length, 0);

    var player = document.body.animate([], {duration: 1000});
    tick(200);
    assert.equal(document.body.getAnimationPlayers().length, 1);

    document.head.animate([], {duration: 500});
    assert.equal(document.body.getAnimationPlayers().length, 1);

    tick(1600);
    assert.equal(document.body.getAnimationPlayers().length, 0);
  });
});
