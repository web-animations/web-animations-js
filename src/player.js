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

  var sequenceNumber = 0;

  scope.Player = function(source) {
    this._sequenceNumber = sequenceNumber++;
    this._startOffset = 0;
    this.init();
    this._source = source;
  };

  scope.Player.prototype = {
    ensureAlive: function() {
      this._inEffect = this._source.update(this.__currentTime);
      if (!this._inTimeline && this._inEffect) {
        this._inTimeline = true;
        document.timeline.players.push(this);
      }
    },
    get currentTime() { return this.__currentTime; },
    set currentTime(newTime) {
      this.setCurrentTime(newTime, this._timeline.currentTime);
      scope.invalidateEffects();
    },
    get startTime() {
      if (!this.paused && this._startTime == null)
        scope.tickNow();
      return this._startTime;
    },
    set startTime(newTime) {
      if (this.setStartTime(newTime, this._timeline.currentTime))
        scope.invalidateEffects();
    },
    get totalDuration() { return this._source.totalDuration; },
    play: function() {
      this.paused = false;
      if (this.finished) {
        this.__currentTime = this._playbackRate > 0 ? 0 : this.totalDuration;
        scope.invalidateEffects();
      }
      this._finishedFlag = false;
      if (!scope.restart())
        this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
      else
        this._startTime = null;
      this.ensureAlive();
    },
    cancel: function() {
      this._source = scope.NullAnimation(this._source.clear);
      this._updateEffect = true;
      this.currentTime = 0;
    },
    reverse: function() {
      this._playbackRate *= -1;
      if (!scope.restart())
        this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
      else
        this._startTime = null;
      if (!this._inTimeline) {
        this._inTimeline = true;
        document.timeline.players.push(this);
      }
      this._finishedFlag = false;
      this.ensureAlive();
    },
    __proto__: shared.PlayerProto,
  };

})(shared, minifill, testing);
