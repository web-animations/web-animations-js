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
  };

  scope.Timeline.prototype = {
    play: function(source) {
      var player = new scope.Player(source);
      player._startTime = performance.now();
      player.endTime = player._startTime + source.totalDuration;
      player._timeline = this;
      this.players.push(player);
    }
  };

  function tick(t) {
    global.document.timeline.currentTime = t;
    global.document.timeline.players.forEach(function(player) {
      if (!(player.paused || player.finished)) {
        player._currentTime = t - player.startTime;
      }
    });
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);

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

})(webAnimations, testing);
