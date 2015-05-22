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

  var disassociate = function(effect) {
    effect._animation = undefined;
    if (effect instanceof window.SequenceEffect || effect instanceof window.GroupEffect) {
      for (var i = 0; i < effect.children.length; i++) {
        disassociate(effect.children[i]);
      }
    }
  };

  scope.removeMulti = function(effects) {
    var oldParents = [];
    for (var i = 0; i < effects.length; i++) {
      var effect = effects[i];
      if (effect._parent) {
        if (oldParents.indexOf(effect._parent) == -1) {
          oldParents.push(effect._parent);
        }
        effect._parent.children.splice(effect._parent.children.indexOf(effect), 1);
        effect._parent = null;
        disassociate(effect);
      } else if (effect._animation && (effect._animation.effect == effect)) {
        effect._animation.cancel();
        effect._animation.effect = new KeyframeEffect(null, []);
        if (effect._animation._callback) {
          effect._animation._callback._animation = null;
        }
        effect._animation._rebuildUnderlyingAnimation();
        disassociate(effect);
      }
    }
    for (i = 0; i < oldParents.length; i++) {
      oldParents[i]._rebuild();
    }
  };

  function KeyframeList(effectInput) {
    this._frames = shared.normalizeKeyframes(effectInput);
  }

  scope.KeyframeEffect = function(target, effectInput, timingInput) {
    this.target = target;

    this._timingInput = shared.cloneTimingInput(timingInput);
    this._timing = shared.normalizeTimingInput(timingInput);

    this.timing = shared.makeTiming(timingInput);
    if (typeof effectInput == 'function')
      this._normalizedKeyframes = effectInput;
    else
      this._normalizedKeyframes = new KeyframeList(effectInput);
    this._keyframes = effectInput;
    this.activeDuration = shared.calculateActiveDuration(this._timing);
    return this;
  };

  scope.KeyframeEffect.prototype = {
    getFrames: function() {
      if (typeof this._normalizedKeyframes == 'function')
        return this._normalizedKeyframes;
      return this._normalizedKeyframes._frames;
    },
    get effect() {
      shared.deprecated('KeyframeEffect.effect', '2015-03-23', 'Use KeyframeEffect.getFrames() instead.');
      return this._normalizedKeyframes;
    },
    clone: function() {
      if (typeof this.getFrames() == 'function') {
        throw new Error('Cloning custom effects is not supported.');
      }
      var clone = new KeyframeEffect(this.target, [], shared.cloneTimingInput(this._timingInput));
      clone._normalizedKeyframes = this._normalizedKeyframes;
      clone._keyframes = this._keyframes;
      return clone;
    },
    remove: function() {
      scope.removeMulti([this]);
    }
  };

  var originalElementAnimate = Element.prototype.animate;
  Element.prototype.animate = function(effectInput, timing) {
    return scope.timeline._play(new scope.KeyframeEffect(this, effectInput, timing));
  };

  var nullTarget = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
  scope.newUnderlyingAnimationForKeyframeEffect = function(keyframeEffect) {
    if (keyframeEffect) {
      var target = keyframeEffect.target || nullTarget;
      var keyframes = keyframeEffect._keyframes;
      if (typeof keyframes == 'function') {
        keyframes = [];
      }
      var timing = keyframeEffect._timingInput;
    } else {
      var target = nullTarget;
      var keyframes = [];
      var timing = 0;
    }
    return originalElementAnimate.apply(target, [keyframes, timing]);
  };

  scope.bindAnimationForKeyframeEffect = function(animation) {
    if (animation.effect && typeof animation.effect._normalizedKeyframes == 'function') {
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
      var group = pendingGroups.shift();
      group._updateChildren();
      updated = true;
    }
    return updated;
  }
  var originalGetComputedStyle = window.getComputedStyle;
  Object.defineProperty(window, 'getComputedStyle', {
    configurable: true,
    enumerable: true,
    value: function() {
      window.document.timeline._updateAnimationsPromises();
      var result = originalGetComputedStyle.apply(this, arguments);
      if (updatePendingGroups())
        result = originalGetComputedStyle.apply(this, arguments);
      window.document.timeline._updateAnimationsPromises();
      return result;
    },
  });

  window.KeyframeEffect = scope.KeyframeEffect;
  window.Element.prototype.getAnimations = function() {
    return document.timeline.getAnimations().filter(function(animation) {
      return animation.effect !== null && animation.effect.target == this;
    }.bind(this));
  };
  window.Element.prototype.getAnimationPlayers = function() {
    shared.deprecated('Element.getAnimationPlayers', '2015-03-23', 'Use Element.getAnimations instead.');
    return this.getAnimations();
  };

  // Alias KeyframeEffect to Animation, to support old constructor (Animation) for a deprecation
  // period. Should be removed after 23 June 2015.
  //
  // This is only on window and not on scope, because the constructor that was called
  // webAnimationsNext.Player - now called webAnimationsNext.Animation - is already on the scope.
  //
  // FIXME: Add this to scope & expose the other scope.Animation (nee scope.Player). I.e. both this
  // function and the constructor in web-animations-next-animation should be scope.Animation and
  // window.Animation until 23 June 2015.
  window.Animation = function() {
    shared.deprecated('window.Animation', '2015-03-23', 'Use window.KeyframeEffect instead.');
    window.KeyframeEffect.apply(this, arguments);
  };
  window.Animation.prototype = Object.create(window.KeyframeEffect.prototype);
  window.Animation.prototype.constructor = window.Animation;

}(webAnimationsShared, webAnimationsNext, webAnimationsTesting));
