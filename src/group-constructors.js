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

  global.AnimationSequence = function(children, timing) {
    this._type = 'seq';
    this.children = children;
    this.timing = timing;
    this._player = null;
    return this;
    // return new scope.Group('seq', children, timing);
  }

  global.AnimationGroup = function(children, timing) {
    this._type = 'par';
    this.children = children;
    this.timing = timing;
    this._player = null;
    return this;
    // return new scope.Group('par', children, timing);
  }

  global.AnimationSequence.prototype = {
    get player() { return this._player; },
  };

  global.AnimationGroup.prototype = {
    get player() { return this._player; },
  };
})(maxifill, testing);
