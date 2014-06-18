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

  function KeyframeEffect(effect) {
    this._frames = shared.normalizeKeyframes(effect);
  }

  KeyframeEffect.prototype = {
    getFrames: function() { return this._frames; }
  };

  global.Animation = function(target, effect, source) {
    this.target = target;
    // TODO: Make modifications to specified update the underlying player
    this.timing = source;
    // TODO: Make this a live object - will need to separate normalization of
    // keyframes into a shared module.
    if (typeof effect == 'function')
      this.effect = effect;
    else
      this.effect = new KeyframeEffect(effect);
    this._effect = effect;
    this.__player = null;
    this._player = null;
    return this;
    };

  global.Animation.prototype = {
    get player() { return this._player; },
  };

  global.document.timeline.play = function(source) {
    if (source instanceof global.Animation) {
      var player = source.target.animate(source._effect, source.timing);
      source.__player = player;
      source._player = source._player || player;
      // TODO: make source setter call cancel.
      player.source = source;
      var cancel = player.cancel.bind(player);
      player.cancel = function() {
        player.source = null;
        cancel();
      };
      return player;
    }
    // FIXME: Move this code out of this module
    if (source instanceof global.AnimationSequence || source instanceof global.AnimationGroup) {
      var oldPlayerProto = shared.Player.prototype;
      shared.Player.prototype = maxifill.groupPlayerProto;
      var player = global.document.timeline.play(new Animation(document.documentElement, []));
      shared.Player.prototype = oldPlayerProto;
      player.cancel();
      player.source = source;
      source.__player = player;
      source._player = source._player || player;
      player.childPlayers = [];
      for (var i = 0; i < source.children.length; i++) {
        source.children[i]._player = source._player;
        var childPlayer = global.document.timeline.play(source.children[i]);
        childPlayer._parent = player;
        player.childPlayers.push(childPlayer);
      }
      player.setChildOffsets();
      return player;
    }
    return play(source);
  }

}(shared, maxifill, testing));

