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

  var superclass = shared.PlayerProto;

  scope.Player = function(source) {
    this._startOffset = 0;
    this.init();
    this.source = source;
  };

  scope.Player.prototype = {
    init: function() {
      superclass.init.call(this);
      this.childPlayers = [];
    },
    set currentTime(newTime) {
      for (var i = 0; i < this.childPlayers.length; i++)
        this.childPlayers[i].currentTime = newTime;
      this.setCurrentTime(newTime, document.timeline.currentTime);
    },
    get currentTime() {
      if (this._startTime !== null)
        return global.document.timeline.currentTime - this._startTime;
      return this.__currentTime;
    },
    get totalDuration() {
      var total = 0;
      if (this.source instanceof global.AnimationSequence) {
        for (var child in this.childPlayers)
          total += this.childPlayers[child].totalDuration;
        return total;
      }
      for (var child in this.childPlayers)
        total = Math.max(total, this.childPlayers[child].totalDuration);
      return total;
    },
    set startTime(newTime) {
      this.setStartTime(newTime, document.timeline.currentTime);
      for (var i = 0; i < this.childPlayers.length; i++)
        this.childPlayers[i].startTime = newTime;
    },
    get startTime() {
      if (this._startTime == null && this.childPlayers.length > 0) {
        this._startTime = this.childPlayers[0]._startTime;
      }
      return this._startTime;
    },
    pause: function() {
      superclass.pause.call(this);
      for (var i = 0; i < this.childPlayers.length; i++)
        this.childPlayers[i].pause();
    },
    play: function() {
      this.paused = false;
      if (this.finished)
        this.__currentTime = this._playbackRate > 0 ? 0 : this.totalDuration;
      this._finishedFlag = false;
      for (var i = 0; i < this.childPlayers.length; i++) {
        if (!this.childPlayers[i].finished)
          this.childPlayers[i].play();
      }
      if (this.childPlayers.length > 0)
        this._startTime = this.childPlayers[0].startTime;
      else
        this._startTime = null;
    },
    cancel: function() {
      while (this.childPlayers.length)
        this.childPlayers.splice(-1)[0].cancel();
      this.source = null;
      this.currentTime = 0;
    },
    reverse: function() {
      this._playbackRate *= -1;
      this.setChildOffsets();
      this._finishedFlag = false;
      for (var i = 0; i < this.childPlayers.length; i++)
        this.childPlayers[i].reverse();
      if (this.childPlayers.length > 0)
        this._startTime = this.childPlayers[0].startTime;
      else
        this._startTime = null;
    },
    setChildOffsets: function() {
      if (this.playbackRate >= 0) {
        if (this.source instanceof global.AnimationSequence) {
          this.childPlayers[0]._startOffset = 0;
          for (var i = 1; i < this.childPlayers.length; i++)
            this.childPlayers[i]._startOffset = (this.childPlayers[i - 1]._startOffset + this.childPlayers[i - 1].totalDuration);
        }
      } else {
        if (this.source instanceof global.AnimationSequence) {
          this.childPlayers[this.childPlayers.length - 1]._startOffset = this.totalDuration;
          for (var i = this.childPlayers.length - 2; i >= 0; i--)
            this.childPlayers[i]._startOffset = this.totalDuration - (this.childPlayers[i + 1]._startOffset + this.childPlayers[i + 1].totalDuration);
        } else {
          for (var i = this.childPlayers.length - 1; i >= 0; i--)
            this.childPlayers[i]._startOffset = this.totalDuration - this.childPlayers[i].totalDuration;
        }
      }
    },
    __proto__: shared.PlayerProto,
  };
})(shared, maxifill, testing);
