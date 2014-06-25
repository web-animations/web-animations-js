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

  var element = document.createElement('div');
  var originalAnimate = Element.prototype.animate;

  Element.prototype.animate = function(effect, timing) {
    if (typeof effect == 'function') {
      var player = originalAnimate.call(element, [], timing);
      bind(player, this, effect, timing);
      return player;
    }
    return originalAnimate.call(this, effect, timing);
  };

  var sequenceNumber = 0;
  function bind(player, target, effect, timing) {
    var animation = 'fixme';
    var last = undefined;
    var callback = function() {
      var t = callback._player.currentTime;
      if (isNaN(t)) {
        t = null;
      } else {
        t = shared.localTimeToTimeFraction(t, timing);
        if (isNaN(t))
          t = null;
      }
      if (t !== last)
        effect(t, target, animation);
      last = t;
    };
    callback._player = player;
    callback._registered = false;
    callback._sequenceNumber = sequenceNumber++;

    var originalPlay = player.play;
    player.play = function() {
      originalPlay.call(this);
      register(callback);
    };

    var originalCancel = player.cancel;
    player.cancel = function() {
      originalCancel.call(this);
      register(callback);
    };

    var originalReverse = player.reverse;
    player.reverse = function() {
      originalReverse.call(this);
      register(callback);
    };

    var originalCurrentTime = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(player), 'currentTime');
    Object.defineProperty(player, 'currentTime', {
      enumerable: true,
      configurable: true,
      get: function() { return originalCurrentTime.get.call(this); },
      set: function(v) {
        originalCurrentTime.set.call(this, v);
        register(callback);
      }
    });

    var originalStartTime = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(player), 'startTime');
    Object.defineProperty(player, 'startTime', {
      enumerable: true,
      configurable: true,
      get: function() { return originalStartTime.get.call(this); },
      set: function(v) {
        originalStartTime.set.call(this, v);
        register(callback);
      }
    });

    register(callback);
  }

  var callbacks = [];
  var ticking = false;
  function register(callback) {
    if (callback._registered)
      return;
    callback._registered = true;
    callbacks.push(callback);
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
  }

  function tick(t) {
    var updating = callbacks;
    callbacks = [];
    updating.sort(function(left, right) {
      return left._sequenceNumber - right._sequenceNumber;
    });
    updating.filter(function(callback) {
      callback();
      if (!callback._player || callback._player.finished || callback._player.paused)
        callback._registered = false;
      return callback._registered;
    });
    callbacks.push.apply(callbacks, updating);

    if (callbacks.length) {
      ticking = true;
      requestAnimationFrame(tick);
    } else {
      ticking = false;
    }
  }
})(shared, maxifill, testing);
