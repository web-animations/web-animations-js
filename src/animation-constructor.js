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

  global.Animation = function(target, effect, source) {
    this.target = target;
    // TODO: Make modifications to specified update the underlying player
    this.timing = source;
    // TODO: Make this a live object - will need to separate normalization of
    // keyframes into a shared module.
    this._effect = effect;
    return this;
  };

  var play = global.document.timeline.play.bind(global.document.timeline);
  global.document.timeline.play = function(source) {
    if (source instanceof global.Animation) {
      var player = source.target.animate(source._effect, source.timing);
      // TODO: make source setter call cancel.
      player.source = source;
      var cancel = player.cancel.bind(player);
      player.cancel = function() {
        player.source = null;
        cancel();
      };
      return player;
    }
    return play(source);
  };

}(null, testing));

