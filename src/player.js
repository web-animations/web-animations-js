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
    this.source = source;
    this.paused = false;
    this.finished = false;
    this.reversed = false;
    source(0);
  };

  scope.Player.prototype = {
    get currentTime() { return this.__currentTime; },
    set _currentTime(newTime) {
      if (newTime != this.__currentTime) {
        this.__currentTime = newTime;
        if (this.__currentTime >= this.endTime) {
          this.__currentTime = this.endTime;
          this.finished = true;
        }
        this.source(this.reversed ? this.source.totalDuration - this.__currentTime : this.__currentTime);
      }
    },
    set currentTime(newTime) {
      this._currentTime = newTime;
      this._startTime = this._timeline.currentTime - this.__currentTime;
      this.endTime = this._startTime + this.source.totalDuration;
    },
    get startTime() { return this._startTime; },
    set startTime(newTime) {
      this._startTime = newTime;
      this.endTime = this._startTime + this.source.totalDuration;
      this._currentTime = this._timeline.currentTime - newTime;
    },
    pause: function() {
      this.paused = true;
      this._startTime = null;
    },
    play: function() {
      this.paused = false;
      this._startTime = this._timeline.currentTime - this.__currentTime;
    },
    reverse: function() {
      this.reversed = !this.reversed;
      this.currentTime = this.source.totalDuration - this.__currentTime;
    },
    finish: function() {
      this.currentTime = this.endTime;
    }
  };

})(webAnimations, testing);
