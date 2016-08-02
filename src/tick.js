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
  var originalRequestAnimationFrame = window.requestAnimationFrame;
  var rafCallbacks = [];
  var rafId = 0;
  window.requestAnimationFrame = function(f) {
    var id = rafId++;
    if (rafCallbacks.length == 0 && !WEB_ANIMATIONS_TESTING) {
      originalRequestAnimationFrame(processRafCallbacks);
    }
    rafCallbacks.push([id, f]);
    return id;
  };

  window.cancelAnimationFrame = function(id) {
    rafCallbacks.forEach(function(entry) {
      if (entry[0] == id) {
        entry[1] = function() {};
      }
    });
  };

  function processRafCallbacks(t) {
    var processing = rafCallbacks;
    rafCallbacks = [];
    if (t < timeline.currentTime)
      t = timeline.currentTime;
    timeline._animations.sort(compareAnimations);
    timeline._animations = tick(t, true, timeline._animations);
    processing.forEach(function(entry) { entry[1](t); });
    applyPendingEffects();
    _now = undefined;
  }

  function compareAnimations(leftAnimation, rightAnimation) {
    return leftAnimation._sequenceNumber - rightAnimation._sequenceNumber;
  }

  function InternalTimeline() {
    this._animations = [];
    // Android 4.3 browser has window.performance, but not window.performance.now
    this.currentTime = window.performance && performance.now ? performance.now() : 0;
  };

  InternalTimeline.prototype = {
    _play: function(effect) {
      effect._timing = shared.normalizeTimingInput(effect.timing);
      var animation = new scope.Animation(effect);
      animation._idle = false;
      animation._timeline = this;
      this._animations.push(animation);
      scope.restart();
      scope.applyDirtiedAnimation(animation);
      return animation;
    }
  };

  var _now = undefined;

  if (WEB_ANIMATIONS_TESTING) {
    var now = function() { return timeline.currentTime; };
  } else {
    var now = function() {
      if (_now == undefined)
        _now = window.performance && performance.now ? performance.now() : Date.now();
      return _now;
    };
  }

  var ticking = false;
  var hasRestartedThisFrame = false;

  scope.restart = function() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(function() {});
      hasRestartedThisFrame = true;
    }
    return hasRestartedThisFrame;
  };

  // This allows us to synchonously apply an animation's effect in case script mutation
  // of Animation objects occur between the RAF callback and frame rendering.
  scope.applyDirtiedAnimation = function(animation) {
    if (inTick) {
      return;
    }
    animation._markTarget();
    var animations = animation._targetAnimations();
    animations.sort(compareAnimations);
    var remainingAnimations = tick(scope.timeline.currentTime, false, animations.slice());
    if (remainingAnimations.indexOf(animation) === -1) {
      timeline._animations.splice(timeline._animations.indexOf(animation), 1);
    }
    applyPendingEffects();
  };

  var pendingEffects = [];
  function applyPendingEffects() {
    pendingEffects.forEach(function(f) { f(); });
    pendingEffects.length = 0;
  }

  var t60hz = 1000 / 60;

  var inTick = false;
  function tick(t, isAnimationFrame, updatingAnimations) {
    inTick = true;
    hasRestartedThisFrame = false;
    var timeline = scope.timeline;

    timeline.currentTime = t;
    ticking = false;

    var newPendingClears = [];
    var newPendingEffects = [];
    var remainingAnimations = updatingAnimations.filter(function(animation) {
      animation._tick(t, isAnimationFrame);

      if (!animation._inEffect) {
        newPendingClears.push(animation._effect);
        animation._unmarkTarget();
      } else {
        newPendingEffects.push(animation._effect);
        animation._markTarget();
      }

      if (animation._needsTick)
        ticking = true;

      var alive = animation._inEffect || animation._needsTick;
      animation._inTimeline = alive;
      return alive;
    });

    // FIXME: Should remove dupliactes from pendingEffects.
    pendingEffects.push.apply(pendingEffects, newPendingClears);
    pendingEffects.push.apply(pendingEffects, newPendingEffects);

    if (ticking)
      requestAnimationFrame(function() {});

    inTick = false;
    return remainingAnimations;
  };

  if (WEB_ANIMATIONS_TESTING) {
    testing.tick = function(t) { timeline.currentTime = t; processRafCallbacks(t); };
    testing.isTicking = function() { return ticking; };
    testing.setTicking = function(newVal) { ticking = newVal; };
  }

  var timeline = new InternalTimeline();
  scope.timeline = timeline;

})(webAnimationsShared, webAnimations1, webAnimationsTesting);
