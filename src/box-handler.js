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
  function parseBox(string) {
    var rectangleRegExp = /rect\((.+), (.+), (.+), (.+)\)/;
    var match = rectangleRegExp.exec(string);
    if (!match) {
      return undefined;
    }
    var out = [
      scope.parseLengthOrPercent(match[1]),
      scope.parseLengthOrPercent(match[2]),
      scope.parseLengthOrPercent(match[3]),
      scope.parseLengthOrPercent(match[4])
    ];
    if (out[0] && out[1] && out[2] && out[3]) {
      return out;
    }
    return undefined;
  }

  function mergeBoxes(left, right) {
    var mergedTop = scope.mergeDimensions(left[0], right[0]);
    var mergedRight = scope.mergeDimensions(left[1], right[1]);
    var mergedBottom = scope.mergeDimensions(left[2], right[2]);
    var mergedLeft = scope.mergeDimensions(left[3], right[3]);
    return [
      [mergedTop[0], mergedRight[0], mergedBottom[0], mergedLeft[0]],
      [mergedTop[1], mergedRight[1], mergedBottom[1], mergedLeft[1]],
      function(rectValue) {
        return 'rect(' + mergedTop[2](rectValue[0]) + ', ' +
            mergedRight[2](rectValue[1]) + ', ' +
            mergedBottom[2](rectValue[2]) + ', ' +
            mergedLeft[2](rectValue[3]) + ')';
      }
    ];
  }

  scope.parseBox = parseBox;
  scope.mergeBoxes = mergeBoxes;

  scope.addPropertiesHandler(parseBox, mergeBoxes, ['clip']);

})(webAnimationsMinifill, webAnimationsTesting);
