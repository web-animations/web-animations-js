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
  scope.Player = function(player) {
    this.source = null;
    this._player = player;
    this._childPlayers = [];
    this._callback = null;
  };

  // TODO: add a source getter/setter
  scope.Player.prototype = {
    get paused() {
      return this._player.paused;
    },
    get onfinish() {
      return this._player.onfinish;
    },
    set onfinish(v) {
      this._player.onfinish = v;
    },
    get currentTime() {
      return this._player.currentTime;
    },
    set currentTime(v) {
      this._player.currentTime = v;
      this._register();
      var offset = 0;
      this._childPlayers.forEach(function(child) {
        child.currentTime = v - offset;
        if (this.source instanceof window.AnimationSequence)
          offset += child.source.activeDuration;
      }.bind(this));
    },
    get startTime() {
      return this._player.startTime;
    },
    set startTime(v) {
      this._player.startTime = v;
      this._register();
      var offset = 0;
      this._childPlayers.forEach(function(child) {
        child.startTime = v + offset;
        if (this.source instanceof window.AnimationSequence)
          offset += child.source.activeDuration;
      }.bind(this));
    },
    get playbackRate() {
      return this._player.playbackRate;
    },
    get finished() {
      return this._player.finished;
    },
    play: function() {
      this._player.play();
      this._register();
      this._childPlayers.forEach(function(child) {
        var time = child.currentTime;
        child.play();
        child.currentTime = time;
      });
    },
    pause: function() {
      this._player.pause();
      this._register();
      this._childPlayers.forEach(function(child) {
        child.pause();
      });
    },
    finish: function() {
      this._player.finish();
      this._register();
      // TODO: child players??
    },
    cancel: function() {
      this._player.cancel();
      if (this._callback) {
        this._register();
        this._callback._player = null;
      }
      this.source = null;
      this._removePlayers();
    },
    reverse: function() {
      this._player.reverse();
      this._register();
      var offset = 0;
      this._childPlayers.forEach(function(child) {
        child.reverse();
        child.startTime = this.startTime + offset * this.playbackRate;
        child.currentTime = this.currentTime + offset * this.playbackRate;
        if (this.source instanceof window.AnimationSequence)
          offset += child.source.activeDuration;
      }.bind(this));
    },
    addEventListener: function(type, handler) {
      this._player.addEventListener(type, handler);
    },
    removeEventListener: function(type, handler) {
      this._player.removeEventListener(type, handler);
    },
    _removePlayers: function() {
      while (this._childPlayers.length)
        this._childPlayers.pop().cancel();
    }
  };

})(webAnimationsShared, webAnimationsMaxifill, webAnimationsTesting);
