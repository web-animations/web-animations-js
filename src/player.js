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

  shared.AnimationPlayerEvent = function(target, currentTime, timelineTime) {
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

  var sequenceNumber = 0;

  shared.Player = function(source) {
    this.__currentTime = 0;
    this._startTime = null;
    this._source = source;
    this.paused = false;
    this._playbackRate = 1;
    this._sequenceNumber = sequenceNumber++;
    this._inTimeline = true;
    this._finishedFlag = false;
    this.onfinish = null;
    this._finishHandlers = [];
    this._hasTicked = false;
    this._startOffset = 0;
    this._parent = null;
  };

  shared.Player.prototype = {
    get currentTime() { return this.__currentTime; },
    set _currentTime(newTime) {
      if (newTime != this.__currentTime || !this._hasTicked) {
        this._hasTicked = true;
        this.__currentTime = newTime;
        if (this.finished)
          this.__currentTime = this._playbackRate > 0 ? this.totalDuration : 0;
        this.ensureAlive();
      }
    },
    ensureAlive: function() {
      this._inEffect = this._source.update(this.__currentTime);
      if (!this._inTimeline && this._inEffect) {
        this._inTimeline = true;
        document.timeline.players.push(this);
      }
    },
    get playbackRate() { return this._playbackRate; },
    set playbackRate(newRate) {
      var previousTime = this.currentTime;
      this._playbackRate = newRate;
      this.currentTime = previousTime;
    },
    set currentTime(newTime) {
      this._currentTime = newTime;
      if (!this.paused) {
        this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
      }
      if (!this.paused)
        this.startTime += (this.currentTime - newTime) / this.playbackRate;
      this._currentTime = newTime - this.offset;
      scope.invalidateEffects();
    },
    get finished() {
      return this._playbackRate > 0 && this.__currentTime >= this.totalDuration ||
        this._playbackRate < 0 && this.__currentTime <= 0;
    },
    get startTime() {
      if (!this.paused && this._startTime == null)
        scope.tickNow();
      return this._startTime;
    },
    set startTime(newTime) {
      if (this.paused)
        return;
      this._startTime = newTime + this.offset;
      this._currentTime = this._timeline.currentTime - this._startTime;
      scope.invalidateEffects();
    },
    get totalDuration() {  return this._source.totalDuration; },
    // FIXME: This walks the animation tree to calculate offsets.
    // It makes offsets resilient to tree surgery, except removing animations from a sequence.
    // Do we want to pre-compute this, and re-compute upon surgery? Do we want to go further
    // In this direction and calculate all offsets every time (i.e. calculate offsets within a sequence).
    // TODO: Try to move this out of here.
    get offset() { 
      if (this._parent)
        return this._startOffset + this._parent._startOffset;
      else
        return this._startOffset;
    },
    pause: function() {
      this.paused = true;
      this._startTime = null;
    },
    play: function() {
      this.paused = false;
      if (this.finished)
        this.__currentTime = this._playbackRate > 0 ? 0 : this.totalDuration;
        scope.invalidateEffects();
      this._finishedFlag = false;
      if (!shared.restart())
        this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
      else
        this._startTime = null;
      this.ensureAlive();
    },
    reverse: function() {
      this._playbackRate *= -1;
      if (!shared.restart())
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
    finish: function() {
      this.currentTime = this._playbackRate > 0 ? this.totalDuration : 0;
    },
    cancel: function() {
      this._source = scope.nullAnimation;
      this.currentTime = 0;
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
    _fireEvents: function() {
      var finished = this.finished;
      if (finished && !this._finishedFlag) {
        var event = new shared.AnimationPlayerEvent(this, this.currentTime, document.timeline.currentTime);
        var handlers = this._finishHandlers.concat(this.onfinish ? [this.onfinish] : []);
        setTimeout(function() {
          handlers.forEach(function(handler) {
            handler.call(event.target, event);
          });
        }, 0);
      }
      this._finishedFlag = finished;
    },
  };

})(shared, minifill, testing);
