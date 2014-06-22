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

  function KeyframeEffect(effect) {
    this._frames = shared.normalizeKeyframes(effect);
  }

  KeyframeEffect.prototype = {
    getFrames: function() { return this._frames; }
  };

  global.Animation = function(target, effect, timing) {
    this.target = target;
    // TODO: Make modifications to specified update the underlying player
    this.timing = timing;
    // TODO: Make this a live object - will need to separate normalization of
    // keyframes into a shared module.
    if (typeof effect == 'function')
      this.effect = effect;
    else
      this.effect = new KeyframeEffect(effect);
    this._effect = effect;
    this._internalPlayer = null;
    this._player = null;
    this.activeDuration = shared.activeDuration(timing);
    return this;
  };

  global.Animation.prototype = {
    get player() { return this._player; },
  };

  global.document.timeline.play = function(source) {
    if (source instanceof global.Animation) {
      var player = source.target.animate(source._effect, source.timing);
      source._internalPlayer = player;
      source._player = source._player || player;
      // TODO: make source setter call cancel.
      player.source = source;
      var cancel = player.cancel.bind(player);
      player.cancel = function() {
        player.source = null;
        cancel();
      };
      return player;
    }
    // FIXME: Move this code out of this module
    if (source instanceof global.AnimationSequence || source instanceof global.AnimationGroup) {
      var div = document.createElement('div')
      var newTiming = {}
      for (var property in source.timing)
        newTiming[property] = source.timing[property];
      newTiming.duration = source.activeDuration;
      var ticker = function(tf) {
        var offset = 0;
        for (var i = 0; i < player.source.children.length; i++) {
          var child = player.source.children[i];

          function newPlayer(source) {
            var newPlayer = global.document.timeline.play(source);
            newPlayer.startTime = player.startTime + offset;
            source._internalPlayer = newPlayer;
            player._childPlayers.push(newPlayer);
          }

          if (i >= player._childPlayers.length)
            newPlayer(child);

          var childPlayer = player._childPlayers[i];
          console.log(player.playbackRate, player.currentTime, offset);
          if (player.playbackRate == -1 && player.currentTime < offset && childPlayer.currentTime !== -1) {
            childPlayer.currentTime = -1;
          }

          /*
          else {
            if (childPlayer !== child._internalPlayer && shouldBePlayed) {
              player._childPlayers.slice(i).map(function(player) { player.cancel(); });
              player._childPlayers = player._childPlayers.slice(0, i);
              newPlayer(child);
            } else if (childPlayer == child._internalPlayer && !shouldBePlayed) {
              childPlayer.cancel();
              console.log(player._childPlayers.map(function(a) { return a.currentTime; }));
              player._childPlayers.splice(i, 1);
              console.log(player._childPlayers.map(function(a) { return a.currentTime; }));
            }
          }
          */

          if (source instanceof global.AnimationSequence)
            offset += child.activeDuration;
        }
      };
      var player = div.animate(ticker, newTiming);
      player._childPlayers = [];
      player.source = source;
      player.startTime;
      //ticker(0);

      var _reverse = player.reverse.bind(player);
      player.reverse = function() {
        _reverse();
        var offset = 0;
        player._childPlayers.forEach(function(child) {
          child.reverse();
          child.startTime = player.startTime + offset * player.playbackRate;
          child.currentTime = player.currentTime + offset * player.playbackRate;
          if (source instanceof global.AnimationSequence)
            offset += child.source.activeDuration;
        });
      }
      return player;
    }
  };

}(shared, maxifill, testing));

