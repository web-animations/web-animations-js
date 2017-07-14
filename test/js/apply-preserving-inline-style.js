suite('apply-preserving-inline-style', function() {
  setup(function() {
    this.element = document.createElement('div');
    ensureStyleIsPatched(this.element);
    this.style = this.element.style;
    document.documentElement.appendChild(this.element);
    this.svgContainer = document.createElementNS(
        'http://www.w3.org/2000/svg', 'svg');
    document.documentElement.appendChild(this.svgContainer);
    delete window._webAnimationsUpdateSvgTransformAttr;
  });
  teardown(function() {
    document.documentElement.removeChild(this.element);
    document.documentElement.removeChild(this.svgContainer);
    delete window._webAnimationsUpdateSvgTransformAttr;
  });

  test('Style is patched', function() {
    assert(this.element._webAnimationsPatchedStyle);
  });
  test('Setting animated style', function() {
    this.style.left = '0px';
    this.element.style._set('left', '100px');
    assert.equal(this.style.left, '0px');
  });
  test('Clearing animated style', function() {
    this.style.left = '0px';
    this.element.style._set('left', '100px');
    this.element.style._clear('left');
    assert.equal(this.style.left, '0px');
  });
  test('Patched length', function() {
    this.element.style._set('left', '100px');
    this.style.cssText = 'left: 0px; background-color: green;';
    assert.equal(this.style.cssText, 'left: 0px; background-color: green;');
    assert.equal(this.style.left, '0px');
    assert.equal(this.style.backgroundColor, 'green');
    assert.equal(this.style.length, 2);
  });
  test('Patched property getters and setters', function() {
    this.style._set('left', '100px');
    this.style.left = '0px';
    this.style.backgroundColor = 'rgb(1, 2, 3)';
    assert.equal(this.style.left, '0px');
    assert.equal(this.style.backgroundColor, 'rgb(1, 2, 3)');
    assert.equal(getComputedStyle(this.element).left, '100px');
    assert.equal(getComputedStyle(this.element).backgroundColor, 'rgb(1, 2, 3)');
  });
  test('Patched setProperty/getPropertyValue', function() {
    this.style._set('left', '100px');
    this.style.setProperty('left', '0px');
    this.style.setProperty('background-color', 'rgb(1, 2, 3)');
    assert.equal(this.style.getPropertyValue('left'), '0px');
    assert.equal(this.style.getPropertyValue('background-color'), 'rgb(1, 2, 3)');
    assert.equal(getComputedStyle(this.element).left, '100px');
    assert.equal(getComputedStyle(this.element).backgroundColor, 'rgb(1, 2, 3)');
  });
  test('Patched item()', function() {
    this.style._set('left', '100px');
    this.style.setProperty('left', '0px');
    this.style.setProperty('background-color', 'rgb(1, 2, 3)');
    assert.equal(this.style.item(0), 'left');
    assert.equal(this.style.item(1), 'background-color');
    assert.equal(this.style.item(2), '');
    this.style.cssText = 'top: 0px';
    assert.equal(this.style.item(0), 'top');
    assert.equal(this.style.item(1), '');
  });
  test('Patched cssText', function() {
    this.style._set('left', '100px');
    assert.equal(this.style.length, 0);
    this.style.setProperty('left', '0px');
    this.style.setProperty('background-color', 'rgb(1, 2, 3)');
    assert.equal(this.style.length, 2);
    this.style.cssText = 'top: 0px';
    assert.equal(this.style.length, 1);
  });
  test('Detect SVG transform compatibility', function() {
    var element = document.createElement('div');
    var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    function check(userAgent, shouldUpdateSvgTransformAttr) {
      var win = {navigator: {userAgent: userAgent}};
      // Non-SVG element is never updated.
      assert.equal(updateSvgTransformAttr(win, element), false);
      // SVG element may be updated as tested.
      assert.equal(updateSvgTransformAttr(win, svgElement),
          shouldUpdateSvgTransformAttr);
    }
    // Unknown data: assume that transforms supported.
    check('', false);
    // Chrome: transforms supported.
    check('Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E)' +
        ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.20' +
        ' Mobile Safari/537.36',
        false);
    // Safari: transforms supported.
    check('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) ' +
        'AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 ' +
        'Safari/7046A194A',
        false);
    // Firefox: transforms supported.
    check('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) ' +
        'Gecko/20100101 Firefox/40.1',
        false);
    // IE: transforms are NOT supported.
    check('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 7.0;' +
        ' InfoPath.3; .NET CLR 3.1.40767; Trident/6.0; en-IN)',
        true);
    // Edge: transforms are NOT supported.
    check('Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36' +
        ' (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36' +
        ' Edge/12.10136',
        true);
    // ICS Android: transforms are NOT supported.
    check('Mozilla/5.0 (Linux; U; Android 4.0.4; en-gb; MZ604 Build/I.7.1-45)' +
        ' AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30',
        true);
  });
  test('Set and clear transform', function() {
    // This is not an SVG element, so CSS transform support is not consulted.
    window._webAnimationsUpdateSvgTransformAttr = true;
    // Set.
    this.element.style._set('transform', 'translate(10px, 10px) scale(2)');
    assert.equal(getComputedStyle(this.element).transform,
        'matrix(2, 0, 0, 2, 10, 10)');
    assert.equal(this.element.hasAttribute('transform'), false);
    // Clear.
    this.element.style._clear('transform');
    assert.equal(getComputedStyle(this.element).transform, 'none');
    assert.equal(this.element.hasAttribute('transform'), false);
  });
  test('Set and clear supported transform on SVG element', function() {
    window._webAnimationsUpdateSvgTransformAttr = false;
    var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    ensureStyleIsPatched(svgElement);
    this.svgContainer.appendChild(svgElement);
    // Set.
    svgElement.style._set('transform', 'translate(10px, 10px) scale(2)');
    assert.equal(getComputedStyle(svgElement).transform,
        'matrix(2, 0, 0, 2, 10, 10)');
    assert.equal(svgElement.hasAttribute('transform'), false);
    // Clear.
    svgElement.style._clear('transform');
    assert.equal(getComputedStyle(svgElement).transform, 'none');
    assert.equal(svgElement.hasAttribute('transform'), false);
  });
  test('Set and clear transform CSS property not supported on SVG element', function() {
    window._webAnimationsUpdateSvgTransformAttr = true;
    var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    ensureStyleIsPatched(svgElement);
    this.svgContainer.appendChild(svgElement);
    // Set.
    svgElement.style._set('transform', 'translate(10px, 10px) scale(2)');
    assert.equal(getComputedStyle(svgElement).transform,
        'matrix(2, 0, 0, 2, 10, 10)');
    assert.equal(svgElement.getAttribute('transform'),
        'matrix(2 0 0 2 10 10)');
    // Clear.
    svgElement.style._clear('transform');
    assert.equal(getComputedStyle(svgElement).transform, 'none');
    assert.equal(svgElement.getAttribute('transform'), null);
  });
  test('Set and clear prefixed transform CSS property not supported on SVG element', function() {
    window._webAnimationsUpdateSvgTransformAttr = true;
    var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    ensureStyleIsPatched(svgElement);
    this.svgContainer.appendChild(svgElement);
    // Set.
    svgElement.style._set('msTransform', 'translate(10px, 10px) scale(2)');
    assert.equal(svgElement.getAttribute('transform'),
        'matrix(2 0 0 2 10 10)');
    // Clear.
    svgElement.style._clear('msTransform');
    assert.equal(svgElement.getAttribute('transform'), null);
  });
  test('Restore transform CSS property not supported on SVG element', function() {
    window._webAnimationsUpdateSvgTransformAttr = true;
    var svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    svgElement.setAttribute('transform', 'matrix(2 0 0 2 0 0)');
    ensureStyleIsPatched(svgElement);
    this.svgContainer.appendChild(svgElement);
    // Set.
    svgElement.style._set('transform', 'translate(10px, 10px) scale(2)');
    assert.equal(getComputedStyle(svgElement).transform,
        'matrix(2, 0, 0, 2, 10, 10)');
    assert.equal(svgElement.getAttribute('transform'),
        'matrix(2 0 0 2 10 10)');
    // Clear.
    svgElement.style._clear('transform');
    assert.equal(getComputedStyle(svgElement).transform, 'none');
    assert.equal(svgElement.getAttribute('transform'), 'matrix(2 0 0 2 0 0)');
  });
});
