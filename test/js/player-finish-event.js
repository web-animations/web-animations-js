suite('player-finish-event', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.documentElement.appendChild(this.element);
    this.player = this.element.animate([], 1000);
  });
  teardown(function() {
    this.element.remove();
  });


  test('finish event fires when player completes', function(done) {
    var ready = false;
    var fired = false;
    this.player.onfinish = function() {
      assert(ready, 'must not be called synchronously');
      if (fired)
        assert(false, 'must not get fired twice');
      fired = true;
      done();
    };
    tick(0);
    tick(1000);
    tick(2000);
    ready = true;
  });
});
