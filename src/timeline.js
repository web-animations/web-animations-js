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

  scope.Timeline = function() {
    this.players = [];
    this.currentTime = undefined;
  };

  scope.Timeline.prototype = {
    _play: function(source) {
      var player = new shared.Player(source);
      if ((TESTING || ticking) && this.currentTime !== undefined) {
        player._startTime = this.currentTime;
      }
      player._timeline = this;
      this.players.push(player);
      shared.restart();
      scope.invalidateEffects();
      return player;
    }
  };

  var ticking = true;

  shared.restart = function() {
    if (!ticking) {
      ticking = true;
      if (!TESTING)
        requestAnimationFrame(tick);
      return true;
    }
  };

  var getComputedStylePatched = false;
  var originalGetComputedStyle = global.getComputedStyle;

  function retickBeforeGetComputedStyle() {
    tick(timeline.currentTime);
    return global.getComputedStyle.apply(this, arguments);
  }

  function setGetComputedStyle(newGetComputedStyle) {
    Object.defineProperty(global, 'getComputedStyle', {
      configurable: true,
      enumerable: true,
      value: newGetComputedStyle,
    });
  }

  function ensureOriginalGetComputedStyle() {
    if (getComputedStylePatched) {
      setGetComputedStyle(originalGetComputedStyle);
      getComputedStylePatched = false;
    }
  }

  scope.invalidateEffects = function() {
    if (!getComputedStylePatched) {
      setGetComputedStyle(retickBeforeGetComputedStyle);
      getComputedStylePatched = true;
    }
  };

  scope.tickNow = function() {
    tick(performance.now());
  };

  function tick(t) {
    var timeline = global.document.timeline;
    timeline.currentTime = t;
    timeline.players.sort(function(leftPlayer, rightPlayer) {
      return leftPlayer._sequenceNumber - rightPlayer._sequenceNumber;
    });
    ticking = false;
    var pendingEffects = [];
    timeline.players = timeline.players.filter(function(player) {
      if (!(player.paused || player.finished)) {
        if (player._startTime === null)
          player.startTime = t - player.__currentTime / player.playbackRate;
        player._currentTime = (t - player.startTime) * player.playbackRate;
        if (!player.finished)
          ticking = true;
      }
      // Execute effect clearing before effect applying.
      if (!player._inEffect)
        player._source();
      else
        pendingEffects.push(player._source);

      player._fireEvents();

      if (!player.finished || player._inEffect)
        return true;
      player._inTimeline = false;
      return false;
    });
    pendingEffects.forEach(function(effect) { effect(); });

    ensureOriginalGetComputedStyle();

    if (ticking && !TESTING)
      requestAnimationFrame(tick);
  };

  if (!TESTING) {
    requestAnimationFrame(tick);
  } else {
    testing.tick = tick;
    testing.isTicking = function() { return ticking; };
    testing.setTicking = function(newVal) { ticking = newVal; };
  }

  var timeline = new scope.Timeline();
  scope.timeline = timeline;
  try {
    Object.defineProperty(global.document, 'timeline', {
      configurable: true,
      get: function() { return timeline; }
    });
  } catch (e) { }
  try {
    global.document.timeline = timeline;
  } catch (e) { }

})(shared, minifill, testing);
