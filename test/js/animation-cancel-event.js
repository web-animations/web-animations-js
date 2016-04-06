suite('animation-cancel-event', function() {
  setup(function() {
    this.element = document.createElement('div');
    document.documentElement.appendChild(this.element);
    this.animation = this.element.animate([], 1000);
  });
  teardown(function() {
    if (this.element.parent)
      this.element.removeChild(this.target);
  });

  test('fire when animation cancelled', function(done) {
    var ready = false;
    var fired = false;
    var animation = this.animation;
    animation.oncancel = function(event) {
      assert(ready, 'must not be called synchronously');
      assert.equal(this, animation);
      assert.equal(event.target, animation);
      assert.equal(event.currentTime, null);
      assert.equal(event.timelineTime, 100);
      if (fired)
        assert(false, 'must not get fired twice');
      fired = true;
      done();
    };
    tick(100);
    animation.cancel();
    tick(1100);
    tick(2100);
    ready = true;
  });

  test('finish event must not fire when animation cancelled', function(done) {
    this.animation.onfinish = function(event) {
      assert(false, 'must not get fired');
    };
    this.animation.oncancel = function(event) {
      done();
    };
    tick(0);
    this.animation.cancel();
    tick(1100);
  });

  test('cancel event must not fire when animation finishes', function(done) {
    this.animation.onfinish = function(event) {
      done();
    };
    this.animation.oncancel = function(event) {
      assert(false, 'must not get fired');
    };
    tick(0);
    tick(1100);
  });

  test('multiple event listeners', function(done) {
    var count = 0;
    function createHandler(expectedCount) {
      return function() {
        count++;
        assert.equal(count, expectedCount);
      };
    }
    var toRemove = createHandler(0);
    this.animation.addEventListener('cancel', createHandler(1));
    this.animation.addEventListener('cancel', createHandler(2));
    this.animation.addEventListener('cancel', toRemove);
    this.animation.addEventListener('cancel', createHandler(3));
    this.animation.removeEventListener('cancel', toRemove);
    this.animation.oncancel = function() {
      assert.equal(count, 3);
      done();
    };
    tick(0);
    this.animation.cancel();
    tick(1000);
  });
});
