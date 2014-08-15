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

  var rectangleRE = /rect\(([^,]+),([^,]+),([^,]+),([^)]+)\)/;
  function parseBox(string) {
    console.log("PARSEBOX");
    var match = rectangleRE.exec(string);
    if (!match) {
      return undefined;
    }
    // FIXME: Change this to an array.
    var out = {
      top: scope.parseLengthOrPercent(match[1]),
      right: scope.parseLengthOrPercent(match[2]),
      bottom: scope.parseLengthOrPercent(match[3]),
      left: scope.parseLengthOrPercent(match[4])
    };
    if (out.top && out.right && out.bottom && out.left) {
      return out;
    }
    return undefined;
  }

  // FIXME: consider saving the boxes as arrays.
  function mergeBoxes(left, right) {
    console.log("merge");
    var mergedTop = scope.mergeDimensions(left.top, right.top);
    var mergedRight = scope.mergeDimensions(left.right, right.right);
    var mergedBottom = scope.mergeDimensions(left.bottom, right.bottom);
    var mergedLeft = scope.mergeDimensions(left.left, right.left);
    console.log("MergedTop: " + mergedTop);
    return [
      [mergedTop[0], mergedRight[0], mergedBottom[0], mergedLeft[0]],
      [mergedTop[1], mergedRight[1], mergedBottom[1], mergedLeft[1]],
      function(value) {
        console.log("merge function");
        return 'rect(' + mergedTop[2](value[0]) + ', '
          + mergedRight[2](value[1]) + ' ,'
          + mergedBottom[2](value[2]) + ' ,'
          + mergedLeft[2](value[3]) + ')'
      }
    ];
  }

  scope.addPropertiesHandler(parseBox, mergeBoxes, ['clip']);

  scope.parseBox = parseBox;
  scope.mergeBoxes = mergeBoxes;

})(webAnimationsMinifill, webAnimationsTesting);