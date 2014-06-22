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

(function(shared) {

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

  shared.PlayerProto = {
    init: function() {
      this.__currentTime = 0;
      this._startTime = null;
      this.paused = false;
      this._playbackRate = 1;
      this._inTimeline = true;
      this._finishedFlag = false;
      this.onfinish = null;
      this._finishHandlers = [];
      this._updateEffect = true;
      this._parent = null;
    },
    get playbackRate() { return this._playbackRate; },
    get finished() {
      return this._playbackRate > 0 && this.__currentTime >= this.totalDuration ||
          this._playbackRate < 0 && this.__currentTime <= 0;
    },
    pause: function() {
      this.paused = true;
      this._startTime = null;
    },
    finish: function() {
      this.currentTime = this._playbackRate > 0 ? this.totalDuration : 0;
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
        var event = new shared.AnimationPlayerEvent(this, this.currentTime, baseTime);
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


})(shared);

