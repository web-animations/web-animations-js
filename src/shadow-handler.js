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

(function(scope) {

  function consumeShadow(string) {
    var shadow = {
      inset: false,
      lengths: [],
      color: null,
    };
    function consumePart(string) {
      var result = scope.consumeToken(/^inset/i, string);
      if (result) {
        shadow.inset = true;
        return result;
      }
      var result = scope.consumeLengthOrPercent(string);
      if (result) {
        shadow.lengths.push(result[0]);
        return result;
      }
      var result = scope.consumeColor(string);
      if (result) {
        shadow.color = result[0];
        return result;
      }
    }
    var result = scope.consumeList(consumePart, /^/, string);
    if (result && result[0].length) {
      return [shadow, result[1]];
    }
  }

  function parseShadowList(string) {
    var result = scope.consumeList(consumeShadow, /^,/, string);
    if (result && result[1] == '') {
      return result[0];
    }
  }

  function mergeShadow(left, right) {
    if (left.inset != right.inset || !!left.color != !!right.color || left.lengths.length != right.lengths.length) {
      return;
    }
    var lengthReconstitution = [];
    var colorReconstitution;
    var matchingLeft = [[], 0];
    var matchingRight = [[], 0];
    for (var i = 0; i < left.lengths.length; i++) {
      var thing = scope.mergeDimensions(left.lengths[i], right.lengths[i]);
      matchingLeft[0].push(thing[0]);
      matchingRight[0].push(thing[1]);
      lengthReconstitution.push(thing[2]);
    }
    if (left.color && right.color) {
      var thing = scope.mergeColors(left.color, right.color);
      matchingLeft[1] = thing[0];
      matchingRight[1] = thing[1];
      colorReconstitution = thing[2];
    }
    return [matchingLeft, matchingRight, function(value) {
      var result = left.inset ? 'inset ' : ' ';
      for (var i = 0; i < lengthReconstitution.length; i++) {
        result += lengthReconstitution[i](value[0][i]) + ' ';
      }
      if (colorReconstitution) {
        result += colorReconstitution(value[1]);
      }
      return result;
    }];
  }

  var mergeShadowList = scope.mergeNestedRepeated.bind(null, mergeShadow, ', ');
  scope.addPropertiesHandler(parseShadowList, mergeShadowList, ['box-shadow']);

})(webAnimationsMinifill);
