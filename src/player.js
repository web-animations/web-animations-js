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

  var AnimationPlayerEvent = function(target, currentTime, timelineTime) {
    this.target = target;
    this.currentTime = currentTime;
    this.timelineTime = timelineTime;

    this.type = 'finish';
    this.bubbles = false;
    this.cancelable = false;
    this.currentTarget = target;
    this.defaultPrevented = false;
    this.eventPhase = Event.AT_TARGET;
    this.timeStamp = Date.now();
  };

  scope.Player = function(source) {
    this._sequenceNumber = sequenceNumber++;
    this.__currentTime = 0;
    this._startTime = NaN;
    this.paused = false;
    this._playbackRate = 1;
    this._inTimeline = true;
    this._finishedFlag = false;
    this.onfinish = null;
    this._finishHandlers = [];
    this._updateEffect = true;
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
    _tickCurrentTime: function(newTime, ignoreLimit) {
      if (newTime != this.__currentTime || this._updateEffect) {
        this._updateEffect = false;
        this.__currentTime = newTime;
        if (this.finished && !ignoreLimit)
          this.__currentTime = this._playbackRate > 0 ? this.totalDuration : 0;
        this.ensureAlive();
      }
    },
    get currentTime() { return this.__currentTime; },
    set currentTime(newTime) {
      if (scope.restart())
        this._startTime = NaN;
      if (!this.paused && !isNaN(this._startTime)) {
        this._startTime = this._timeline.currentTime - newTime / this._playbackRate;
      }
      if (this.__currentTime == newTime)
        return;
      this._tickCurrentTime(newTime, true);
      scope.invalidateEffects();
    },
    get startTime() {
      return this._startTime;
    },
    set startTime(newTime) {
      if (this.paused)
        return;
      this._startTime = newTime;
      this._tickCurrentTime(this._timeline.currentTime - this._startTime);
      scope.invalidateEffects();
    },
    get playbackRate() { return this._playbackRate; },
    get finished() {
      return this._playbackRate > 0 && this.__currentTime >= this.totalDuration ||
          this._playbackRate < 0 && this.__currentTime <= 0;
    },
    get totalDuration() { return this._source.totalDuration; },
    play: function() {
      this.paused = false;
      if (this.finished) {
        this.__currentTime = this._playbackRate > 0 ? 0 : this.totalDuration;
        scope.invalidateEffects();
      }
      this._finishedFlag = false;
      if (!scope.restart()) {
        this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
      }
      else
        this._startTime = NaN;
      this.ensureAlive();
    },
    pause: function() {
      this.paused = true;
      this._startTime = NaN;
    },
    finish: function() {
      this.currentTime = this._playbackRate > 0 ? this.totalDuration : 0;
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
        this._startTime = NaN;
      if (!this._inTimeline) {
        this._inTimeline = true;
        document.timeline.players.push(this);
      }
      this._finishedFlag = false;
      this.ensureAlive();
    },
    addEventListener: function(type, handler) {
      if (typeof handler == 'function' && type == 'finish')
        this._finishHandlers.push(handler);
    },
    removeEventListener: function(type, handler) {
      if (type != 'finish')
        return;
      var index = this._finishHandlers.indexOf(handler);
      if (index >= 0)
        this._finishHandlers.splice(index, 1);
    },
    _fireEvents: function(baseTime) {
      var finished = this.finished;
      if (finished && !this._finishedFlag) {
        var event = new AnimationPlayerEvent(this, this.currentTime, baseTime);
        var handlers = this._finishHandlers.concat(this.onfinish ? [this.onfinish] : []);
        setTimeout(function() {
          handlers.forEach(function(handler) {
            handler.call(event.target, event);
          });
        }, 0);
      }
      this._finishedFlag = finished;
    },
    _update: function(t, pendingClears, pendingEffects) {
      if (!(this.paused || this.finished)) {
        if (isNaN(this._startTime))
          this.startTime = t - this.__currentTime / this.playbackRate;
        this._tickCurrentTime((t - this._startTime) * this.playbackRate);
      } else if (this._updateEffect) {
        // Force an effect update.
        this._tickCurrentTime(this.__currentTime);
      }

      if (!this._inEffect)
        pendingClears.push(this._source);
      else
        pendingEffects.push(this._source);

      this._fireEvents(t);

      if (this.finished && !this._inEffect)
        this._inTimeline = false;
    },
  };

})(shared, minifill, testing);
