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

  scope.convertEffectInput = function(effectInput) {
    var keyframeEffect = normalize(effectInput);
    var propertySpecificKeyframeGroups = makePropertySpecificKeyframeGroups(keyframeEffect);
    var interpolations = makeInterpolations(propertySpecificKeyframeGroups);
    return function(target, fraction) {
      for (var i = 0; i < interpolations.length; i++)
        if (interpolations[i].endTime >= fraction && interpolations[i].startTime <= fraction)
          scope.apply(target,
            interpolations[i].property,
            interpolations[i].interpolation((fraction - interpolations[i].startTime) / (interpolations[i].endTime - interpolations[i].startTime)));
    };
  };


  function makeInterpolations(propertySpecificKeyframeGroups) {
    var interpolations = [];
    for (var groupName in propertySpecificKeyframeGroups) {
      if (propertySpecificKeyframeGroups.hasOwnProperty(groupName)) {
        var group = propertySpecificKeyframeGroups[groupName];
        for (var i = 0; i < group.length - 1; i++) {
          interpolations.push({
            startTime: group[i].offset,
            endTime: group[i + 1].offset,
            property: groupName,
            interpolation: scope.propertyInterpolation(groupName, group[i].value, group[i + 1].value)
          });
        }
      }
    }
    interpolations.sort(
      function(leftInterpolation, rightInterpolation) {
        return leftInterpolation.startTime - rightInterpolation.startTime;
      });
    return interpolations;
  }


  function normalize(effectInput) {
    if (!Array.isArray(effectInput) || effectInput.length < 2)
        throw 'Keyframe effect must be an array of 2 or more keyframes';

    function offsetGiven(offset) {
      return (offset !== undefined && offset !== null);
    }

    var keyframeEffect = [];
    function addKeyframe(originalKeyframe) {
      var keyframe = {};
      for (var member in originalKeyframe) {
        if (originalKeyframe.hasOwnProperty(member)) {
          var memberValue = originalKeyframe[member];
          // FIXME: If the value isn't a number or a string, this sets it to the empty string. Should do something better.
          if (typeof memberValue != 'number' && typeof memberValue != 'string')
            memberValue = '';
          keyframe[member] = memberValue;
        }
      }
      keyframeEffect.push(keyframe);
    }

    var everyFrameHasOffset = true;
    var looselySortedByOffset = true;
    var previousOffset = -Infinity;
    for (var i = 0; i < effectInput.length; i++) {
      var offset = effectInput[i].offset;
      if (offsetGiven(offset)) {
        if (typeof offset != 'number' || offset < 0 || offset > 1)
          continue;

        if (offset < previousOffset)
          looselySortedByOffset = false;
        previousOffset = offset;
      }
      else {
        everyFrameHasOffset = false;
      }
      if (effectInput[i].composite == 'add')
        throw 'composite: \'add\' not supported';

      addKeyframe(effectInput[i]);
    }

    if (!looselySortedByOffset) {
      if (!everyFrameHasOffset)
        throw 'Keyframes are not loosely sorted by offset. Sort or specify offsets.';
      else
        keyframeEffect.sort(
          function(leftKeyframe, rightKeyframe) {
            return leftKeyframe.offset - rightKeyframe.offset;
          });
    }

    function spaceKeyframes() {
      var length = keyframeEffect.length;
      if (!offsetGiven(keyframeEffect[length - 1].offset))
        keyframeEffect[length - 1].offset = 1;
      if (length > 1 && !offsetGiven(keyframeEffect[0].offset))
        keyframeEffect[0].offset = 0;

      var previousIndex = 0;
      var previousOffset = keyframeEffect[0].offset;
      for (var i = 1; i < length; i++) {
        var offset = keyframeEffect[i].offset;
        if (offsetGiven(offset)) {
          if (previousIndex + 1 < i)
            for (var j = 1; j < i - previousIndex; j++)
              keyframeEffect[previousIndex + j].offset = previousOffset + (offset - previousOffset) * j / (i - previousIndex);
          previousIndex = i;
          previousOffset = offset;
        }
      }
    }
    if (!everyFrameHasOffset)
      spaceKeyframes();

    return keyframeEffect;
  }


  function makePropertySpecificKeyframeGroups(keyframeEffect) {
    var propertySpecificKeyframeGroups = {};

    for (var i = 0; i < keyframeEffect.length; i++) {
      for (var member in keyframeEffect[i]) {
        if (keyframeEffect[i].hasOwnProperty(member) && member !== 'offset') {
          var propertySpecificKeyframe = {
            offset: keyframeEffect[i].offset,
            value: keyframeEffect[i][member]
          };
          propertySpecificKeyframeGroups[member] = propertySpecificKeyframeGroups[member] || [];
          propertySpecificKeyframeGroups[member].push(propertySpecificKeyframe);
        }
      }
    }

    for (var groupName in propertySpecificKeyframeGroups) {
      if (propertySpecificKeyframeGroups.hasOwnProperty(groupName)) {
        var group = propertySpecificKeyframeGroups[groupName];
        if (group[0].offset != 0 || group[group.length - 1].offset != 1)
          throw 'Partial keyframes are not supported';
      }
    }
    return propertySpecificKeyframeGroups;
  }


  if (TESTING) {
    testing.convertEffectInput = convertEffectInput;
    testing.makeInterpolations = makeInterpolations;
    testing.normalize = normalize;
    testing.makePropertySpecificKeyframeGroups = makePropertySpecificKeyframeGroups;
  }

})(webAnimations, testing);
