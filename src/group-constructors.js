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

  function constructor(children, timingInput) {
    this.children = children || [];
    this.timing = shared.normalizeTimingInput(timingInput, true);
    if (this.timing.duration === 'auto')
      this.timing.duration = this.activeDuration;
    this._internalPlayer = null;
  }

  global.AnimationSequence = function() {
    constructor.apply(this, arguments);
  };

  global.AnimationGroup = function() {
    constructor.apply(this, arguments);
  };

  global.AnimationSequence.prototype = {
    get activeDuration() {
      return this.children.map(function(a) { return a.activeDuration; }).reduce(function(a, b) { return a + b; }, 0);
    }
  };

  global.AnimationGroup.prototype = {
    get activeDuration() {
      return Math.max.apply(this, this.children.map(function(a) { return a.activeDuration; }));
    }
  };
})(maxifill, testing);
