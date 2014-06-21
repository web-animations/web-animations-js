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

  var createObject = function(proto, obj) {
    var newObject = Object.create(proto);
    Object.getOwnPropertyNames(obj).forEach(function(name) {
      Object.defineProperty(
          newObject, name, Object.getOwnPropertyDescriptor(obj, name));
    });
    return newObject;
  };

  maxifill.groupPlayerProto = createObject(shared.Player.prototype,
      {
        set currentTime(newTime) {
          if (!this.paused) {
            this.startTime += (this.currentTime - newTime) / this.playbackRate;
          }
          else if (this.hasOwnProperty('childPlayers')) {
            for (var i = 0; i < this.childPlayers.length; i++)
              this.childPlayers[i].currentTime = newTime;
          }
          this._currentTime = newTime - this.offset;
        },
        get currentTime() {
          return this.__currentTime;
        },
        get totalDuration() {
          if (this.source instanceof global.AnimationSequence) {
            var total = 0;
            for (var child in this.childPlayers)
              total += this.childPlayers[child].totalDuration;
            return total;
          }
          var total = 0;
          for (var child in this.childPlayers)
            total = Math.max(total, this.childPlayers[child].totalDuration);
          return total;
        },
        set startTime(newTime) {
          if (!this.paused) {
            this._startTime = newTime + this.offset;
            if (this.hasOwnProperty('childPlayers'))
              for (var i = 0; i < this.childPlayers.length; i++)
                this.childPlayers[i].startTime = newTime;
          }
        },
        get startTime() {
          if (this._startTime == null && this.hasOwnProperty('childPlayers') && this.childPlayers.length > 0) {
            this._startTime = this.childPlayers[0]._startTime;
          }
          return this._startTime;
        },
        pause: function() {
          this.paused = true;
          this._startTime = null;
          if (this.hasOwnProperty('childPlayers'))
            for (var i = 0; i < this.childPlayers.length; i++)
              this.childPlayers[i].pause();
        },
        play: function() {
          this.paused = false;
          if (this.finished)
            this.__currentTime = this._playbackRate > 0 ? 0 : this.totalDuration;
          this._finishedFlag = false;
          // FIXME: Instead of calling restart and calculating startTime, use the startTime of the first childPlayer after playing it.
          // Or something. This is wrong.
          if (!shared.restart())
            this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
          else
            this._startTime = null;
          if (this.hasOwnProperty('childPlayers'))
            for (var i = 0; i < this.childPlayers.length; i++)
              if (!this.childPlayers[i].finished)
                this.childPlayers[i].play();
        },
        reverse: function() {
          this._playbackRate *= -1;
          this.setChildOffsets();
          // FIXME: Instead of calling restart and calculating startTime, use the startTime of the first childPlayer after playing it.
          // Or something. This is wrong.
          if (!shared.restart())
            this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
          else
            this._startTime = null;
          this._finishedFlag = false;
          if (this.hasOwnProperty('childPlayers'))
            for (var i = 0; i < this.childPlayers.length; i++)
              this.childPlayers[i].reverse();
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
      });
})(shared, maxifill, testing);
