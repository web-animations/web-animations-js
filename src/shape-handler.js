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

  var consumeLengthOrPercent = scope.consumeParenthesised.bind(null, scope.parseLengthOrPercent);
  var consumeLengthOrPercentPair = scope.consumeList.bind(undefined, consumeLengthOrPercent, /^/);

  function ignore(value) {
    return function(input) {
      var result = value(input);
      if (result)
        result[0] = undefined;
      return result;
    }
  }

  function consumeList(list, input) {
    var output = [];
    for (var i = 0; i < list.length; i++) {
      //console.log(input);
      var result = scope.consumeTrimmed(list[i], input);
      //console.log(JSON.stringify(result));
      if (!result || result[0] == '')
        return;
      if (result[0] !== undefined)
        output.push(result[0]);
      input = result[1];
    }
    if (input == '') {
      return output;
    }
  }

  function parseShape(input) {
    var circle = scope.consumeToken(/^circle/, input);
    if (circle && circle[0]) {
      return ['circle'].concat(consumeList([
        ignore(scope.consumeToken.bind(undefined, /^\(/)),
        consumeLengthOrPercent,
        ignore(scope.consumeToken.bind(undefined, /^at/)),
        scope.consumePosition,
        ignore(scope.consumeToken.bind(undefined, /^\)/))
      ], circle[1]));
    }
  }

  function mergeList(left, right, list) {
    console.log(JSON.stringify(left), JSON.stringify(right), list);
    var lefts = [];
    var rights = [];
    var functions = [];
    var j = 0;
    for (var i = 0; i < list.length; i++) {
      if (typeof list[i] == 'function') {
        var result = list[i](left[j], right[j++]);
        lefts.push(result[0]);
        rights.push(result[1]);
        functions.push(result[2]);
      } else {
        (function(pos) {
          lefts.push(false);
          rights.push(false);
          functions.push(function() { return list[pos]; });
        })(i);
      }
    }
    console.log(JSON.stringify(lefts), JSON.stringify(rights), functions);
    return [lefts, rights, function(results) {
      var result = '';
      for (var i = 0; i < results.length; i++) {
        result += functions[i](results[i]);
      }
      console.log(result);
      return result;
    }];
  }

  function mergeShapes(left, right) {
    if (left[0] !== right[0])
      return;
    if (left[0] == 'circle') {
      return mergeList(left.slice(1), right.slice(1), [
        'circle(',
        scope.mergeDimensions,
        ' at ',
        scope.mergeOffsetList,
        ')']);
    }
  }

  scope.addPropertiesHandler(parseShape, mergeShapes, ['shape-outside']);

})(webAnimationsMinifill);
