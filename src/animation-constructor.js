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
    this.originalPlayer = null;
    this.activeDuration = shared.activeDuration(timing);
    return this;
  };

  global.Animation.prototype = {
    get player() { return this.originalPlayer; },
  };

  global.document.timeline.play = function(source) {
    if (source instanceof global.Animation) {
      var player = source.target.animate(source._effect, source.timing);
      source._internalPlayer = player;
      source.originalPlayer = source.originalPlayer || player;
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
      var newTiming = {}
      for (var property in source.timing)
        newTiming[property] = source.timing[property];
      newTiming.duration = source.activeDuration;
      if (newTiming.fill == 'auto')
        newTiming.fill = 'both';
      var ticker = function(tf) {
        if (tf == null) {
          while (player._childPlayers.length)
            player._childPlayers.pop().cancel();
          return;
        }
        if (player._startTime == null)
          return;

        updateChildPlayers(player);
      }

      var updateChildPlayers = function(updatingPlayer) {
        var offset = 0;

        // TODO: Call into this less frequently.

        for (var i = 0; i < updatingPlayer.source.children.length; i++) {
          var child = updatingPlayer.source.children[i];

          function newPlayer(source) {
            var newPlayer = global.document.timeline.play(source);
            newPlayer.startTime = updatingPlayer.startTime + offset;
            source._internalPlayer = newPlayer;
            updatingPlayer._childPlayers.push(newPlayer);
            if (!source instanceof global.Animation)
              updateChildPlayers(newPlayer);
          }

          if (i >= updatingPlayer._childPlayers.length)
            newPlayer(child);

          var childPlayer = updatingPlayer._childPlayers[i];
          if (updatingPlayer.playbackRate == -1 && updatingPlayer.currentTime < offset && childPlayer.currentTime !== -1) {
            childPlayer.currentTime = -1;
          }

          if (source instanceof global.AnimationSequence)
            offset += child.activeDuration;
        }
      };

      // TODO: Use a single static element rather than one per group.
      var player = document.createElement('div').animate(ticker, newTiming);
      player._childPlayers = [];
      player.source = source;

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

      var originalPause = player.pause.bind(player);
      player.pause = function() {
        originalPause();
        player._childPlayers.forEach(function(child) {
          child.pause();
        });
      };

      var originalPlay = player.play.bind(player);
      player.play = function() {
        originalPlay();
        player._childPlayers.forEach(function(child) {
          var time = child.currentTime;
          child.play();
          child.currentTime = time;
        });
      };

      var originalCurrentTime = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(player), 'currentTime');
      Object.defineProperty(player, 'currentTime',
          { enumerable: true,
            get: function() { return originalCurrentTime.get.bind(this)(); },
            set: function(v) {
              var offset = 0;
              originalCurrentTime.set.bind(this)(v);
              this._childPlayers.forEach(function(child) {
                child.currentTime = v - offset;
                if (this.source instanceof global.AnimationSequence)
                  offset += child.source.activeDuration;
              }.bind(this));
            }
          });

      return player;
    }
  };

}(shared, maxifill, testing));

