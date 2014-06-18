suite('player-finish-event', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.documentElement.appendChild(this.element);
    this.player = this.element.animate([], 1000);
  });
  teardown(function() {
    this.element.remove();
  });

  test('fire when player completes', function(done) {
    var ready = false;
    var fired = false;
    var player = this.player;
    player.onfinish = function(event) {
      assert(ready, 'must not be called synchronously');
      assert.equal(this, player);
      assert.equal(event.target, player);
      assert.equal(event.currentTime, 1000);
      assert.equal(event.timelineTime, 1100);
      if (fired)
        assert(false, 'must not get fired twice');
      fired = true;
      done();
    };
    tick(100);
    tick(1100);
    tick(2100);
    ready = true;
  });

  test('fire after player is cancelled', function(done) {
    this.player.onfinish = function(event) {
      assert.equal(event.currentTime, 0);
      assert.equal(event.timelineTime, 1, 'event must be fired on next sample');
      done();
    };
    tick(0);
    this.player.cancel();
    tick(1);
  });

  // TODO:
  // Test firing in reverse.
  // Test firing multiple event listeners.
});
