suite('apply-preserving-inline-style-methods', function() {
  setup(function() {
    this.element = document.createElement('div');
    ensureStyleIsPatched(this.element);
    this.style = this.element.style;
    document.documentElement.appendChild(this.element);
  });
  teardown(function() {
    this.element.remove();
  });

  test('Style is patched', function() {
    assert(this.element._webAnimationsPatchedStyle);
  });
  test('Setting animated style', function() {
    this.style.setProperty('margin-left', '0px');
    this.element.style._set('margin-left', '100px');
    assert.equal(this.style.getPropertyValue('margin-left'), '0px');
  });
  test('Clearing animated style', function() {
    this.style.setProperty('margin-left', '0px');
    this.element.style._set('margin-left', '100px');
    this.element.style._clear('margin-left');
    assert.equal(this.style.getPropertyValue('margin-left'), '0px');
  });
  test('Patched setProperty/getPropertyValue', function() {
    this.style._set('margin-left', '100px');
    this.style.setProperty('margin-left', '0px');
    this.style.setProperty('background-color', 'rgb(1, 2, 3)');
    assert.equal(this.style.getPropertyValue('margin-left'), '0px');
    assert.equal(this.style.getPropertyValue('background-color'), 'rgb(1, 2, 3)');
    assert.equal(getComputedStyle(this.element).marginLeft, '100px');
    assert.equal(getComputedStyle(this.element).backgroundColor, 'rgb(1, 2, 3)');
  });
  test('Patched item()', function() {
    this.style._set('margin-left', '100px');
    this.style.setProperty('top', '0px');
    this.style.setProperty('background-color', 'rgb(1, 2, 3)');
    assert.equal(this.style.item(0), 'top');
    assert.equal(this.style.item(1), 'background-color');
    assert.equal(this.style.item(2), '');
  });
});
