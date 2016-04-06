// Copyright 2016 Google Inc. All rights reserved.
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
  // If an animation with the new syntax applies an effect, there's no need
  // to load this part of the polyfill.
  var element = document.documentElement;
  var animation = element.animate({'opacity': ['1', '0']},
      {duration: 1, fill: 'forwards'});
  animation.finish();
  var animated = getComputedStyle(element).getPropertyValue('opacity') == '0';
  animation.cancel();
  if (animated) {
    return;
  }

  var originalElementAnimate = window.Element.prototype.animate;
  window.Element.prototype.animate = function(effectInput, options) {
    if (window.Symbol && Symbol.iterator && Array.prototype.from && effectInput[Symbol.iterator]) {
      // Handle custom iterables in most browsers by converting to an array
      effectInput = Array.from(effectInput);
    }

    if (!Array.isArray(effectInput) && effectInput !== null) {
      effectInput = shared.convertToArrayForm(effectInput);
    }

    return originalElementAnimate.call(this, effectInput, options);
  };
})(webAnimationsShared);
