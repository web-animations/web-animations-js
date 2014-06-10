// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
// limitations under the License.

(function(scope, testing) {

  function convertDimension(unitRegExp, string) {
    string = string.trim().toLowerCase();

    if (string == '0' && unitRegExp.test('px'))
      return {px: 0};

    // If we have parenthesis, we're a calc and need to start with 'calc'.
    if (!/^[^(]*$|^calc/.test(string))
      return null;
    string = string.replace(/calc\(/g, '(');

    // We tag units by prefixing them with 'U' (note that we are already
    // lowercase) to prevent problems with types which are substrings of
    // each other (although prefixes may be problematic!)
    var matchedUnits = {};
    string = string.replace(unitRegExp, function(match) {
      matchedUnits[match] = null;
      return 'U' + match;
    });
    var taggedUnitRegExp = 'U(' + unitRegExp.source + ')';

    // Validating input is simply applying as many reductions as we can.
    var typeCheck = string.replace(/[-+]?([0-9]*\.)?[0-9]+/g, 'N')
                          .replace(new RegExp('N' + taggedUnitRegExp, 'g'), 'D')
                          .replace(/\s[+-]\s/g, 'O')
                          .replace(/\s/g, '');
    var reductions = [/N\*(D)/g, /(N|D)[*/]N/g, /(N|D)O\1/g, /\((N|D)\)/g];
    var i = 0;
    while (i < reductions.length) {
      if (reductions[i].test(typeCheck)) {
        typeCheck = typeCheck.replace(reductions[i], '$1');
        i = 0;
      } else {
        i++;
      }
    }
    if (typeCheck != 'D')
      return null;

    for (var unit in matchedUnits) {
      var result = eval(string.replace(new RegExp('U' + unit, 'g'), '').replace(new RegExp(taggedUnitRegExp, 'g'), '*0'));
      if (!isFinite(result))
        return null;
      matchedUnits[unit] = result;
    }
    return matchedUnits;
  }

  function makeDimensionInterpolation(unitRegExp) {
    return function(left, right) {
      left = convertDimension(unitRegExp, left);
      right = convertDimension(unitRegExp, right);
      if (!left || !right)
        return null;

      var units = [], unit;
      for (unit in left)
        units.push(unit);
      for (unit in right)
        if (units.indexOf(unit) < 0)
          units.push(unit);

      left = units.map(function(unit) { return left[unit] || 0; });
      right = units.map(function(unit) { return right[unit] || 0; });
      return Interpolation(left, right, function(values) {
        var result = values.map(function(value, i) {
          // Scientific notation (e.g. 1e2) is not yet widely supported by browser vendors.
          return value.toFixed(3).replace('.000', '') + units[i];
        }).join(' + ');
        return values.length > 1 ? 'calc(' + result + ')' : result;
      });
    }
  }

  var lengthUnits = 'px|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc';
  scope.makePercentInterpolation = makeDimensionInterpolation(/%/g);
  scope.makeLengthInterpolation = makeDimensionInterpolation(new RegExp(lengthUnits, 'g'));
  scope.makeLengthOrPercentInterpolation = makeDimensionInterpolation(new RegExp(lengthUnits + '|%', 'g'));

  if (TESTING) {
    testing.convertDimension = convertDimension;
    testing.lengthUnits = lengthUnits;
  }

})(webAnimations, testing);
