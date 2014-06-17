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

(function(scope, testing) {

  scope.Player = function(source) {
    this.__currentTime = 0;
    this._startTime = null;
    this._source = source;
    this.paused = false;
    this.finished = false;
    this._playbackRate = 1;
    source(0);
  };

  scope.Player.prototype = {
    get currentTime() { return this.__currentTime; },
    set _currentTime(newTime) {
      if (newTime != this.__currentTime) {
        this.__currentTime = newTime;
        if (this._playbackRate > 0 && this.__currentTime >= this._source.totalDuration) {
          this.__currentTime = this._source.totalDuration;
          this.finished = true;
        }
        if (this._playbackRate < 0 && this.__currentTime <= 0) {
          this.__currentTime = 0;
          this.finished = true;
        }
        this._source(this.__currentTime);
      }
    },
    get playbackRate() { return this._playbackRate; },
    set currentTime(newTime) {
      this._currentTime = newTime;
      if (!this.paused) {
        this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
      }
    },
    get startTime() { return this._startTime; },
    set startTime(newTime) {
      if (this.paused) {
        return;
      }
      this._startTime = newTime;
      this._currentTime = this._timeline.currentTime - newTime;
    },
    pause: function() {
      this.paused = true;
      this._startTime = null;
    },
    play: function() {
      this.paused = false;
      if (this.finished) {
        this.__currentTime = this._playbackRate > 0 ? 0 : this._source.totalDuration;
        this.finished = false;
      }
      this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
    },
    reverse: function() {
      this._playbackRate *= -1;
      this._startTime = this._timeline.currentTime - this.__currentTime / this._playbackRate;
      this.finished = false;
    },
    finish: function() {
      this.currentTime = this._playbackRate > 0 ? this._source.totalDuration : 0;
    },
    cancel: function() {
      this._source = function() { };
    }
  };

})(webAnimations, testing);
