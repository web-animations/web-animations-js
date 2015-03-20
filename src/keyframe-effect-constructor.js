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

  // FIXME: Make this shareable and rename to SharedKeyframeList.
  function KeyframeList(effectInput) {
    this._frames = shared.normalizeKeyframes(effectInput);
  }

  KeyframeList.prototype = {
    getFrames: function() { return this._frames; }
  };

  // FIXME: This constructor is also used for custom effects. This won't be the case once custom
  // effects are change to callbacks.
  scope.KeyframeEffect = function(target, effectInput, timingInput) {
    this.target = target;

    // TODO: Store a clone, not the same instance.
    this._timingInput = timingInput;
    this._timing = shared.normalizeTimingInput(timingInput);

    // TODO: Make modifications to timing update the underlying animation
    this.timing = shared.makeTiming(timingInput);
    // TODO: Make this a live object - will need to separate normalization of keyframes into a
    // shared module.
    // FIXME: This is a bit weird. Custom effects will soon be implemented as
    // callbacks, and effectInput will no longer be allowed to be a function.
    if (typeof effectInput == 'function')
      this._normalizedKeyframes = effectInput;
    else
      this._normalizedKeyframes = new KeyframeList(effectInput);
    this._keyframes = effectInput;
    this.activeDuration = shared.calculateActiveDuration(this._timing);
    return this;
  };

  var originalElementAnimate = Element.prototype.animate;
  Element.prototype.animate = function(effectInput, timing) {
    return scope.timeline.play(new scope.KeyframeEffect(this, effectInput, timing));
  };

  var nullTarget = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
  scope.newUnderlyingAnimationForKeyframeEffect = function(keyframeEffect) {
    var target = keyframeEffect.target || nullTarget;
    var keyframes = keyframeEffect._keyframes;
    if (typeof keyframes == 'function') {
      keyframes = [];
    }
    return originalElementAnimate.apply(target, [keyframes, keyframeEffect._timingInput]);
  };

  scope.bindAnimationForKeyframeEffect = function(animation) {
    if (animation.source && typeof animation.source._normalizedKeyframes == 'function') {
      scope.bindAnimationForCustomEffect(animation);
    }
  };

  var pendingGroups = [];
  scope.awaitStartTime = function(groupAnimation) {
    if (groupAnimation.startTime !== null || !groupAnimation._isGroup)
      return;
    if (pendingGroups.length == 0) {
      requestAnimationFrame(updatePendingGroups);
    }
    pendingGroups.push(groupAnimation);
  };
  function updatePendingGroups() {
    var updated = false;
    while (pendingGroups.length) {
      pendingGroups.shift()._updateChildren();
      updated = true;
    }
    return updated;
  }
  var originalGetComputedStyle = window.getComputedStyle;
  Object.defineProperty(window, 'getComputedStyle', {
    configurable: true,
    enumerable: true,
    value: function() {
      var result = originalGetComputedStyle.apply(this, arguments);
      if (updatePendingGroups())
        result = originalGetComputedStyle.apply(this, arguments);
      return result;
    },
  });

  window.KeyframeEffect = scope.KeyframeEffect;
  window.Element.prototype.getAnimations = function() {
    return document.timeline.getAnimations().filter(function(animation) {
      return animation.source !== null && animation.source.target == this;
    }.bind(this));
  };

}(webAnimationsShared, webAnimationsNext, webAnimationsTesting));
