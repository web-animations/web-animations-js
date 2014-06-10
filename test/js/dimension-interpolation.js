suite('dimension-interpolation', function() {
  setup(function() {
    this.convert = convertDimension.bind(null, new RegExp(lengthUnits, 'g'));
  });
  test('convert length values', function() {
    assert.deepEqual(this.convert(' 0 '),
        {px: 0});
    assert.deepEqual(this.convert('10px'),
        {px: 10});
    assert.deepEqual(this.convert('5VmIN'),
        {vmin: 5});
    assert.deepEqual(this.convert('-12.5em'),
        {em: -12.5});
  });
  test('convert length calcs', function() {
    assert.deepEqual(this.convert('calc(10px*3) '),
        {px: 30});
    assert.deepEqual(this.convert('calc(10vmin + -5in) '),
        {vmin: 10, 'in': -5});
    assert.deepEqual(this.convert('calc(5EM + 10px) '),
        {em: 5, px: 10});
    assert.deepEqual(this.convert(' calc( 10px + 5em ) '),
        {px: 10, em: 5});
    assert.deepEqual(this.convert('calc(5*(10px + 5em) - 5.25em * 6)'),
        {px: 50.0, em: -6.5});
    assert.deepEqual(this.convert('calc((5px + 2px)*(1 + 2*(4 + 2*-5)) + 7px - (5em + 6vw/2)*4)'),
        {px: -70, em: -20, vw: -12});
    assert.deepEqual(this.convert('calc(calc(5px) + calc(((3))) *calc(calc(10px)))'),
        {px: 35});
  });
  test('invalid lengths fail to parse', function() {
    assert.isNull(this.convert('10'));
    assert.isNull(this.convert('()'));
    assert.isNull(this.convert('(10px)'));
    assert.isNull(this.convert('(10px + 5em)'));
    assert.isNull(this.convert('calc(10px + 5)'));
    assert.isNull(this.convert('calc(10px+ 5em)'));
    assert.isNull(this.convert('calc(10px +5em)'));
    assert.isNull(this.convert('calc(10px * 5em)'));
    assert.isNull(this.convert('(calc(10px + 5em))'));
    assert.isNull(this.convert('calc(10px + 5em))'));
    assert.isNull(this.convert('calc(10)'));
    assert.isNull(this.convert('calccalc(10px)'));
    assert.isNull(this.convert('calc(5 / 10px)'));
    assert.isNull(this.convert('calc(10px / 0)'));
    assert.isNull(this.convert('calc()'));
    assert.isNull(this.convert('ch'));
    assert.isNull(makeLengthOrPercentInterpolation('foo', '10px'));
    assert.isNull(makeLengthOrPercentInterpolation('10px', 'bar'));
    assert.isNull(makeLengthOrPercentInterpolation('foo', 'bar'));
  });
  test('interpolate lengths and percents', function() {
    assert.equal(makeLengthOrPercentInterpolation('10px', '50px')(0.25), '20px');
    assert.equal(makeLengthOrPercentInterpolation('10%', '50%')(0.25), '20%');
    assert.equal(makeLengthOrPercentInterpolation('0px', '0.001px')(0.05), '0px');
    assert.equal(makeLengthOrPercentInterpolation('0px', '10px')(0.234), '2.340px');
    assert.equal(makeLengthOrPercentInterpolation('10px', '10em')(0.4), 'calc(6px + 4em)');
    assert.equal(makeLengthOrPercentInterpolation('10px', '10%')(0.4), 'calc(6px + 4%)');
    assert.equal(makeLengthOrPercentInterpolation('calc(10px + 5em)', 'calc(20px + 35em)')(0.4), 'calc(14px + 17em)');
    assert.equal(makeLengthOrPercentInterpolation('calc(10px + 5em)', 'calc(20% + 35em)')(0.4), 'calc(6px + 17em + 8%)');
    assert.equal(makeLengthOrPercentInterpolation('calc(10px + 5vw)', 'calc(20% + 35em)')(0.4), 'calc(6px + 3vw + 8% + 14em)');
  });
});
