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

(function(shared, scope, testing) {

  scope.convertEffectInput = function(effectInput) {
    if (typeof effectInput == 'function') {
      return function(target, fraction) {
        effectInput(fraction, target);
      };
    }
    var keyframeEffect = normalize(effectInput);
    var propertySpecificKeyframeGroups = makePropertySpecificKeyframeGroups(keyframeEffect);
    var interpolations = makeInterpolations(propertySpecificKeyframeGroups);
    return function(target, fraction) {
      if (fraction != null) {
        for (var i = 0; i < interpolations.length && interpolations[i].startTime <= fraction; i++)
          if (interpolations[i].endTime >= fraction && interpolations[i].endTime != interpolations[i].startTime)
            scope.apply(target,
              interpolations[i].property,
              interpolations[i].interpolation((fraction - interpolations[i].startTime) / (interpolations[i].endTime - interpolations[i].startTime)));
      // } else {
      //   for (var property in propertySpecificKeyframeGroups)
      //     if (property != 'offset')
      //       scope.clear(target, property);
      }
    };
  };


  function normalize(effectInput) {
    if (!Array.isArray(effectInput) && effectInput !== null)
      throw new TypeError('Keyframe effect must be null or an array of keyframes');

    if (effectInput == null)
      return [];

    var keyframeEffect = effectInput.map(function(originalKeyframe) {
      var keyframe = {};
      for (var member in originalKeyframe) {
        var memberValue = originalKeyframe[member];
        if (member == 'offset') {
          if (memberValue != null) {
            memberValue = Number(memberValue);
            if (!isFinite(memberValue))
              throw new TypeError('keyframe offsets must be numbers.');
          }
        } else {
          memberValue = '' + memberValue;
        }
        keyframe[member] = memberValue;
      }
      if (keyframe.offset == undefined)
        keyframe.offset = null;
      return keyframe;
    });

    var everyFrameHasOffset = true;
    var looselySortedByOffset = true;
    var previousOffset = -Infinity;
    for (var i = 0; i < keyframeEffect.length; i++) {
      var offset = keyframeEffect[i].offset;
      if (offset != null) {
        if (offset < previousOffset)
          looselySortedByOffset = false;
        previousOffset = offset;
      } else {
        everyFrameHasOffset = false;
      }
    }

    keyframeEffect = keyframeEffect.filter(function(keyframe) {
      return keyframe.offset >= 0 && keyframe.offset <= 1;
    });

    if (!looselySortedByOffset) {
      if (!everyFrameHasOffset) {
        throw 'Keyframes are not loosely sorted by offset. Sort or specify offsets.';
      }
      keyframeEffect.sort(function(leftKeyframe, rightKeyframe) {
        return leftKeyframe.offset - rightKeyframe.offset;
      });
    }

    function spaceKeyframes() {
      var length = keyframeEffect.length;
      if (keyframeEffect[length - 1].offset == null)
        keyframeEffect[length - 1].offset = 1;
      if (length > 1 && keyframeEffect[0].offset == null)
        keyframeEffect[0].offset = 0;

      var previousIndex = 0;
      var previousOffset = keyframeEffect[0].offset;
      for (var i = 1; i < length; i++) {
        var offset = keyframeEffect[i].offset;
        if (offset != null) {
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

  shared.normalizeKeyframes = normalize;

  function makePropertySpecificKeyframeGroups(keyframeEffect) {
    var propertySpecificKeyframeGroups = {};

    for (var i = 0; i < keyframeEffect.length; i++) {
      for (var member in keyframeEffect[i]) {
        if (member != 'offset') {
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
      var group = propertySpecificKeyframeGroups[groupName];
      if (group[0].offset != 0 || group[group.length - 1].offset != 1)
        throw 'Partial keyframes are not supported';
    }
    return propertySpecificKeyframeGroups;
  }


  function makeInterpolations(propertySpecificKeyframeGroups) {
    var interpolations = [];
    for (var groupName in propertySpecificKeyframeGroups) {
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
    interpolations.sort(function(leftInterpolation, rightInterpolation) {
      return leftInterpolation.startTime - rightInterpolation.startTime;
    });
    return interpolations;
  }


  if (TESTING) {
    testing.normalize = normalize;
    testing.makePropertySpecificKeyframeGroups = makePropertySpecificKeyframeGroups;
    testing.makeInterpolations = makeInterpolations;
  }

})(shared, minifill, testing);
