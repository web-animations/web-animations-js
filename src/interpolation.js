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

  function interpolate(from, to, f) {
    if ((typeof from == 'number') && (typeof to == 'number')) {
      return from * (1 - f) + to * f;
    }
    if ((typeof from == 'boolean') && (typeof to == 'boolean')) {
      return f < 0.5 ? from : to;
    }

    WEB_ANIMATIONS_TESTING && console.assert(
        Array.isArray(from) && Array.isArray(to),
        'If interpolation arguments are not numbers or bools they must be arrays');

    if (from.length == to.length) {
      var r = [];
      for (var i = 0; i < from.length; i++) {
        r.push(interpolate(from[i], to[i], f));
      }
      return r;
    }
    throw 'Mismatched interpolation arguments ' + from + ':' + to;
  }

  function interpolateTransform(from, to, f) {
    if (from.t == 'decomposedMatrix')
      return scope.interpolateDecomposedTransformsWithMatrices(from.d, to.d, f);
    return {t: from.t, d: interpolate(from.d, to.d, f)};
  }

  scope.Interpolation = function(from, to, convertToString) {
    return function(f) {
      var interp;
      if (Array.isArray(from) && from[0].t)
        interp = from.map(function(x, i) {
          return interpolateTransform(from[i], to[i], f);
        });
      else if (from.t)
        interp = interpolateTransform(from, to, f);
      else
        interp = interpolate(from, to, f);
      return convertToString(interp);
    }
  };

  scope.interpolate = interpolate;

  if (WEB_ANIMATIONS_TESTING) {
    testing.interpolate = interpolate;
  }

})(webAnimationsMinifill, webAnimationsTesting);
