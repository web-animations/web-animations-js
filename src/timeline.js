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
      var player = new scope.Player(source);
      player._timeline = this;
      this.players.push(player);
      scope.restart();
      scope.invalidateEffects();
      return player;
    }
  };

  var ticking = true;

  var hasRestartedThisFrame = false;

  scope.restart = function() {
    if (!ticking) {
      ticking = true;
      if (!TESTING)
        requestAnimationFrame(tick);
      hasRestartedThisFrame = true;
    }
    return hasRestartedThisFrame;
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

  function tick(t) {
    hasRestartedThisFrame = false;
    var timeline = global.document.timeline;
    timeline.currentTime = t;
    timeline.players.sort(function(leftPlayer, rightPlayer) {
      return leftPlayer._sequenceNumber - rightPlayer._sequenceNumber;
    });
    ticking = false;
    var finalPlayers = [];
    var updatingPlayers = timeline.players;
    while (updatingPlayers.length) {
      timeline.players = [];
      var pendingClears = [];
      var pendingEffects = [];
      updatingPlayers = updatingPlayers.filter(function(player) {
        player._inTimeline = player._tick(t);

        if (!player._inEffect)
          pendingClears.push(player._source);
        else
          pendingEffects.push(player._source);

        if (!player.finished && !player.paused)
          ticking = true;

        return player._inTimeline;
      });
      pendingClears.forEach(function(effect) { effect(); });
      pendingEffects.forEach(function(effect) { effect(); });

      finalPlayers.push.apply(finalPlayers, updatingPlayers);
      updatingPlayers = timeline.players;
    }
    timeline.players = finalPlayers;
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
