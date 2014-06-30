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

  window.Animation = function(target, effect, timingInput) {
    this.target = target;
    // TODO: Make modifications to specified update the underlying player
    this.timing = shared.normalizeTimingInput(timingInput);
    // TODO: Make this a live object - will need to separate normalization of
    // keyframes into a shared module.
    if (typeof effect == 'function')
      this.effect = effect;
    else
      this.effect = new KeyframeEffect(effect);
    this._effect = effect;
    this._internalPlayer = null;
    this.originalPlayer = null;
    this.activeDuration = shared.activeDuration(this.timing);
    return this;
  };

  var pendingGroups = [];
  function addPendingGroup(group) {
    if (pendingGroups.length == 0) {
      requestAnimationFrame(updatePendingGroups);
    }
    pendingGroups.push(group);
  }
  function updatePendingGroups() {
    var updated = false;
    while (pendingGroups.length) {
      pendingGroups.shift()();
      updated = true;
    }
    return updated;
  }
  var originalGetComputedStyle = window.getComputedStyle;
  Object.defineProperty(window, 'getComputedStyle', {
    configurable: true,
    enumerable: true,
    value: function() {
      var result = originalGetComputedStyle.apply(this, arguments);
      if (updatePendingGroups())
        result = originalGetComputedStyle.apply(this, arguments);
      return result;
    },
  });

  window.document.timeline.play = function(source) {
    if (source instanceof window.Animation) {
      var player = source.target.animate(source._effect, source.timing);
      // TODO: make source setter call cancel.
      player.source = source;
      source.player = player;
      source._nativePlayer = player;
      var cancel = player.cancel;
      player.cancel = function() {
        player.source = null;
        cancel.call(this);
      };
      return player;
    }
    // FIXME: Move this code out of this module
    if (source instanceof window.AnimationSequence || source instanceof window.AnimationGroup) {
      var ticker = function(tf) {
        if (!player.source)
          return;
        if (tf == null) {
          player._removePlayers();
          return;
        }
        if (isNaN(player._startTime))
          return;

        updateChildPlayers(player);
      };

      function updateChildPlayers(updatingPlayer) {
        var offset = 0;

        // TODO: Call into this less frequently.

        for (var i = 0; i < updatingPlayer.source.children.length; i++) {
          var child = updatingPlayer.source.children[i];

          if (i >= updatingPlayer._childPlayers.length) {
            var newPlayer = window.document.timeline.play(child);
            newPlayer.startTime = updatingPlayer.startTime + offset;
            child.player = updatingPlayer.source.player;
            updatingPlayer._childPlayers.push(newPlayer);
            if (!(child instanceof window.Animation))
              updateChildPlayers(newPlayer);
          }

          var childPlayer = updatingPlayer._childPlayers[i];
          if (updatingPlayer.playbackRate == -1 && updatingPlayer.currentTime < offset && childPlayer.currentTime !== -1) {
            childPlayer.currentTime = -1;
          }

          if (updatingPlayer.source instanceof window.AnimationSequence)
            offset += child.activeDuration;
        }
      };

      addPendingGroup(function() {
        if (player.source)
          updateChildPlayers(player);
      });

      // TODO: Use a single static element rather than one per group.
      var player = document.createElement('div').animate(ticker, source.timing);
      player._childPlayers = [];
      player.source = source;
      source._nativePlayer = player;
      source.player = player;

      player._removePlayers = function() {
        while (this._childPlayers.length)
          this._childPlayers.pop().cancel();
      };

      return player;
    }
  };

  function isGroupPlayer(player) {
    return !!player._childPlayers;
  }

  var playerProto = Object.getPrototypeOf(document.documentElement.animate([]));
  scope.hookMethod(playerProto, 'reverse', function() {
    if (isGroupPlayer(this)) {
      var offset = 0;
      this._childPlayers.forEach(function(child) {
        child.reverse();
        child.startTime = this.startTime + offset * this.playbackRate;
        child.currentTime = this.currentTime + offset * this.playbackRate;
        if (this.source instanceof window.AnimationSequence)
          offset += child.source.activeDuration;
      }.bind(this));
    }
  });

  scope.hookMethod(playerProto, 'pause', function() {
    if (isGroupPlayer(this)) {
      this._childPlayers.forEach(function(child) {
        child.pause();
      });
    }
  });

  scope.hookMethod(playerProto, 'play', function() {
    if (isGroupPlayer(this)) {
      this._childPlayers.forEach(function(child) {
        var time = child.currentTime;
        child.play();
        child.currentTime = time;
      });
    }
  });

  scope.hookMethod(playerProto, 'cancel', function() {
    if (isGroupPlayer(this)) {
      this.source = null;
      this._removePlayers();
    }
  });

  scope.hookSetter(playerProto, 'currentTime', function(v) {
    if (isGroupPlayer(this)) {
      var offset = 0;
      this._childPlayers.forEach(function(child) {
        child.currentTime = v - offset;
        if (this.source instanceof window.AnimationSequence)
          offset += child.source.activeDuration;
      }.bind(this));
    }
  });

  scope.hookSetter(playerProto, 'startTime', function(v) {
    if (isGroupPlayer(this)) {
      var offset = 0;
      this._childPlayers.forEach(function(child) {
        child.startTime = v + offset;
        if (this.source instanceof window.AnimationSequence)
          offset += child.source.activeDuration;
      }.bind(this));
    }
  });
}(webAnimationsShared, webAnimationsMaxifill, webAnimationsTesting));
