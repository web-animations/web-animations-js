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

  scope.KeyframeEffect = function(target, effectInput, timingInput) {
    var effectNode = scope.EffectNode(shared.normalizeTimingInput(timingInput));
    var keyframes = scope.convertEffectInput(effectInput);
    var timeFraction;
    var keyframeEffect = function() {
      WEB_ANIMATIONS_TESTING && console.assert(typeof timeFraction !== 'undefined');
      keyframes(target, timeFraction);
    };
    // Returns whether the keyframeEffect is in effect or not after the timing update.
    keyframeEffect._update = function(localTime) {
      timeFraction = effectNode(localTime);
      return timeFraction !== null;
    };
    keyframeEffect._clear = function() {
      keyframes(target, null);
    };
    keyframeEffect._hasSameTarget = function(otherTarget) {
      return target === otherTarget;
    };
    keyframeEffect._isCurrent = effectNode._isCurrent;
    keyframeEffect._totalDuration = effectNode._totalDuration;
    return keyframeEffect;
  };

  scope.NullEffect = function(clear) {
    var nullEffect = function() {
      if (clear) {
        clear();
        clear = null;
      }
    };
    nullEffect._update = function() {
      return null;
    };
    nullEffect._totalDuration = 0;
    nullEffect._isCurrent = function() {
      return false;
    };
    nullEffect._hasSameTarget = function() {
      return false;
    };
    return nullEffect;
  };

  if (WEB_ANIMATIONS_TESTING) {
    testing.webAnimations1.KeyframeEffect = scope.KeyframeEffect;
    testing.Animation = scope.KeyframeEffect;
  }

})(webAnimationsShared, webAnimations1, webAnimationsTesting);
