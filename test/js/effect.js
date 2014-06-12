suite('effect', function() {
  setup(function() {
    var keyframes = [{left: '0px'}, {left: '100px'}];
    this.effect = convertEffectInput(keyframes);
    this.element = document.createElement('div');
  });
  test('apply effect', function() {
    this.effect(this.element, 0.5);
    assert.equal(this.element.style.left, '50px');
  });
  test('apply and clear effect', function() {
    this.effect(this.element, 0.5);
    this.effect(this.element, null);
    assert.equal(this.element.style.left, '');
  });
});
