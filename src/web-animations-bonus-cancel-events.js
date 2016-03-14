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

(function() {

  if (document.createElement('div').animate([]).oncancel !== undefined) {
    return;
  }

  var _now = undefined;
  if (WEB_ANIMATIONS_TESTING) {
    var now = function() { return webAnimations1.timeline.currentTime; };
  } else {
    var now = function() {
      if (_now == undefined)
        _now = window.performance && performance.now ? performance.now() : Date.now();
      return _now;
    };
  }

  var AnimationCancelEvent = function(target, currentTime, timelineTime) {
    this.target = target;
    this.currentTime = currentTime;
    this.timelineTime = timelineTime;

    this.type = 'cancel';
    this.bubbles = false;
    this.cancelable = false;
    this.currentTarget = target;
    this.defaultPrevented = false;
    this.eventPhase = Event.AT_TARGET;
    this.timeStamp = Date.now();
  };

  var originalElementAnimate = window.Element.prototype.animate;
  window.Element.prototype.animate = function(effectInput, timingInput) {
    var animation = originalElementAnimate.apply(this, [effectInput, timingInput]);

    animation._cancelHandlers = [];
    animation.oncancel = null;

    var originalCancel = animation.cancel;
    animation.cancel = function() {
      originalCancel.apply(this);
      var event = new AnimationCancelEvent(this, null, now());
      var handlers = this._cancelHandlers.concat(this.oncancel ? [this.oncancel] : []);
      setTimeout(function() {
        handlers.forEach(function(handler) {
          handler.call(event.target, event);
        });
      }, 0);
    };

    var originalAddEventListener = animation.addEventListener;
    animation.addEventListener = function(type, handler) {
      if (typeof handler == 'function' && type == 'cancel')
        this._cancelHandlers.push(handler);
      originalAddEventListener.apply(this, [type, handler]);
    };

    var originalRemoveEventListener = animation.removeEventListener;
    animation.removeEventListener = function(type, handler) {
      if (type == 'cancel') {
        var index = this._cancelHandlers.indexOf(handler);
        if (index >= 0)
          this._cancelHandlers.splice(index, 1);
      }
      originalRemoveEventListener.apply(this, [type, handler]);
    };

    return animation;
  };
})();
