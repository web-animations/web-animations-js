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

  // PLACEHOLDER: Replace with something that works.
  scope.convertEffectInput = function(effectInput) {
    // TODO: clone effectInput
    // TODO: normalize effectInput clone && space the keyframes by offsets

    // TODO: convert normalized effect to property specific keyframes
    // TODO: make interpolations from pairs of PSKs (like this v) and insert into a thing (data structure)
    var interpolation = scope.propertyInterpolation('left', '0px', '100px');
    return function(target, fraction) {
      // TODO: look up the interpolations in the thing that will apply at
      // fraction
      // TODO: apply them like this v
      scope.apply(target, 'left', interpolation(fraction));
    };
  };

  function normalize(effectInput) {
    if (!Array.isArray(effectInput) || effectInput.length < 2) {
        throw 'Keyframe effect must be an array of 2 or more keyframes';
    }

    var keyframeEffect = [];
    function addKeyframe(originalKeyframe) {
      var keyframe = {};
      for (var member in originalKeyframe) {
        if (originalKeyframe.hasOwnProperty(member)) {
          var memberValue = originalKeyframe[member];
          // FIXME: If the value isn't a number or a string, this sets it to the empty string. Should do something better.
          if (typeof memberValue != 'number' && typeof memberValue != 'string')
            memberValue = "";
          keyframe[member] = memberValue;
        }
      }
      keyframeEffect.push(keyframe);
    }

    var everyFrameHasOffset = true;
    var looselySortedByOffset = true;
    var lastOffset = -Infinity;

    for (var i = 0; i < effectInput.length; i++) {
      var keyframeHasOffset = false;
      var offset = effectInput[i].offset;
      if (offset !== null && offset !== undefined) {
        if (typeof offset != 'number' || offset < 0 || offset > 1)
          continue; // NOTE: This doesn't quite match the spec. Fix?
        keyframeHasOffset = true;

        if (keyframeHasOffset) {
          if (offset < lastOffset)
            looselySortedByOffset = false;
          lastOffset = offset;
        }
      }
      everyFrameHasOffset = everyFrameHasOffset && keyframeHasOffset;
      if (effectInput[i].composite == 'add') {
        throw 'composite: \'add\' not supported';
      }

      addKeyframe(effectInput[i]);

      // TODO: Check property value pairs (here or in addKeyframe). Convert dashed properties to CamelCase?
    }

    function compareKeyframesByOffset(keyframe1, keyframe2) {
      if (keyframe1.offset < keyframe2.offset)
        return -1;
      else if (keyframe1.offset == keyframe2.offset)
        return 0;
      return 1;
    }

    if (!looselySortedByOffset) {
      if (!everyFrameHasOffset)
        throw 'Keyframes are not loosely sorted by offset. Sort or specify offsets.';
      else
        keyframeEffect.sort(compareKeyframesByOffset);
    }
    // TODO: Check for partial keyframes? (including checking that there are 2 or more keyframes in keyframeEffect)

    // TODO: Space the normalized keyframes

    return keyframeEffect;
  }

})(webAnimations, testing);
