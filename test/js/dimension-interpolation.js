suite('dimension-interpolation', function() {
  test('parse simple length values', function() {
    assert.deepEqual(parseLength(' 0 '), {px: 0});
    assert.deepEqual(parseLength('10px'), {px: 10});
    assert.deepEqual(parseLength('5VmIN'), {vmin: 5});
    assert.deepEqual(parseLength('-12.5em'), {em: -12.5});
  });
  test('parse length calcs', function() {
    assert.deepEqual(parseLength('calc(10px*3) '),
        {px: 30});
    assert.deepEqual(parseLength('calc(10vmin + -5in) '),
        {vmin: 10, 'in': -5});
    assert.deepEqual(parseLength('calc(5EM + 10px) '),
        {em: 5, px: 10});
    assert.deepEqual(parseLength(' calc( 10px + 5em ) '),
        {px: 10, em: 5});
    assert.deepEqual(parseLength('calc(5*(10px + 5em) - 5.25em * 6)'),
        {px: 50.0, em: -6.5});
    assert.deepEqual(parseLength('calc((5px + 2px)*(1 + 2*(4 + 2*-5)) + 7px - (5em + 6vw/2)*4)'),
        {px: -70, em: -20, vw: -12});
    assert.deepEqual(parseLength('calc(calc(5px) + calc(((3))) *calc(calc(10px)))'),
        {px: 35});
  });
  test('invalid lengths fail to parse', function() {
    assert.isUndefined(parseLength('10'));
    assert.isUndefined(parseLength('()'));
    assert.isUndefined(parseLength('(10px)'));
    assert.isUndefined(parseLength('(10px + 5em)'));
    assert.isUndefined(parseLength('calc(10px + 5)'));
    assert.isUndefined(parseLength('calc(10px+ 5em)'));
    assert.isUndefined(parseLength('calc(10px +5em)'));
    assert.isUndefined(parseLength('calc(10px * 5em)'));
    assert.isUndefined(parseLength('(calc(10px + 5em))'));
    assert.isUndefined(parseLength('calc(10px + 5em))'));
    assert.isUndefined(parseLength('calc(10)'));
    assert.isUndefined(parseLength('calccalc(10px)'));
    assert.isUndefined(parseLength('calc(5 / 10px)'));
    assert.isUndefined(parseLength('calc(10px / 0)'));
    assert.isUndefined(parseLength('calc()'));
    assert.isUndefined(parseLength('ch'));
  });
  test('interpolate lengths and percents', function() {
    assert.equal(propertyInterpolation('left', '10px', '50px')(0.25), '20px');
    assert.equal(propertyInterpolation('left', '10%', '50%')(0.25), '20%');
    assert.equal(propertyInterpolation('left', '0px', '0.001px')(0.05), '0px');
    assert.equal(propertyInterpolation('left', '0px', '10px')(0.234), '2.340px');
    assert.equal(propertyInterpolation('left', '10px', '10em')(0.4), 'calc(6px + 4em)');
    assert.equal(propertyInterpolation('left', '10px', '10%')(0.4), 'calc(6px + 4%)');
    assert.equal(propertyInterpolation('left', 'calc(10px + 5em)', 'calc(20px + 35em)')(0.4), 'calc(14px + 17em)');
    assert.equal(propertyInterpolation('left', 'calc(10px + 5em)', 'calc(20% + 35em)')(0.4), 'calc(6px + 17em + 8%)');
    assert.equal(propertyInterpolation('left', 'calc(10px + 5vw)', 'calc(20% + 35em)')(0.4), 'calc(6px + 3vw + 8% + 14em)');
  });
});
