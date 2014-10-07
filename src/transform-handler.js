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

  // This returns a function for converting transform functions to equivalent
  // primitive functions, which will take an array of values from the
  // derivative type and fill in the blanks (underscores) with them.
  var _ = null;
  function cast(pattern) {
    return function(contents) {
      var i = 0;
      return pattern.map(function(x) { return x === _ ? contents[i++] : x; });
    }
  }

  function id(x) { return x; }

  var Opx = {px: 0};
  var Odeg = {deg: 0};

  // FIXME: We should support perspective

  // type: [argTypes, convertTo3D, convertTo2D]
  // In the argument types string, lowercase characters represent optional arguments
  var transformFunctions = {
    // FIXME: These values for matrix/matrix3d work but they're a bit silly. Fix.
    matrix: ['Mmmmmm'],
    matrix3d: ['Mmmmmmmmmmmmmmmm'],
    rotate: ['A'],
    rotatex: ['A'],
    rotatey: ['A'],
    rotatez: ['A'],
    rotate3d: ['Nnna'],
    scale: ['Nn', cast([_, _, 1]), id],
    scalex: ['N', cast([_, 1, 1]), cast([_, 1])],
    scaley: ['N', cast([1, _, 1]), cast([1, _])],
    scalez: ['N', cast([1, 1, _])],
    scale3d: ['NNN', id],
    skew: ['Aa', null, id],
    skewx: ['A', null, cast([_, Odeg])],
    skewy: ['A', null, cast([Odeg, _])],
    translate: ['Tt', cast([_, _, Opx]), id],
    translatex: ['T', cast([_, Opx, Opx]), cast([_, Opx])],
    translatey: ['T', cast([Opx, _, Opx]), cast([Opx, _])],
    translatez: ['L', cast([Opx, Opx, _])],
    translate3d: ['TTL', id],
  };

  function parseTransform(string) {
    string = string.toLowerCase().trim();
    if (string == 'none')
      return [];
    // FIXME: Using a RegExp means calcs won't work here
    var transformRegExp = /\s*(\w+)\(([^)]*)\)/g;
    var result = [];
    var match;
    var prevLastIndex = 0;
    while (match = transformRegExp.exec(string)) {
      // console.log(match);
      if (match.index != prevLastIndex)
        return;
      // console.log('same index');
      prevLastIndex = match.index + match[0].length;
      var functionName = match[1];
      // console.log('functionData');
      // console.log(functionData);
      var functionData = transformFunctions[functionName];
      // console.log('functionData');
      // console.log(functionData);
      if (!functionData)
        return;
      // console.log('have function data');
      var args = match[2].split(',');
      // console.log('Args: ' + args);
      var argTypes = functionData[0];
      // console.log('ArgTypes: ' + argTypes);
      if (argTypes.length < args.length)
        return;

      var parsedArgs = [];
      for (var i = 0; i < argTypes.length; i++) {
        var arg = args[i];
        var type = argTypes[i];
        var parsedArg;
        if (!arg)
          parsedArg = ({a: Odeg,
                        n: parsedArgs[0],
                        t: Opx})[type];
        else
          parsedArg = ({A: function(s) { return s.trim() == '0' ? Odeg : scope.parseAngle(s); },
                        N: scope.parseNumber,
                        M: scope.parseNumber,
                        T: scope.parseLengthOrPercent,
                        L: scope.parseLength})[type.toUpperCase()](arg);
        if (parsedArg === undefined)
          return;
        parsedArgs.push(parsedArg);
      }
      // console.log('parsed args');
      // console.log(parsedArgs);
      // console.log('function name');
      // console.log(functionName);
      result.push({t: functionName, d: parsedArgs});

      if (transformRegExp.lastIndex == string.length) {
        return result;
      }
    }
  };

  // This is basically the matrix alternative to mergeTransforms.
  // RENEE: Don't move this out of transform-handler.js
  function matrixDecomp(left, right) {
    if (left.decompositionPair !== right) {
      left.decompositionPair = right;
      var leftArgs = scope.makeMatrixDecomposition(left);
    }
    if (right.decompositionPair !== left) {
      right.decompositionPair = left;
      var rightArgs = scope.makeMatrixDecomposition(right);
    }
    // console.log('decomposed right args');
    // console.log(rightArgs);
    // console.log('decomposed left args');
    // console.log(leftArgs);
    return [
      {t: 'decomposedMatrix', d: leftArgs},
      {t: 'decomposedMatrix', d: rightArgs},
      function(list) {
        // console.log('list: ');
        // console.log(list);
        var stringifiedArgs = list.d.map(function(arg) {
          return scope.numberToString(arg);
        }).join(',');
        // console.log('stringifiedArgs');
        // console.log(stringifiedArgs);
        return list.t + '(' + stringifiedArgs + ')';
      }
    ];
  }

  function typeTo2D(type) {
    return type.replace(/[xy]/, '');
  }

  function typeTo3D(type) {
    return type.replace(/(x|y|z|3d)?$/, '3d');
  }

  function mergeTransforms(left, right) {
    var flipResults = false;
    if (!left.length || !right.length) {
      if (!left.length) {
        flipResults = true;
        left = right;
        right = [];
      }
      for (var i = 0; i < left.length; i++) {
        var type = left[i].t;
        var args = left[i].d;
        var defaultValue = type.substr(0, 5) == 'scale' ? 1 : 0;
        right.push({t: type, d: args.map(function(arg) {
          if (typeof arg == 'number')
            return defaultValue;
          var result = {};
          for (var unit in arg)
            result[unit] = defaultValue;
          return result;
        })});
      }
    }

    // FIXME: Test this.
    if (left.length != right.length) {
      return matrixDecomp(left, right);
    }

    var leftResult = [];
    var rightResult = [];
    var types = [];
    // console.log('left');
    // console.log(left);
    // console.log('right');
    // console.log(right);
    for (var i = 0; i < left.length; i++) {
      var leftType = left[i].t;
      var rightType = right[i].t;
      var leftArgs = left[i].d;
      var rightArgs = right[i].d;
      // console.log(leftType);
      // console.log(rightType);
      // console.log(leftArgs);
      // console.log(rightArgs);

      var leftFunctionData = transformFunctions[leftType];
      var rightFunctionData = transformFunctions[rightType];

      var type;
      if ((leftType === 'matrix' || leftType === 'matrix3d') && (rightType === 'matrix' || rightType === 'matrix3d')) {
        var merged = matrixDecomp([left[i]], [right[i]]);
        leftResult.push(merged[0]);
        rightResult.push(merged[1]);
        types.push(['matrix', [merged[2]]]);
        continue;
      } else if (leftType == rightType) {
        type = leftType;
      } else if (leftFunctionData[2] && rightFunctionData[2] && typeTo2D(leftType) == typeTo2D(rightType)) {
        type = typeTo2D(leftType);
        leftArgs = leftFunctionData[2](left[i].d);
        rightArgs = rightFunctionData[2](right[i].d);
      } else if (leftFunctionData[1] && rightFunctionData[1] && typeTo3D(leftType) == typeTo3D(rightType)) {
        type = typeTo3D(leftType);
        leftArgs = leftFunctionData[1](left[i].d);
        rightArgs = rightFunctionData[1](right[i].d);
      } else {
        return matrixDecomp(left, right);
      }

      var leftArgsCopy = [];
      var rightArgsCopy = [];
      var stringConversions = [];
      for (var j = 0; j < leftArgs.length; j++) {
        var merge = typeof leftArgs[j] == 'number' ? scope.mergeNumbers : scope.mergeDimensions;
        var merged = merge(leftArgs[j], rightArgs[j]);
        leftArgsCopy[j] = merged[0];
        rightArgsCopy[j] = merged[1];
        stringConversions.push(merged[2]);
      }
      leftResult.push({t: leftType, d: leftArgsCopy});
      rightResult.push({t: rightType, d: rightArgsCopy});
      types.push([type, stringConversions]);
    }

    if (flipResults) {
      var tmp = leftResult;
      leftResult = rightResult;
      rightResult = tmp;
    }

    return [leftResult, rightResult, function(list) {
      return list.map(function(args, i) {
        if(args.t === 'matrix' || args.t === 'matrix3d') {
          return types[i][1][0](args);
        } else {
          var stringifiedArgs = args.d.map(function(arg, j) {
            return types[i][1][j](arg);
          }).join(',');
          return types[i][0] + '(' + stringifiedArgs + ')';
        }
      }).join(' ');
    }];
  }

  scope.addPropertiesHandler(parseTransform, mergeTransforms, ['transform']);

  // scope.dot = dot;

  if (WEB_ANIMATIONS_TESTING) {
    testing.parseTransform = parseTransform;
    // FIXME: These were used for asserts. Remove if not needed.
    testing.typeTo2D = typeTo2D;
    testing.typeTo3D = typeTo3D;
  }

})(webAnimationsMinifill, webAnimationsTesting);
