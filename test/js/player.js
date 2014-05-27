suite('player', function() {
  test('reversing works as expected', function() {
    var p = document.body.animate([], 1000);
    var startTime = p.startTime;
    assert.equal(p.endTime, startTime + 1000);
    p.currentTime = 300;
    assert.equal(p.startTime, startTime - 300);
    assert.equal(p.endTime, startTime + 700);
    p.reverse();
    assert.equal(p.startTime, startTime - 700);
    assert.equal(p.currentTime, 700);
    assert.equal(p.endTime, startTime + 300);
  });
});
