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

  var copyInlineStyle = function(sourceStyle, destinationStyle) {
    for (var i = 0; i < sourceStyle.length; i++) {
      var property = sourceStyle[i];
      destinationStyle[property] = sourceStyle[property];
    }
  };

  var styleMethods = (
    'getPropertyCSSValue|' +
    'getPropertyPriority|' +
    'getPropertyValue|' +
    'item|' +
    'removeProperty|' +
    'setProperty'
  ).split('|');

  // This patching method is a fallback for when we are unable to replace the browser's element.style property.
  // This has the disadvantage that reading style.cssProperty getters will return the animated value.
  // The correct way to interact with this patched style is to only use the style methods listed in styleMethods,
  // animated values will not leak into the return values of these methods.
  function patchInlineStyleForAnimation(element) {
    var style = element.style;
    var surrogateElement = document.createElement('div');
    copyInlineStyle(style, surrogateElement.style);
    var isAnimatedProperty = {};
    styleMethods.forEach(function(methodName) {
      if (!(methodName in style)) {
        return;
      }
      Object.defineProperty(style, methodName, {
        configurable: true,
        enumerable: true,
        value: (function(methodName, originalMethod) {
          return function(property) {
            var result = surrogateElement.style[methodName].apply(surrogateElement.style, arguments);
            if (!isAnimatedProperty[property]) {
              originalMethod.apply(style, arguments);
            }
            return result;
          }
        })(methodName, style[methodName]),
      });
    });

    style._set = function(property, value) {
      style[property] = value;
      isAnimatedProperty[property] = true;
    };

    style._clear = function(property) {
      style[property] = surrogateElement.style[property];
      delete isAnimatedProperty[property];
    };

    // We must keep a handle on the patched style to prevent it from getting GC'd.
    element._webAnimationsPatchedStyle = element.style;
  }

  function ensureStyleIsPatched(element) {
    if (element._webAnimationsPatchedStyle) {
      return;
    }
    patchInlineStyleForAnimation(element);
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

})(webAnimations, testing);
