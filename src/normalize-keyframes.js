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

(function(shared, testing) {

  function normalizeKeyframes(effectInput) {
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
        } else if (member == 'composite') {
          throw {
            type: DOMException.NOT_SUPPORTED_ERR,
            name: 'NotSupportedError',
            message: 'add compositing is not supported'
          };
        } else if (member == 'easing') {
          memberValue = shared.toTimingFunction(memberValue);
        } else {
          memberValue = '' + memberValue;
        }
        keyframe[member] = memberValue;
      }
      if (keyframe.offset == undefined)
        keyframe.offset = null;
      if (keyframe.easing == undefined)
        keyframe.easing = shared.toTimingFunction('linear');
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

  shared.normalizeKeyframes = normalizeKeyframes;

  if (WEB_ANIMATIONS_TESTING) {
    testing.normalizeKeyframes = normalizeKeyframes;
  }

})(webAnimationsShared, webAnimationsTesting);
