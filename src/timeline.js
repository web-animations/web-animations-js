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
  scope.AnimationTimeline = function() {
    this._players = [];
    this.currentTime = undefined;
  };

  scope.AnimationTimeline.prototype = {
    _addPlayer: function(player) {
      this._players.push(player);
      scope.restartMaxifillTick();
    },
    // FIXME: This needs to return the wrapped players in maxifill
    // TODO: Does this need to be sorted?
    // TODO: Do we need to consider needsRetick?
    getAnimationPlayers: function() {
      return this._players.slice();
    }
  };

  var ticking = false;

  // TODO: Consider merging maxifillTick with custom-effect tick.
  scope.restartMaxifillTick = function() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(tick);
    }
  };

  function tick(t) {
    hasRestartedThisFrame = false;
    var timeline = window.document.timeline;
    timeline.currentTime = t;
    timeline._players = timeline._players.filter(function(player) {
      return player.playState != 'finished';
    });
    if (timeline._players.length == 0)
      ticking = false;

    if (ticking)
      requestAnimationFrame(function() {});
  };

  if (WEB_ANIMATIONS_TESTING) {
    var _tick = testing.tick;
    testing.tick = function(t) {
      _tick(t);
      tick(t);
    }
  }

  var timeline = new scope.AnimationTimeline();
  scope.timeline = timeline;
  try {
    Object.defineProperty(window.document, 'timeline', {
      configurable: true,
      get: function() { return timeline; }
    });
  } catch (e) { }
  try {
    window.document.timeline = timeline;
  } catch (e) { }

})(webAnimationsShared, webAnimationsMaxifill, webAnimationsTesting);
