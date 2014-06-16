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

  var styleMethods = {
    getPropertyCSSValue: 1,
    getPropertyPriority: 1,
    getPropertyValue: 1,
    item: 1,
    removeProperty: 1,
    setProperty: 1,
  };

  // This patching method should be used for browsers that are unable to replace the browser's element.style property (Safari and iOS).
  // This patch has the disadvantage that reading style.cssProperty getters will return the animated value.
  // The correct way to interact with this patched style is to only use the style methods listed in styleMethods,
  // animated values will not leak into the return values of these methods.
  function patchInlineStyleForAnimation(element) {
    var style = element.style;
    var surrogateStyle = document.createElement('div').style;
    // Copy the inline style contents over to the surrogate.
    for (var i = 0; i < style.length; i++) {
      var property = style[i];
      surrogateStyle[property] = style[property];
    }
    var isAnimatedProperty = {};
    for (var method in styleMethods) {
      if (!(method in style))
        return;
      Object.defineProperty(style, method, {
        enumerable: true,
        configurable: true,
        value: (function(method, originalMethodFunction) {
          return function(property) {
            var result = surrogateStyle[method].apply(surrogateStyle, arguments);
            if (!isAnimatedProperty[property])
              originalMethodFunction.apply(style, arguments);
            return result;
          }
        })(method, style[method]),
      });
    }

    style._set = function(property, value) {
      style[property] = value;
      isAnimatedProperty[property] = true;
    };

    style._clear = function(property) {
      style[property] = surrogateStyle[property];
      delete isAnimatedProperty[property];
    };
  }

  function ensureStyleIsPatched(element) {
    if (element._webAnimationsPatchedStyle)
      return;
    patchInlineStyleForAnimation(element.style);
    // We must keep a handle on the patched style to prevent it from getting GC'd.
    element._webAnimationsPatchedStyle = element.style;
  }

  scope.apply = function(element, property, value) {
    ensureStyleIsPatched(element);
    element.style._set(property, value);
  };

  scope.clear = function(element, property) {
    if (element._webAnimationsPatchedStyle) {
      element.style._clear(property);
    }
  };

  testing.ensureStyleIsPatched = ensureStyleIsPatched;

})(webAnimations, testing);
