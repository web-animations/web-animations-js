// Copyright 2014 Google Inc. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
// limitations under the License.

(function(scope, testing) {
  function interpTransformValue(from, to, f) {
    var type = from.t ? from.t : to.t;
    switch (type) {
      case 'matrix':
      case 'matrix3d':
        WEB_ANIMATIONS_TESTING && console.assert(false,
            'Must use matrix decomposition when interpolating raw matrices');
      // Transforms with unitless parameters.
      case 'rotate':
      case 'rotateX':
      case 'rotateY':
      case 'rotateZ':
      case 'rotate3d':
      case 'scale':
      case 'scaleX':
      case 'scaleY':
      case 'scaleZ':
      case 'scale3d':
      case 'skew':
      case 'skewX':
      case 'skewY':
        return {t: type, d: scope.interp(from.d, to.d, f, type)};
      default:
        // Transforms with lengthType parameters.
        console.log('from.d');
        console.log(from.d);
        console.log('to.d');
        console.log(to.d);
        var result = [];
        var maxVal;
        if (from.d && to.d) {
          maxVal = Math.max(from.d.length, to.d.length);
        } else if (from.d) {
          maxVal = from.d.length;
        } else {
          maxVal = to.d.length;
        }
        for (var j = 0; j < maxVal; j++) {
          var fromVal = from.d ? from.d[j] : {};
          var toVal = to.d ? to.d[j] : {};
          result.push(scope.interp(fromVal, toVal, f));
        }
        return {t: type, d: result};
    }
  }

  function interpolate(from, to, f) {
    // console.log('from');
    // console.log(from);
    // console.log('to');
    // console.log(to);
    if ((typeof from == 'number') && (typeof to == 'number')) {
      return from * (1 - f) + to * f;
    }
    if ((typeof from == 'boolean') && (typeof to == 'boolean')) {
      return f < 0.5 ? from : to;
    }

    if (from.t && from.t == 'decomposedMatrix')
      return scope.interpolateDecomposedTransformsWithMatrices(from, to, f);

    WEB_ANIMATIONS_TESTING && console.assert(
      Array.isArray(from) && Array.isArray(to),
      'If interpolation arguments are not numbers, bools or matrices they must be arrays');

    var isTransform = function(list) {
      // matrix and matrix3d omitted as they should be handled by matrix decomposition.
      var transformFunctionNames = ('perspective|' +
        'rotate|rotatex|rotatey|rotatez|rotate3d|scale|scalex|' +
        'scaley|scalez|scale3d|skew|skewx|skewy|translate|' +
        'translatex|translatey|translatez|translate3d').split('|');
      return (list[0].t) && (transformFunctionNames.indexOf(list[0].t) !== -1);
    }

    if (from.length == to.length) {
      console.log('from');
      console.log(from);
      console.log('to');
      console.log(to);
      // var interpFunction = isTransform(from) ? interpTransformValue : interpolate;
      var interpFunction = interpolate;
      var out = [];
      // for (var i = 0; i < from.length; i++)
      //   out.push(interpFunction(from[i], to[i], f));
      // return out;
      for (var i = 0; i < from.length; i++) {
        var fromVal = from[i];
        var toVal = to[i];
        if (from[i].d) {
          fromVal = from[i].d;
          toVal = to[i].d;
        }
        console.log('fromVal');
        console.log(fromVal);
        console.log('toVal');
        console.log(toVal);
        out.push(interpFunction(fromVal, toVal, f));
      }
      return out;
    }
    throw 'Mismatched interpolation arguments ' + from + ':' + to;
  }

  scope.Interpolation = function(from, to, convertToString) {
    return function(f) {
      return convertToString(interpolate(from, to, f));
    }
  };

  if (WEB_ANIMATIONS_TESTING) {
    testing.interpolate = interpolate;
  }

})(webAnimationsMinifill, webAnimationsTesting);
