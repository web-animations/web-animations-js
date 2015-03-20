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

  function groupChildDuration(node) {
    return node._timing.delay + node.activeDuration + node._timing.endDelay;
  }

  function constructor(children, timingInput) {
    this.children = children || [];
    this._timing = shared.normalizeTimingInput(timingInput, true);
    this.timing = shared.makeTiming(timingInput, true);

    if (this._timing.duration === 'auto')
      this._timing.duration = this.activeDuration;
  }

  window.SequenceEffect = function() {
    constructor.apply(this, arguments);
  };

  window.GroupEffect = function() {
    constructor.apply(this, arguments);
  };

  window.SequenceEffect.prototype = {
    get activeDuration() {
      var total = 0;
      this.children.forEach(function(child) {
        total += groupChildDuration(child);
      });
      return Math.max(total, 0);
    }
  };

  window.GroupEffect.prototype = {
    get activeDuration() {
      var max = 0;
      this.children.forEach(function(child) {
        max = Math.max(max, groupChildDuration(child));
      });
      return max;
    }
  };

  scope.newUnderlyingAnimationForGroup = function(group) {
    var underlyingAnimation;
    var ticker = function(tf) {
      var animation = underlyingAnimation._wrapper;
      if (animation.playState == 'pending') return;

      if (!animation.source)
        return;
      if (tf == null) {
        animation._removeChildren();
        return;
      }
    };

    underlyingAnimation = scope.timeline.play(new scope.KeyframeEffect(null, ticker, group._timing));
    return underlyingAnimation;
  };

  scope.bindAnimationForGroup = function(animation) {
    animation._animation._wrapper = animation;
    animation._isGroup = true;
    scope.awaitStartTime(animation);
    animation._constructChildren();
    animation._setExternalAnimation(animation);
  };

  scope.groupChildDuration = groupChildDuration;

})(webAnimationsShared, webAnimationsNext, webAnimationsTesting);
