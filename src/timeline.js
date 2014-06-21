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

  scope.Timeline = function() {
    this.players = [];
    this.currentTime = undefined;
  };

  scope.Timeline.prototype = {
    _play: function(source) {
      var player = new scope.Player(source);
      if ((TESTING || ticking) && this.currentTime !== undefined) {
        player._startTime = this.currentTime;
      }
      player._timeline = this;
      this.players.push(player);
      scope.restart();
      return player;
    }
  };

  var ticking = true;

  scope.restart = function() {
    if (TESTING)
      return;
    if (!ticking) {
      requestAnimationFrame(tick);
      ticking = true;
      return true;
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
    timeline.players.forEach(function(player) {
      if (!(player.paused || player.finished)) {
        ticking = true;
        if (player._startTime === null)
          player.startTime = t - player.__currentTime / player.playbackRate;
        player._currentTime = (t - player.startTime) * player.playbackRate;
      }
      player._fireEvents();
    });
    timeline.players = timeline.players.filter(function(player) {
      if (!player.finished || player._inEffect)
        return true;
      player._inTimeline = false;
      return false;
    });
    if (ticking && !TESTING)
      requestAnimationFrame(tick);
  };

  if (!TESTING) {
    requestAnimationFrame(tick);
  } else {
    testing.tick = tick;
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

})(minifill, testing);
